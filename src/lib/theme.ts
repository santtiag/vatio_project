// Colores del tema actual leídos de las CSS vars de :root / .dark.
// ponytail: getComputedStyle por llamada — basta para 2 charts, sin caché.
export function themeColors() {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) =>
    s.getPropertyValue(name).trim() || fallback;
  const dark = document.documentElement.classList.contains('dark');
  return {
    dark,
    signal: v('--color-signal', '#0d8f5b'),
    amber: v('--color-amber', '#a85d12'),
    graphite: v('--color-graphite', '#2b3340'),
    muted: v('--color-muted', '#5c6470'),
    // grilla/ejes de Chart.js, tenue
    gridLine: dark ? 'rgba(58,70,84,0.4)' : 'rgba(43,51,64,0.12)',
  };
}

// Ejecuta cb cada vez que el usuario alterna el tema (evento de Base.astro).
export function onThemeChange(cb: () => void) {
  window.addEventListener('themechange', cb);
}
