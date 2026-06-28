// Diccionario único EN/ES. Astro nativo i18n: `/` = en (default), `/es` = es.
// Los arrays de texto se "zipean" por índice con los datos estructurales que
// viven en cada componente (iconos, ecuaciones, imágenes, unidades).
export type Locale = 'en' | 'es';

const es = {
  meta: {
    title: 'Sistema Inteligente de Monitoreo de Parámetros Eléctricos — CECAR',
    description:
      'Portafolio académico — sistema inteligente de monitoreo de parámetros eléctricos en bloques universitarios de CECAR. Contenido ilustrativo.',
    themeAria: 'Cambiar tema claro / oscuro',
    langAria: 'Cambiar idioma a inglés',
    langLabel: 'EN',
  },
  hero: {
    statusOrg: 'CECAR · ING. DE SISTEMAS',
    statusKind: 'PROYECTO DE INVESTIGACIÓN',
    title1: 'Sistema Inteligente de Monitoreo de',
    titleAccent: 'Parámetros Eléctricos',
    university: 'Corporación Universitaria del Caribe (CECAR)',
    lead: 'Una plataforma que convierte la energía de los edificios universitarios en conocimiento. Sensores de alta precisión capturan el pulso eléctrico de cada bloque, un pipeline de filtrado limpia el ruido inherente a la medición y una red neuronal recurrente <strong class="font-semibold text-ink">aprende a predecir el consumo</strong> con días de anticipación. El objetivo: demostrar que un dato bien suavizado vale más que un dato crudo a la hora de anticipar la demanda energética.',
    ctaArch: 'Explorar la arquitectura →',
    ctaAlgo: 'Ver los algoritmos',
    scopeBadge: 'SYNTHETIC · ILUSTRATIVA',
    metricLabels: [
      'Bloques universitarios monitoreados',
      'Parámetros eléctricos analizados',
      'Parámetro óptimo del suavizador Whittaker',
      'Horizonte máximo de predicción (7 días)',
    ],
  },
  architecture: {
    h2: 'Arquitectura del sistema',
    intro:
      'Cada vatio recorre un camino. Desde la pinza que abraza el conductor hasta la gráfica que aparece en pantalla, el dato atraviesa ocho etapas de adquisición, transmisión, depuración y predicción. Nada se mide dos veces; todo se transforma una vez bien.',
    nodes: [
      { name: 'Sensores (CT / Bobinas Rogowski)', desc: 'Captura analógica de corriente en la línea eléctrica' },
      { name: 'ADE9000 (Analog Devices)', desc: 'Front-end analógico de alta precisión — Clase 0.2, 7 ADCs internos' },
      { name: 'Microcontrolador', desc: 'Empaqueta y transmite datos digitalizados vía SPI' },
      { name: 'WiFi / UTP', desc: 'Canal de transmisión hacia el servidor de procesamiento' },
      { name: 'Vatio Laboratory', desc: 'Servidor central de almacenamiento y procesamiento' },
      { name: 'Motor de Suavizado', desc: 'Filtros Kalman, Savitzky-Golay y Whittaker' },
      { name: 'Modelo Predictivo (LSTM)', desc: 'Red neuronal recurrente de 7 capas para predicción energética' },
      { name: 'Visualización', desc: 'Dashboard web interactivo (Next.js + React)' },
    ],
    figAlt: 'Diagrama de la transición de datos del sistema IoT',
    figCaption: 'Transición de datos a través de las capas del sistema IoT — del sensor al servidor.',
  },
  infrastructure: {
    h2: 'Infraestructura universitaria',
    intro:
      'El estudio se concentra en dos bloques del campus de CECAR, elegidos por sus perfiles de carga complementarios. Se documenta únicamente el tipo de carga y el estado de monitoreo de cada bloque — nunca lecturas operacionales.',
    activeBadge: 'Activo',
    loadLabel: 'Tipo de carga',
    privacyNote: 'Datos operacionales anonimizados — lecturas no expuestas',
    bloques: [
      {
        nombre: 'Bloque A',
        carga: 'Aulas y espacios académicos',
        estado: 'Activo (datos desde junio 2024)',
        detalle:
          'Carga de tipo académico con perfil diurno marcado: iluminación, climatización y equipos de cómputo que siguen el ritmo de las clases.',
        alt: 'Fotografía del Bloque A en CECAR',
      },
      {
        nombre: 'Bloque F',
        carga: 'Laboratorios y área de evaluación principal',
        estado: 'Activo (datos desde noviembre 2024)',
        detalle:
          'Punto de evaluación principal del proyecto: laboratorios con cargas variables e intensivas, ideales para poner a prueba el suavizado y la predicción.',
        alt: 'Fotografía del Bloque F en CECAR',
      },
    ],
  },
  smoothing: {
    h2: 'Algoritmos de suavizado',
    intro:
      'Toda medición eléctrica llega con ruido. Antes de predecir, hay que decidir cómo limpiarla — y hacerlo <strong class="font-semibold text-ink">sin conocer la verdad de fondo</strong>. Se comparan tres formulaciones clásicas y se selecciona la mejor por validación cruzada generalizada (GCV), un criterio que no necesita ground truth.',
    bestBadge: '★ Mejor GCV',
    chartTitle: 'Comparativa de filtros sobre señal sintética',
    illustrativeScale: 'Escala ilustrativa',
    algos: [
      {
        nombre: 'Filtro de Kalman',
        intuicion: 'Estimación bayesiana recursiva: predice, mide y corrige en cada paso.',
        eqLabels: ['Predicción', 'Ganancia', 'Corrección', 'Covarianza'],
        nota: 'Cuanto mayor es R frente a Q, más confía el filtro en su predicción y menos en la medición ruidosa.',
      },
      {
        nombre: 'Savitzky-Golay',
        intuicion: 'Ajusta un polinomio local por mínimos cuadrados y evalúa su centro: suaviza sin aplanar los picos.',
        eqLabels: ['Convolución', 'Coeficientes', 'Ventana'],
        nota: 'A es la matriz de Vandermonde de la ventana; la fila central de C da los pesos de suavizado.',
      },
      {
        nombre: 'Whittaker',
        intuicion: 'Equilibra fidelidad al dato y suavidad penalizando la d-ésima derivada de la señal estimada.',
        eqLabels: ['Funcional', 'Solución', 'Selección (GCV)'],
        nota: 'λ se elige minimizando GCV — sin ground truth. Dᵈ es la matriz de diferencias de orden d.',
      },
    ],
    chart: {
      raw: 'Señal original (ruidosa)',
      whittaker: 'Whittaker (λ=10)',
      xAxis: 'Tiempo (minutos)',
      yAxis: 'Corriente (A)',
    },
  },
  lstm: {
    titlePre: 'Modelo predictivo ',
    titlePost: '',
    intro:
      'Una red neuronal recurrente de 7 capas que recuerda el pasado para anticipar el futuro. Las celdas LSTM capturan la dinámica temporal del consumo — los ciclos diarios, los picos de laboratorio, las caídas nocturnas — y proyectan la demanda energética con hasta una semana de anticipación.',
    figAlt: 'Diagrama de la arquitectura del modelo LSTM de 7 capas',
    figCaption: 'Arquitectura del modelo LSTM — flujo de capas de entrada a predicción.',
    archLabel: 'Arquitectura — 7 capas',
    featuresLabel: 'Features de entrada — 5 parámetros',
    metricsLabel: 'Métricas objetivo del modelo',
    featureNames: ['Voltaje', 'Corriente', 'Potencia Activa', 'Potencia Reactiva', 'Factor de Potencia'],
    featureUnits: ['V', 'A', 'W', 'VAR', 'adimensional'],
    objetivos: [
      { m: 'MAE', v: '< 3%' },
      { m: 'RMSE', v: '< 5%' },
      { m: 'NSE', v: '> 0.90' },
      { m: 'MSE', v: 'secundaria' },
    ],
    hypothesisLabel: 'Hipótesis del sistema',
    hypothesis:
      'El modelo entrenado con datos suavizados (Whittaker, λ = 10) supera estadísticamente al modelo entrenado con datos ruidosos, al evaluarse contra el ground truth.',
    chartTitle: 'Valores reales vs. predichos',
    illustrativeScale: 'Escala ilustrativa',
    chart: {
      real: 'Real',
      pred: 'Predicho',
      xAxis: 'Ventana de tiempo (genérica)',
      yAxis: 'Potencia (escala ilustrativa)',
    },
  },
  methodology: {
    h2: 'Metodología',
    intro:
      'Seis etapas que llevan el proyecto del cableado físico al artículo científico — del hierro al insight.',
    stageWord: 'Etapa',
    pasos: [
      { t: 'Levantamiento de infraestructura', d: 'Mapeo de los sistemas eléctricos de los Bloques A y F en CECAR e identificación de puntos de medición.' },
      { t: 'Instalación de sensores', d: 'Despliegue de CTs / Bobinas Rogowski conectados al ADE9000 (Clase 0.2) en tableros de distribución.' },
      { t: 'Pipeline de adquisición', d: 'Configuración del microcontrolador para transmitir datos vía WiFi/UTP hacia el Vatio Laboratory a resolución minutal.' },
      { t: 'Algoritmos de suavizado', d: 'Implementación y validación de Kalman, Savitzky-Golay y Whittaker. Selección por criterio GCV (sin ground truth). Ganador: Whittaker con λ=10, d=2.' },
      { t: 'Modelo LSTM', d: 'Entrenamiento de dos variantes (datos suavizados vs. datos ruidosos) y evaluación comparativa contra ground truth con métricas MAE, RMSE y NSE.' },
      { t: 'Análisis e iteración', d: 'Validación de hipótesis, ajuste de hiperparámetros y preparación de publicaciones científicas (artículos WEA y MDPI).' },
    ],
  },
  footer: {
    sheet: 'Ficha técnica',
    projectLabel: 'Proyecto',
    projectName: 'Sistema Inteligente de Monitoreo de Parámetros Eléctricos',
    institutionLabel: 'Institución',
    institution: 'Corporación Universitaria del Caribe — CECAR',
    fundingLabel: 'Financiamiento',
    funding: 'Convocatoria 938 de MINCIENCIAS — «Plataforma Tecnológica Modular de Eficiencia Energética»',
    authorLabel: 'Autor',
    yearLabel: 'Año',
    disclaimer:
      'Los datos presentados en esta página son representativos e ilustrativos. No reflejan lecturas operacionales en tiempo real ni exponen información de la infraestructura eléctrica de CECAR.',
  },
};

