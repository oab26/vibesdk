export function CloudflareLogo(props: React.SVGProps<SVGSVGElement> & { color1?: string, color2?: string}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 160 40"
			fill="none"
			{...props}
		>
			<text
				x="2"
				y="32"
				fontFamily="system-ui, -apple-system, sans-serif"
				fontSize="32"
				fontWeight="700"
				fill={props.color1 ?? "#F6821F"}
			>
				ColabShip
			</text>
		</svg>
	);
}

export function TypeScriptIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 400 400" id="Layer_1" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path className="st0" d="M0 200V0h400v400H0" fill="#007acc" />
			<path className="st1" d="M87.7 200.7V217h52v148h36.9V217h52v-16c0-9 0-16.3-.4-16.5 0-.3-31.7-.4-70.2-.4l-70 .3v16.4l-.3-.1zM321.4 184c10.2 2.4 18 7 25 14.3 3.7 4 9.2 11 9.6 12.8 0 .6-17.3 12.3-27.8 18.8-.4.3-2-1.4-3.6-4-5.2-7.4-10.5-10.6-18.8-11.2-12-.8-20 5.5-20 16 0 3.2.6 5 1.8 7.6 2.7 5.5 7.7 8.8 23.2 15.6 28.6 12.3 41 20.4 48.5 32 8.5 13 10.4 33.4 4.7 48.7-6.4 16.7-22 28-44.3 31.7-7 1.2-23 1-30.5-.3-16-3-31.3-11-40.7-21.3-3.7-4-10.8-14.7-10.4-15.4l3.8-2.4 15-8.7 11.3-6.6 2.6 3.5c3.3 5.2 10.7 12.2 15 14.6 13 6.7 30.4 5.8 39-2 3.7-3.4 5.3-7 5.3-12 0-4.6-.7-6.7-3-10.2-3.2-4.4-9.6-8-27.6-16-20.7-8.8-29.5-14.4-37.7-23-4.7-5.2-9-13.3-11-20-1.5-5.8-2-20-.6-25.7 4.3-20 19.4-34 41-38 7-1.4 23.5-.8 30.4 1l-.2.2z" fill="#fff" />
		</svg>);
}

export function CSSIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M6 28L4 3H28L26 28L16 31L6 28Z" fill="#1172B8" />
			<path d="M26 5H16V29.5L24 27L26 5Z" fill="#33AADD" />
			<path d="M19.5 17.5H9.5L9 14L17 11.5H9L8.5 8.5H24L23.5 12L17 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5Z" fill="white" />
		</svg>
	);
}

export const AIAvatar = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		{...props}
	>
		<rect
			width={23.5}
			height={23.5}
			x={0.25}
			y={0.25}
			fill="black"
			rx={11.75}
		/>
		<rect
			width={23.5}
			height={23.5}
			x={0.25}
			y={0.25}
			stroke="black"
			strokeWidth={0.5}
			rx={11.75}
		/>
		<path
			fill="white"
			fillRule="evenodd"
			d="m.504 11.814 9.734-.123c1.765-.081 3.675-1.514 4.344-3.26l.849-2.217c.298-.46.918-.1.738.343l-.58 2.002c-.249.86-.156 1.655.262 2.24.384.539 1.025.855 1.803.892l3.143.188a.286.286 0 0 1 .257.39.394.394 0 0 1-.342.26l-3.265.19c-1.773.081-3.684 1.513-4.353 3.259l-.236.616c-.137.492-1.006.596-.98-.02l.21-.724c.248-.86.156-1.655-.262-2.24-.385-.538-1.026-.855-1.804-.891l-9.47-.121c-.025-.26-.041-.52-.048-.784Z"
			clipRule="evenodd"
		/>
	</svg>
);
