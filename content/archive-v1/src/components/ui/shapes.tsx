/* ==========================================================================
   Flair geometry.

   gsap.com hides a family of chunky SVG marks behind individual letters of its
   hero (`home-hero__flair`, z-index -1) and reveals them as the glyphs clear.
   This is that idea with its own shape family — every mark is a single filled
   path on the same 100×100 box, which is what lets MorphSVG tween any one of
   them into any other.
   ========================================================================== */

export const SHAPES = {
	/** four-pointed concave star — the anchor mark */
	burst:
		'M50 0C50 27.6 27.6 50 0 50c27.6 0 50 22.4 50 50 0-27.6 22.4-50 50-50C72.4 50 50 27.6 50 0Z',
	/** sharp eight-vertex sparkle */
	star: 'M50 0 61 39 100 50 61 61 50 100 39 61 0 50 39 39Z',
	/** lightning */
	bolt: 'M60 0 16 58 42 58 34 100 84 38 56 38Z',
	/** annulus */
	ring: 'M50 0a50 50 0 1 0 0 100 50 50 0 1 0 0-100Zm0 26a24 24 0 1 1 0 48 24 24 0 0 1 0-48Z',
	/** teardrop */
	drop: 'M50 0c0 30 50 38 50 64a50 50 0 1 1-100 0C0 38 50 30 50 0Z',
	/** vertical capsule */
	pill: 'M50 0a26 26 0 0 1 26 26v48a26 26 0 0 1-52 0V26A26 26 0 0 1 50 0Z',
	/** double chevron */
	chevron: 'M20 0 70 50 20 100 0 80 30 50 0 20Z',
	/** rounded square, the neutral resting state */
	slab: 'M18 0h64a18 18 0 0 1 18 18v64a18 18 0 0 1-18 18H18A18 18 0 0 1 0 82V18A18 18 0 0 1 18 0Z'
} as const;

export type ShapeName = keyof typeof SHAPES;

export const SHAPE_NAMES = Object.keys(SHAPES) as ShapeName[];

type ShapeProps = {
	name: ShapeName;
	className?: string;
	/** forwarded to the <path> so MorphSVG can target it */
	pathId?: string;
};

/** A single flair mark. Fill is inherited, so colour is set by the parent. */
export const Shape = ({ name, className, pathId }: ShapeProps) => (
	<svg viewBox='0 0 100 100' className={className} aria-hidden focusable='false'>
		<path id={pathId} d={SHAPES[name]} fill='currentColor' />
	</svg>
);

/* --------------------------------------------------------------------------
   The braces gsap.com wraps its hero subtitle in. Two copies of one path; the
   closer is rotated 180° in CSS. `fill: currentColor` keeps them on whatever
   the surrounding text colour is.
   -------------------------------------------------------------------------- */

export const BRACE_PATH =
	'M26.5 77.2h-5.7c-6.8 0-12.4-5.6-12.4-12.4V48.4C8.4 43.8 4.6 40 0 40v-4c4.6 0 8.4-3.8 8.4-8.4V13.2C8.4 6.4 14 .8 20.8.8h5.7v4h-5.7c-4.6 0-8.4 3.8-8.4 8.4v14.4c0 4.2-2.2 7.9-5.4 10 3.2 2.1 5.4 5.8 5.4 10v16.4c0 4.6 3.8 8.4 8.4 8.4h5.7v4Z';

export const Brace = () => (
	<span className='brace' aria-hidden>
		<svg viewBox='0 0 27 78' focusable='false'>
			<path d={BRACE_PATH} />
		</svg>
	</span>
);
