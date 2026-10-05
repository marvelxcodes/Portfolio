'use client';

import { useEffect, useRef } from 'react';
import { halftoneFragment, halftoneVertex } from '@/shaders/halftone';
import { hexToUnitRgb, lerp, readCssVar } from '@/lib/utils';

const DITHER_CELL_CSS_PX = 2;
const POINTER_EASE = 0.06;

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
	const shader = gl.createShader(type);
	if (!shader) return null;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
};

const createProgram = (gl: WebGLRenderingContext) => {
	const vertex = compileShader(gl, gl.VERTEX_SHADER, halftoneVertex);
	const fragment = compileShader(gl, gl.FRAGMENT_SHADER, halftoneFragment);
	const program = gl.createProgram();
	if (!vertex || !fragment || !program) return null;
	gl.attachShader(program, vertex);
	gl.attachShader(program, fragment);
	gl.linkProgram(program);
	return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
};

const HalftoneCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const gl = canvas?.getContext('webgl', {
			alpha: false,
			antialias: false,
			depth: false,
			powerPreference: 'low-power'
		});
		if (!canvas || !gl) return;

		const program = createProgram(gl);
		if (!program) return;
		gl.useProgram(program);

		const triangle = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, triangle);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		const position = gl.getAttribLocation(program, 'position');
		gl.enableVertexAttribArray(position);
		gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

		const uniform = (name: string) => gl.getUniformLocation(program, name);
		const uResolution = uniform('uResolution');
		const uPointer = uniform('uPointer');
		const uTime = uniform('uTime');
		const uScroll = uniform('uScroll');
		const uPaper = uniform('uPaper');
		const uInk = uniform('uInk');

		const applyPalette = () => {
			gl.uniform3fv(uPaper, hexToUnitRgb(readCssVar('--c-paper')));
			gl.uniform3fv(uInk, hexToUnitRgb(readCssVar('--c-ink')));
		};

		const resize = () => {
			canvas.width = Math.ceil(window.innerWidth / DITHER_CELL_CSS_PX);
			canvas.height = Math.ceil(window.innerHeight / DITHER_CELL_CSS_PX);
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.uniform2f(uResolution, canvas.width, canvas.height);
		};

		const pointerTarget = { x: 0.5, y: 0.5 };
		const pointer = { x: 0.5, y: 0.5 };
		const onPointerMove = (event: PointerEvent) => {
			pointerTarget.x = event.clientX / window.innerWidth;
			pointerTarget.y = 1 - event.clientY / window.innerHeight;
		};

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const start = performance.now();
		let frame = 0;

		const render = (now: number) => {
			pointer.x = lerp(pointer.x, pointerTarget.x, POINTER_EASE);
			pointer.y = lerp(pointer.y, pointerTarget.y, POINTER_EASE);
			gl.uniform2f(uPointer, pointer.x, pointer.y);
			gl.uniform1f(uTime, reducedMotion ? 0 : (now - start) / 1000);
			gl.uniform1f(uScroll, window.scrollY / window.innerHeight);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
			frame = requestAnimationFrame(render);
		};

		const themeObserver = new MutationObserver(applyPalette);
		themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] });

		applyPalette();
		resize();
		window.addEventListener('resize', resize);
		window.addEventListener('pointermove', onPointerMove, { passive: true });
		frame = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(frame);
			themeObserver.disconnect();
			window.removeEventListener('resize', resize);
			window.removeEventListener('pointermove', onPointerMove);
			gl.deleteBuffer(triangle);
			gl.deleteProgram(program);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className='pointer-events-none fixed inset-0 z-0 size-full [image-rendering:pixelated]'
		/>
	);
};

export default HalftoneCanvas;
