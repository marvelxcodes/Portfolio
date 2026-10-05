export const halftoneVertex = /* glsl */ `
attribute vec2 position;
void main() {
	gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const halftoneFragment = /* glsl */ `
precision highp float;

uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uScroll;
uniform vec3 uPaper;
uniform vec3 uInk;

float hash(vec2 p) {
	p = fract(p * vec2(123.34, 456.21));
	p += dot(p, p + 45.32);
	return fract(p.x * p.y);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(
		mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
		mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
		u.y
	);
}

float fbm(vec2 p) {
	float value = 0.0;
	float amplitude = 0.55;
	for (int octave = 0; octave < 4; octave++) {
		value += amplitude * noise(p);
		p = p * 2.03 + 17.0;
		amplitude *= 0.5;
	}
	return value;
}

float bayer2(vec2 a) {
	a = floor(a);
	return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

float bayer4(vec2 a) {
	return bayer2(0.5 * a) * 0.25 + bayer2(a);
}

float bayer8(vec2 a) {
	return bayer4(0.5 * a) * 0.25 + bayer2(a);
}

void main() {
	vec2 cell = floor(gl_FragCoord.xy);
	vec2 uv = cell / uResolution;
	float aspect = uResolution.x / uResolution.y;
	vec2 p = vec2(uv.x * aspect, uv.y);

	float drift = uTime * 0.045;
	float tone = fbm(p * 1.7 + vec2(drift, -drift * 0.6) + vec2(0.0, uScroll * 0.35));
	tone = smoothstep(0.28, 0.82, tone);

	vec2 pointer = vec2(uPointer.x * aspect, uPointer.y);
	float glow = smoothstep(0.32, 0.0, distance(p, pointer));
	tone = mix(tone, tone * 0.15, glow);

	vec3 color = mix(uPaper, uInk, step(bayer8(cell), tone * 0.92));
	gl_FragColor = vec4(color, 1.0);
}
`;