const en: typeof es = {
  meta: {
    title: 'Intelligent Monitoring System for Electrical Parameters — CECAR',
    description:
      'Academic portfolio — intelligent monitoring system for electrical parameters in CECAR university blocks. Illustrative content.',
    themeAria: 'Toggle light / dark theme',
    langAria: 'Switch language to Spanish',
    langLabel: 'ES',
  },
  hero: {
    statusOrg: 'CECAR · SYSTEMS ENG.',
    statusKind: 'RESEARCH PROJECT',
    title1: 'Intelligent Monitoring System for',
    titleAccent: 'Electrical Parameters',
    university: 'Corporación Universitaria del Caribe (CECAR)',
    lead: 'A platform that turns the energy of university buildings into knowledge. High-precision sensors capture the electrical pulse of each block, a filtering pipeline cleans the noise inherent to measurement, and a recurrent neural network <strong class="font-semibold text-ink">learns to predict consumption</strong> days in advance. The goal: to show that well-smoothed data is worth more than raw data when anticipating energy demand.',
    ctaArch: 'Explore the architecture →',
    ctaAlgo: 'View the algorithms',
    scopeBadge: 'SYNTHETIC · ILLUSTRATIVE',
    metricLabels: [
      'University blocks monitored',
      'Electrical parameters analyzed',
      'Optimal Whittaker smoother parameter',
      'Maximum forecast horizon (7 days)',
    ],
  },
  architecture: {
    h2: 'System architecture',
    intro:
      'Every watt travels a path. From the clamp that hugs the conductor to the chart on screen, the data passes through eight stages of acquisition, transmission, cleaning, and prediction. Nothing is measured twice; everything is transformed once, well.',
    nodes: [
      { name: 'Sensors (CT / Rogowski coils)', desc: 'Analog current capture on the power line' },
      { name: 'ADE9000 (Analog Devices)', desc: 'High-precision analog front-end — Class 0.2, 7 internal ADCs' },
      { name: 'Microcontroller', desc: 'Packages and transmits digitized data over SPI' },
      { name: 'WiFi / UTP', desc: 'Transmission channel to the processing server' },
      { name: 'Vatio Laboratory', desc: 'Central storage and processing server' },
      { name: 'Smoothing Engine', desc: 'Kalman, Savitzky-Golay, and Whittaker filters' },
      { name: 'Predictive Model (LSTM)', desc: '7-layer recurrent neural network for energy forecasting' },
      { name: 'Visualization', desc: 'Interactive web dashboard (Next.js + React)' },
    ],
    figAlt: "Diagram of the IoT system's data transition",
    figCaption: 'Data transition across the IoT system layers — from sensor to server.',
  },
  infrastructure: {
    h2: 'University infrastructure',
    intro:
      'The study focuses on two blocks of the CECAR campus, chosen for their complementary load profiles. Only the load type and monitoring status of each block are documented — never operational readings.',
    activeBadge: 'Active',
    loadLabel: 'Load type',
    privacyNote: 'Operational data anonymized — readings not exposed',
    bloques: [
      {
        nombre: 'Block A',
        carga: 'Classrooms and academic spaces',
        estado: 'Active (data since June 2024)',
        detalle:
          'Academic load with a marked daytime profile: lighting, HVAC, and computers that follow the rhythm of classes.',
        alt: 'Photograph of Block A at CECAR',
      },
      {
        nombre: 'Block F',
        carga: 'Laboratories and main evaluation area',
        estado: 'Active (data since November 2024)',
        detalle:
          "The project's main evaluation point: laboratories with variable, intensive loads, ideal for stress-testing smoothing and prediction.",
        alt: 'Photograph of Block F at CECAR',
      },
    ],
  },
  smoothing: {
    h2: 'Smoothing algorithms',
    intro:
      'Every electrical measurement arrives with noise. Before predicting, you must decide how to clean it — and do so <strong class="font-semibold text-ink">without knowing the underlying truth</strong>. Three classic formulations are compared and the best is selected by generalized cross-validation (GCV), a criterion that needs no ground truth.',
    bestBadge: '★ Best GCV',
    chartTitle: 'Filter comparison on a synthetic signal',
    illustrativeScale: 'Illustrative scale',
    algos: [
      {
        nombre: 'Kalman Filter',
        intuicion: 'Recursive Bayesian estimation: predict, measure, and correct at each step.',
        eqLabels: ['Prediction', 'Gain', 'Correction', 'Covariance'],
        nota: 'The larger R is relative to Q, the more the filter trusts its prediction and the less the noisy measurement.',
      },
      {
        nombre: 'Savitzky-Golay',
        intuicion: 'Fits a local polynomial by least squares and evaluates its center: smooths without flattening the peaks.',
        eqLabels: ['Convolution', 'Coefficients', 'Window'],
        nota: 'A is the Vandermonde matrix of the window; the central row of C gives the smoothing weights.',
      },
      {
        nombre: 'Whittaker',
        intuicion: 'Balances data fidelity and smoothness by penalizing the d-th derivative of the estimated signal.',
        eqLabels: ['Functional', 'Solution', 'Selection (GCV)'],
        nota: 'λ is chosen by minimizing GCV — no ground truth. Dᵈ is the difference matrix of order d.',
      },
    ],
    chart: {
      raw: 'Original signal (noisy)',
      whittaker: 'Whittaker (λ=10)',
      xAxis: 'Time (minutes)',
      yAxis: 'Current (A)',
    },
  },
  lstm: {
    titlePre: '',
    titlePost: ' predictive model',
    intro:
      'A 7-layer recurrent neural network that remembers the past to anticipate the future. LSTM cells capture the temporal dynamics of consumption — daily cycles, laboratory peaks, nighttime drops — and project energy demand up to a week in advance.',
    figAlt: 'Diagram of the 7-layer LSTM model architecture',
    figCaption: 'LSTM model architecture — layer flow from input to prediction.',
    archLabel: 'Architecture — 7 layers',
    featuresLabel: 'Input features — 5 parameters',
    metricsLabel: 'Model target metrics',
    featureNames: ['Voltage', 'Current', 'Active Power', 'Reactive Power', 'Power Factor'],
    featureUnits: ['V', 'A', 'W', 'VAR', 'dimensionless'],
    objetivos: [
      { m: 'MAE', v: '< 3%' },
      { m: 'RMSE', v: '< 5%' },
      { m: 'NSE', v: '> 0.90' },
      { m: 'MSE', v: 'secondary' },
    ],
    hypothesisLabel: 'System hypothesis',
    hypothesis:
      'The model trained on smoothed data (Whittaker, λ = 10) statistically outperforms the model trained on noisy data when evaluated against the ground truth.',
    chartTitle: 'Actual vs. predicted values',
    illustrativeScale: 'Illustrative scale',
    chart: {
      real: 'Actual',
      pred: 'Predicted',
      xAxis: 'Time window (generic)',
      yAxis: 'Power (illustrative scale)',
    },
  },
  methodology: {
    h2: 'Methodology',
    intro:
      'Six stages that carry the project from physical wiring to the scientific paper — from iron to insight.',
    stageWord: 'Stage',
    pasos: [
      { t: 'Infrastructure survey', d: 'Mapping the electrical systems of Blocks A and F at CECAR and identifying measurement points.' },
      { t: 'Sensor installation', d: 'Deployment of CTs / Rogowski coils connected to the ADE9000 (Class 0.2) in distribution boards.' },
      { t: 'Acquisition pipeline', d: 'Configuring the microcontroller to transmit data over WiFi/UTP to the Vatio Laboratory at minute resolution.' },
      { t: 'Smoothing algorithms', d: 'Implementation and validation of Kalman, Savitzky-Golay, and Whittaker. Selection by GCV criterion (no ground truth). Winner: Whittaker with λ=10, d=2.' },
      { t: 'LSTM model', d: 'Training two variants (smoothed vs. noisy data) and comparative evaluation against ground truth with MAE, RMSE, and NSE metrics.' },
      { t: 'Analysis and iteration', d: 'Hypothesis validation, hyperparameter tuning, and preparation of scientific publications (WEA and MDPI papers).' },
    ],
  },
  footer: {
    sheet: 'Technical sheet',
    projectLabel: 'Project',
    projectName: 'Intelligent Monitoring System for Electrical Parameters',
    institutionLabel: 'Institution',
    institution: 'Corporación Universitaria del Caribe — CECAR',
    fundingLabel: 'Funding',
    funding: 'MINCIENCIAS Call 938 — “Modular Technological Platform for Energy Efficiency”',
    authorLabel: 'Author',
    yearLabel: 'Year',
    disclaimer:
      "The data shown on this page are representative and illustrative. They do not reflect real-time operational readings nor expose information about CECAR's electrical infrastructure.",
  },
};

const dict: Record<Locale, typeof es> = { es, en };

export const t = (locale: string | undefined) => dict[(locale as Locale) in dict ? (locale as Locale) : 'en'];
