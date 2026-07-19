// Colores del tema actual leídos de las CSS vars de :root / .dark.
// ponytail: getComputedStyle por llamada — basta para 2 charts, sin caché.
export function themeColors() {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) =>
    s.getPropertyValue(name).trim() || fallback;
  const dark = document.documentElement.classList.contains('dark');
  return {
    dark,
    signal: v('--color-signal', '#2240c4'),
    amber: v('--color-amber', '#a8593c'),
    graphite: v('--color-graphite', '#2a2d33'),
    muted: v('--color-muted', '#6b6e76'),
    ink: v('--color-ink', '#141519'),
    // grilla/ejes de Chart.js, hairline
    gridLine: dark ? 'rgba(236,235,228,0.07)' : 'rgba(20,21,25,0.08)',
  };
}

// Ejecuta cb cada vez que el usuario alterna el tema (evento de Base.astro).
export function onThemeChange(cb: () => void) {
  window.addEventListener('themechange', cb);
}
