// Shaders do Halftone Bloom (Originkit). Dois passes: um campo de luz suave
// e um acabamento em retícula (halftone) que incha os pontos perto do cursor.

const LAYERS = 86
const GAIN = 0.48

const TURN = 0.32
const SWELL = 1.1
const REST = 0.42
const CAP = 0.55

export const VERT_SRC = `#version 300 es
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() { gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }
`

export const FIELD_SRC = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uC1;
uniform vec3 uC2;
uniform float uSize;
uniform float uAngle;
out vec4 o;

const float TAU = 6.28318530718;
const float LAYERS = ${LAYERS.toFixed(1)};
const float GAIN = ${GAIN.toFixed(3)};
const vec2 CENTRE = vec2(-0.25, 0.56);
const float TILT = 1.4;
const float ZOOM = 1.05;
const float THETA = 2.13;
const float SHEAR = 0.965;
const float SHRINK = 0.957;
const vec2 WARP_FREQ = vec2(0.45, 2.5);
const vec2 WARP_AMP = vec2(0.13, 0.028);
const vec2 ASPECT = vec2(2.2, 0.18);
const float OFFSET = 0.37;
const float GLOW = 0.0021;
const float SOFT = 0.0019;
const float FALLOFF = 0.37;
const float PHASE = 23.0;
const float CYCLE = 0.16;
const float HUE_TRAVEL = 2.0;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }

void main() {
  vec2 R = uRes;
  vec2 pos = (gl_FragCoord.xy - 0.5 * R) / R.y;

  pos = rot(uAngle) * pos / uSize;
  float t = uTime * 0.49 + PHASE;
  float breath = (-sin(uTime * 0.735) + sin(uTime * 0.49 + 1.0)) * 0.25 + 0.5;
  vec2 u = rot(TILT) * ((pos - CENTRE) * (ZOOM - breath * 0.085));
  mat2 fold = mat2(cos(THETA), sin(THETA), -SHEAR, cos(THETA));

  vec3 col = vec3(0.0);
  for (float i = 1.0; i <= LAYERS; i += 1.0) {
    u.x -= sin(u.y * WARP_FREQ.x + t + i * 0.007) * WARP_AMP.x;
    u.y -= sin(u.x * WARP_FREQ.y - t + i * 0.02) * WARP_AMP.y;
    u = fold * u * SHRINK;
    vec2 q = (u - vec2(OFFSET + breath * 0.1, 0.0)) * ASPECT;
    float g = GLOW / (dot(q, q) + SOFT) * (0.25 + breath * 0.4);
    float r = length(u);
    float k = sin(i * CYCLE + t * 1.2 + r * HUE_TRAVEL) * 0.5 + 0.5;
    col += g * mix(uC1, uC2, k) * (0.62 + 0.5 * k) * exp2(-r * FALLOFF);
  }
  vec3 x = max(col * GAIN, 0.0);
  col = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.85, 0.92, 0.98));
  col *= 1.0 - smoothstep(0.5, 1.6, length(pos)) * 0.07;
  o = vec4(col, 1.0);
}
`

export const FINISH_SRC = `#version 300 es
precision highp float;
uniform sampler2D uField;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBg;
uniform float uPaper;
uniform vec2 uMouse;
uniform float uOn;
uniform float uReach;
uniform float uCell;
uniform float uPR;
out vec4 o;

const float PI = 3.14159265359;
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);
const float TURN = ${TURN.toFixed(4)};
const float SWELL = ${SWELL.toFixed(4)};
const float REST = ${REST.toFixed(4)};
const float CAP = ${CAP.toFixed(4)};

float ign(vec2 p, float f) { p += 5.588238 * mod(f, 64.0); return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y)); }

vec3 scene(vec2 uv) { return max(texture(uField, clamp(uv, 0.0, 1.0)).rgb, 0.0); }

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;

  mat2 turn = mat2(cos(TURN), -sin(TURN), sin(TURN), cos(TURN));
  vec2 rp = turn * frag;
  vec2 c = (floor(rp / uCell) + 0.5) * uCell;
  vec2 src = transpose(turn) * c;
  vec3 soft = scene(uv);
  vec3 ink = scene(src / uRes);
  float lvl = clamp(dot(ink, LUMA), 0.0, 1.0);
  float radius = uCell * sqrt(pow(lvl, 0.9) / PI);
  float presence = smoothstep(0.03, 0.16, lvl) * REST;

  if (uOn > 0.0) {
    vec2 d = (src - uMouse) / uReach;
    float w = uOn * exp(-dot(d, d));
    if (w > 1e-4) {
      radius *= 1.0 + SWELL * w;
      presence = mix(presence, 1.0, min(w, 1.0));
    }
  }
  radius = min(radius, uCell * CAP);
  float aa = 0.7 * uPR;
  float dm = 1.0 - smoothstep(radius - aa, radius + aa, length(rp - c));
  vec3 dots = ink * min(0.8 / max(lvl, 1e-3), 2.2) * dm;
  vec3 L = mix(soft, dots, presence);

  vec3 dark = uBg + L * (1.0 - uBg);
  float strength = clamp(max(L.r, max(L.g, L.b)), 0.0, 1.0);
  vec3 paper = uBg * (1.0 - strength) + L * 0.96;
  vec3 col = mix(dark, paper, uPaper);
  col += (ign(frag, floor(uTime * 24.0)) - 0.5) / 255.0;
  o = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`
