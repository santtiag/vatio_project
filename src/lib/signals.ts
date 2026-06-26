// Señales sintéticas y suavizadores ILUSTRATIVOS.
// El sitio es "escala ilustrativa": las curvas deben verse correctas, no ser
// numéricamente exactas a SavGol/Whittaker reales.

function mulberry32(seed: number) {
  // PRNG determinista para que los charts no cambien entre renders.
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Señal tipo corriente eléctrica: senoidal base + armónico + ruido gaussiano. */
export function noisySignal(n = 120, seed = 7): number[] {
  const rnd = mulberry32(seed);
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const base = 18 + 6 * Math.sin(i / 9) + 2.5 * Math.sin(i / 3.1);
    // ruido gaussiano aprox (Box-Muller)
    const noise =
      Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(2 * Math.PI * rnd());
    out.push(base + noise * 2.2);
  }
  return out;
}

/** Kalman 1D recursivo — fórmula del proyecto. */
export function kalman1D(
  z: number[],
  { processVar = 0.1, measVar = 10, initErr = 1.0 } = {},
): number[] {
  let xhat = z[0];
  let p = initErr;
  const out: number[] = [];
  for (const zk of z) {
    // predicción
    p += processVar;
    // actualización
    const k = p / (p + measVar);
    xhat = xhat + k * (zk - xhat);
    p = (1 - k) * p;
    out.push(xhat);
  }
  return out;
}

// ponytail: suavizador ilustrativo (media móvil ponderada gaussiana). No es SavGol
// ni Whittaker exacto — basta para la comparativa visual "escala ilustrativa".
// Implementar filtros reales si se requiere rigor numérico.
export function smooth(y: number[], strength = 5): number[] {
  const w: number[] = [];
  for (let i = -strength; i <= strength; i++) w.push(Math.exp(-(i * i) / (2 * (strength / 2) ** 2)));
  const sum = w.reduce((a, b) => a + b, 0);
  return y.map((_, i) => {
    let acc = 0;
    for (let k = -strength; k <= strength; k++) {
      const idx = Math.min(y.length - 1, Math.max(0, i + k));
      acc += y[idx] * w[k + strength];
    }
    return acc / sum;
  });
}

function variance(a: number[]): number {
  const m = a.reduce((x, y) => x + y, 0) / a.length;
  return a.reduce((s, v) => s + (v - m) ** 2, 0) / a.length;
}

/** Real vs predicho ilustrativo: predicho sigue al real con un pequeño desfase/error. */
export function realVsPredicted(n = 48, seed = 3): { real: number[]; pred: number[] } {
  const real = smooth(noisySignal(n, seed), 4).map((v) => v * 5 + 120); // escala tipo potencia
  const rnd = mulberry32(seed + 1);
  const pred = real.map((v) => v + (rnd() - 0.5) * 6);
  return { real, pred };
}

// Self-check (única verificación de lógica no trivial).
function __demo() {
  const y = noisySignal(200, 1);
  console.assert(variance(smooth(y, 6)) < variance(y), 'smooth debe reducir la varianza');
  console.assert(variance(kalman1D(y)) < variance(y), 'kalman debe reducir la varianza');
  console.log('signals self-check OK');
}
// Ejecutar con: node --experimental-strip-types src/lib/signals.ts
if (typeof process !== 'undefined' && import.meta.url === `file://${process.argv?.[1]}`)
  __demo();
