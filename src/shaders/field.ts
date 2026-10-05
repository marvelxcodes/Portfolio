/**
 * "Field" — the live atmospheric layer used behind the hero and inside the
 * pinned panel.
 *
 * Structural debt to the way juanmora.co and tresmarescapital.com both drive a
 * WebGL layer from scroll rather than from time alone: the domain warp is
 * sheared by document progress and nudged by scroll velocity, so the plate
 * reads as part of the parallax rather than as a screensaver behind it.
 *
 * `u_mode` flips the compositing. On a dark ground the accents are added, which
 * is how heat behaves; on a light ground the same field is *subtracted* toward
 * the accent instead, because adding to cream only ever produces white.
 *
 * Runs under Paper's ShaderMount, which supplies u_time / u_resolution /
 * u_pixelRatio and compiles as WebGL2 (`#version 300 es`, `out vec4`).
 */
export const fieldFragment = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2  u_resolution;
uniform float u_pixelRatio;

/* driven from React */
uniform float u_scroll;      /* 0..1 progress across the host section       */
uniform float u_velocity;    /* signed, roughly -1..1 scroll energy         */
uniform float u_intensity;   /* master gain                                 */
uniform float u_mode;        /* 0 = dark ground (add), 1 = light ground (sub) */
uniform vec3  u_ground;
uniform vec3  u_warm;
uniform vec3  u_cool;

out vec4 fragColor;

/* ---- noise ------------------------------------------------------------- */

vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float gnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * gnoise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

/* ---- main -------------------------------------------------------------- */

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p  = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  float t = u_time * 0.06;

  /* scroll shears the field sideways and drags it upward — the parallax read */
  vec2 q = p;
  q.y += u_scroll * 1.35;
  q.x += u_velocity * 0.16;

  /* domain-warped fbm: two passes, the second steered by the first */
  vec2 warp = vec2(fbm(q * 1.6 + t), fbm(q * 1.6 - t + 4.7));
  float field = fbm(q * 2.1 + warp * 1.25 + vec2(0.0, -t * 0.7));
  field = field * 0.5 + 0.5;

  /* a slow bloom that tracks the section's midpoint */
  float bloomY = mix(0.76, 0.22, u_scroll);
  float bloom  = 1.0 - smoothstep(0.0, 0.9, distance(uv, vec2(0.5, bloomY)));
  bloom = pow(bloom, 2.2);

  float heat = smoothstep(0.5, 0.94, field) * bloom;
  float cool = smoothstep(0.30, 0.78, 1.0 - field) * (0.35 + 0.4 * u_scroll);

  vec3 col = u_ground;

  if (u_mode < 0.5) {
    /* dark ground: accents are light, so they add */
    col = mix(col, u_cool, cool * 0.12);
    col += u_warm * heat * 0.44;
    col += u_warm * 0.035 * pow(1.0 - uv.y, 3.0) * (0.4 + u_scroll);
  } else {
    /* light ground: the same field pulls the ground *toward* the accents */
    col = mix(col, u_cool, cool * 0.22);
    col = mix(col, u_warm, heat * 0.55);
    col = mix(col, u_warm, 0.10 * pow(1.0 - uv.y, 2.5));
  }

  /* fine scan rails, echoing the reference sites' structural grid */
  float rail = sin(uv.y * u_resolution.y * 0.55) * 0.5 + 0.5;
  col -= rail * 0.006;

  /* dither the gradient so 8-bit banding never shows */
  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (dither - 0.5) * 0.012;

  col *= u_intensity;

  /* edge falloff keeps content legible over the plate */
  float vigAmount = mix(0.55, 0.24, u_mode);
  float vig = 1.0 - vigAmount * pow(length(p) * 0.82, 2.0);
  col *= clamp(vig, 0.0, 1.0);

  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;
