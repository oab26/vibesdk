# Local Development Setup Guide

This document describes how to set up and run the Vibe SDK (Colabship) locally on your development machine.

## Prerequisites

- **Node.js 18+** (v20.18.1 confirmed working)
- **Bun** (v1.1.38 confirmed working)
- **Docker Desktop** (required for container sandboxing)
- **Cloudflare account** with Workers paid plan

## Quick Setup

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars` with your configuration:

```bash
# Required: AI Provider Keys
GOOGLE_AI_STUDIO_API_KEY="your-api-key-here"

# Required: Security Secrets
JWT_SECRET="your-jwt-secret"
WEBHOOK_SECRET="your-webhook-secret"
SECRETS_ENCRYPTION_KEY="your-encryption-key"

# Required: Cloudflare Configuration
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_ZONE_ID="your-zone-id"
CLOUDFLARE_API_TOKEN="your-api-token"

# Optional: Other AI Providers
ANTHROPIC_API_KEY=""
OPENAI_API_KEY=""
```

### 3. Set Up Local Database

```bash
# Generate database schema
bun run db:generate

# Run migrations (may show "already exists" - this is normal)
bun run db:migrate:local
```

### 4. Upload Template Catalog to Local R2

The template catalog needs to be uploaded to the local R2 bucket:

```bash
wrangler r2 object put vibesdk-templates/template_catalog.json \
  --local \
  --file=./templates/template_catalog.json
```

### 5. Start Development Server

```bash
bun run dev
```

The application will be available at: **http://localhost:5174/**

## Known Issues & Fixes

### Issue 1: CSRF Token Error (403 Forbidden)

**Symptom:** Browser console shows "CSRF token not found" and API requests fail with 403 errors.

**Root Cause:** CSRF cookies were set with `httpOnly: true`, preventing JavaScript from reading them.

**Fix Applied:** Modified `worker/services/csrf/CsrfService.ts` to set `httpOnly: false` for CSRF cookies (lines 47 and 67).

**Why it works:** CSRF protection uses the double-submit cookie pattern - the token must be readable by JavaScript to include it in request headers.

### Issue 2: Template Catalog Missing

**Symptom:** Error "Failed to fetch templates from sandbox service"

**Root Cause:** The local R2 bucket (`vibesdk-templates`) was empty.

**Fix:** Upload the template catalog to local R2:

```bash
wrangler r2 object put vibesdk-templates/template_catalog.json \
  --local \
  --file=./templates/template_catalog.json
```

### Issue 3: Container Exit Code 135

**Symptom:**
```
Sandbox error: [Error: Container exited with unexpected exit code: 135]
Error checking if container is ready: Connection refused
```

**Root Cause:** Corrupted or incompatible Docker images cached locally.

**Fix:** Clean up all Docker images and rebuild from scratch:

```bash
# Remove all Cloudflare Docker images
docker images | grep cloudflare | awk '{print $3}' | xargs docker rmi --force

# Clean up Docker system
docker system prune -a --force

# Restart dev server (will rebuild containers)
bun run dev
```

**Why it works:** Fresh Docker build downloads the correct base images and builds containers properly for your architecture.

## Important Configuration

### Enable Containers in Local Development

The `wrangler.jsonc` file must have containers enabled for local development:

```jsonc
"dev": {
  "ip": "localhost",
  "local_protocol": "http",
  "upstream_protocol": "http",
  "enable_containers": true  // Must be true for local development
}
```

## Architecture Notes

### Docker Containers
- **Image:** `cloudflare/sandbox:0.1.3`
- **Purpose:** Sandboxed environment for executing user-generated code
- **Local Storage:** `.wrangler/state/v3/r2/vibesdk-templates/`
- **Build Time:** ~60-90 seconds on first run

### Database
- **Type:** Cloudflare D1 (SQLite)
- **Local Storage:** `.wrangler/state/v3/d1/`
- **Migrations:** `migrations/` directory

### R2 Storage
- **Bucket:** `vibesdk-templates`
- **Local Storage:** `.wrangler/state/v3/r2/vibesdk-templates/`
- **Required Files:** `template_catalog.json`

## Troubleshooting

### Container Build Fails
If containers fail to build:
1. Ensure Docker Desktop is running
2. Check Docker has enough resources (4GB+ RAM recommended)
3. Clean Docker cache: `docker system prune -a --force`
4. Restart Docker Desktop and try again

### Server Won't Start
1. Check port 5174 is not in use: `lsof -ti:5174`
2. Kill any processes using the port: `kill -9 $(lsof -ti:5174)`
3. Restart the dev server

### CSRF Errors Persist
1. Clear browser cookies for localhost
2. Hard refresh the page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. Check the cookie is being set in DevTools → Application → Cookies

### Template Fetch Errors
Verify the template catalog is in local R2:
```bash
wrangler r2 object get vibesdk-templates/template_catalog.json --local
```

## Development Workflow

1. **Frontend changes:** Edit files in `src/` - hot reload is enabled
2. **Worker changes:** Edit files in `worker/` - requires server restart
3. **Database changes:**
   - Create migration: Add SQL files to `migrations/`
   - Run migration: `bun run db:migrate:local`
4. **Container changes:** Edit `SandboxDockerfile` - requires server restart

## Production vs Local Development

### Works Locally ✅
- Frontend UI/UX
- Authentication flows
- Database operations
- Template selection
- Most API routes

### Limited Locally ⚠️
- **Code generation with containers** - May have issues on Apple Silicon Macs
- **Sandbox execution** - Depends on Docker compatibility
- **Performance** - Local containers are slower than production

### Production Only 🚀
- Cloudflare AI Gateway integration (optional)
- Distributed Durable Objects
- Edge caching and optimization
- Production R2 buckets with actual templates

## Recommendations

- **For UI/Auth development:** Use local development ✅
- **For code generation testing:** Use production deployment at colabship.com ✅
- **For debugging containers:** Check Docker logs: `docker ps -a` and `docker logs <container-id>`

## Files Modified for Local Development

1. `worker/services/csrf/CsrfService.ts` - CSRF cookie configuration
2. `wrangler.jsonc` - Container enablement
3. Local R2 bucket - Template catalog upload

## Version Information

- Node.js: 20.18.1
- Bun: 1.1.38
- Wrangler: 4.41.0
- Docker: Desktop with BuildKit support
- Platform: macOS (Darwin 24.5.0)

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Vibe SDK Templates](https://github.com/cloudflare/vibesdk-templates)
- [Project Documentation](./CLAUDE.md)

---

**Last Updated:** October 3, 2025
**Status:** ✅ Working with fresh Docker build
