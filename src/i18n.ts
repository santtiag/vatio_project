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
  nav: {
    links: [
      { href: '#arquitectura', label: 'Arquitectura' },
      { href: '#infraestructura', label: 'Infraestructura' },
      { href: '#groundtruth', label: 'Ground truth' },
      { href: '#suavizado', label: 'Suavizado' },
      { href: '#modelo', label: 'Modelo' },
      { href: '#metodologia', label: 'Metodología' },
    ],
  },
  hero: {
    statusOrg: 'CECAR · ING. DE SISTEMAS',
    statusKind: 'PROYECTO DE INVESTIGACIÓN',
    title1: 'Sistema Inteligente de Monitoreo de',
    titleAccent: 'Parámetros Eléctricos',
    university: 'Corporación Universitaria del Caribe (CECAR)',
    lead: 'Una plataforma que convierte la energía de los edificios universitarios en conocimiento. Sensores de alta precisión capturan el pulso eléctrico de cada bloque, un pipeline de filtrado limpia el ruido inherente a la medición y una red neuronal recurrente <strong class="font-semibold text-ink">aprende a predecir el consumo</strong> con días de anticipación. El objetivo: demostrar, contra una señal de referencia medida antes del sensor (<em>ground truth</em>), que un dato bien suavizado vale más que un dato crudo a la hora de anticipar la demanda energética.',
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
  groundtruth: {
    h2: 'Ground truth y pipeline de validación',
    intro:
      'Para saber si limpiar el ruido mejora la predicción hace falta una vara de medir: una señal de referencia tomada directamente del panel eléctrico, <strong class="font-semibold text-ink">antes</strong> de la cadena de sensores que introduce el ruido. Contra esa referencia (S<sub>ref</sub>) se selecciona el suavizador y se evalúan los modelos predictivos.',
    signals: [
      {
        sym: 'S_ref',
        name: 'Señal de referencia (ground truth)',
        desc: 'Tomada en el panel eléctrico, antes de los sensores externos. Mientras no exista S_ref físico pareado, se reconstruye con una mediana móvil (ventana de 5 muestras ≈ 5 min) que elimina el ruido impulsivo muestra a muestra preservando los escalones reales de carga.',
      },
      {
        sym: 'S_acq',
        name: 'Señal adquirida (ruidosa)',
        desc: 'Capturada por la cadena completa CT/Rogowski → ADE9000 → microcontrolador. Arrastra el ruido del acondicionamiento externo: cableado, interferencia electromagnética, tierras compartidas, contactos oxidados.',
      },
      {
        sym: 'S_sm',
        name: 'Señal suavizada',
        desc: 'Resultado de aplicar Whittaker (λ = 2, d = 2) sobre S_acq. El λ no se elige a ciegas: se selecciona minimizando el RMSE contra S_ref — selección supervisada contra la referencia.',
      },
    ],
    abTitle: 'Experimento A/B',
    laneA: ['S_acq', 'Whittaker λ=2', 'S_sm', 'LSTM · Modelo A'],
    laneB: ['S_acq', 'LSTM · Modelo B'],
    laneALabel: 'Rama A — datos suavizados',
    laneBLabel: 'Rama B — datos crudos (baseline)',
    evalNote: 'Ambos modelos se evalúan contra S_ref con RMSE, MAE, MSE y NSE. Si el Modelo A gana, el suavizado paga.',
    chartTitle: 'Las tres señales del pipeline',
    illustrativeScale: 'Escala ilustrativa',
    chart: {
      ref: 'S_ref (ground truth)',
      acq: 'S_acq (adquirida)',
      sm: 'S_sm (Whittaker λ=2)',
      xAxis: 'Tiempo (minutos)',
      yAxis: 'Corriente (A)',
    },
  },
  smoothing: {
    h2: 'Algoritmos de suavizado',
    intro:
      'Toda medición eléctrica llega con ruido. Antes de predecir, hay que decidir cómo limpiarla — y aquí la decisión no es a ciegas: se comparan tres formulaciones clásicas con <strong class="font-semibold text-ink">métricas supervisadas contra el ground truth</strong> (RMSE, MAE, mejora de SNR, R²). Gana quien más se acerca a la señal de referencia, no quien más bonita deja la curva.',
    bestBadge: '★ Menor RMSE vs S_ref',
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
        eqLabels: ['Funcional', 'Solución', 'Selección (vs S_ref)'],
        nota: 'λ se elige minimizando el RMSE contra la señal de referencia S_ref. Dᵈ es la matriz de diferencias de orden d.',
      },
    ],
    chart: {
      raw: 'Señal original (ruidosa)',
      whittaker: 'Whittaker (λ=2)',
      xAxis: 'Tiempo (minutos)',
      yAxis: 'Corriente (A)',
    },
  },
  lstm: {
    titlePre: 'Modelo predictivo ',
    titlePost: '',
    intro:
      'Una red neuronal recurrente de 7 capas que recuerda el pasado para anticipar el futuro. Las celdas LSTM capturan la dinámica temporal del consumo — los ciclos diarios, los picos de laboratorio, las caídas nocturnas. Trabaja a resolución de 10 minutos: una ventana de entrada de 288 muestras (48 h) proyecta las siguientes 144 (24 h), y de forma recursiva extiende la predicción hasta 7 días.',
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
      'El Modelo A, entrenado con datos suavizados (Whittaker, λ = 2), supera estadísticamente al Modelo B, entrenado con datos ruidosos, al evaluarse ambos contra el ground truth (S_ref).',
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
      { t: 'Ground truth y suavizado', d: 'Implementación de Kalman, Savitzky-Golay y Whittaker. Selección supervisada contra la señal de referencia S_ref por mínimo RMSE. Ganador: Whittaker con λ=2, d=2.' },
      { t: 'Modelo LSTM', d: 'Entrenamiento de dos variantes — Modelo A (datos suavizados) y Modelo B (datos ruidosos) — y evaluación comparativa contra el ground truth con métricas MAE, RMSE, MSE y NSE.' },
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
  nav: {
    links: [
      { href: '#arquitectura', label: 'Architecture' },
      { href: '#infraestructura', label: 'Infrastructure' },
      { href: '#groundtruth', label: 'Ground truth' },
      { href: '#suavizado', label: 'Smoothing' },
      { href: '#modelo', label: 'Model' },
      { href: '#metodologia', label: 'Methodology' },
    ],
  },
  hero: {
    statusOrg: 'CECAR · SYSTEMS ENG.',
    statusKind: 'RESEARCH PROJECT',
    title1: 'Intelligent Monitoring System for',
    titleAccent: 'Electrical Parameters',
    university: 'Corporación Universitaria del Caribe (CECAR)',
    lead: 'A platform that turns the energy of university buildings into knowledge. High-precision sensors capture the electrical pulse of each block, a filtering pipeline cleans the noise inherent to measurement, and a recurrent neural network <strong class="font-semibold text-ink">learns to predict consumption</strong> days in advance. The goal: to show — against a reference signal measured before the sensor (<em>ground truth</em>) — that well-smoothed data is worth more than raw data when anticipating energy demand.',
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
  groundtruth: {
    h2: 'Ground truth & validation pipeline',
    intro:
      'To know whether cleaning the noise improves prediction, you need a measuring stick: a reference signal taken directly from the electrical panel, <strong class="font-semibold text-ink">before</strong> the sensor chain that introduces the noise. Against that reference (S<sub>ref</sub>) the smoother is selected and the predictive models are evaluated.',
    signals: [
      {
        sym: 'S_ref',
        name: 'Reference signal (ground truth)',
        desc: 'Taken at the electrical panel, before the external sensors. Until a paired physical S_ref exists, it is reconstructed with a moving median (5-sample window ≈ 5 min) that removes sample-to-sample impulsive noise while preserving real load steps.',
      },
      {
        sym: 'S_acq',
        name: 'Acquired signal (noisy)',
        desc: 'Captured by the full chain CT/Rogowski → ADE9000 → microcontroller. It carries the noise of the external conditioning: wiring, electromagnetic interference, shared grounds, oxidized contacts.',
      },
      {
        sym: 'S_sm',
        name: 'Smoothed signal',
        desc: 'The result of applying Whittaker (λ = 2, d = 2) to S_acq. λ is not chosen blindly: it is selected by minimizing RMSE against S_ref — supervised selection against the reference.',
      },
    ],
    abTitle: 'A/B experiment',
    laneA: ['S_acq', 'Whittaker λ=2', 'S_sm', 'LSTM · Model A'],
    laneB: ['S_acq', 'LSTM · Model B'],
    laneALabel: 'Branch A — smoothed data',
    laneBLabel: 'Branch B — raw data (baseline)',
    evalNote: 'Both models are evaluated against S_ref with RMSE, MAE, MSE, and NSE. If Model A wins, the smoothing pays off.',
    chartTitle: 'The three signals of the pipeline',
    illustrativeScale: 'Illustrative scale',
    chart: {
      ref: 'S_ref (ground truth)',
      acq: 'S_acq (acquired)',
      sm: 'S_sm (Whittaker λ=2)',
      xAxis: 'Time (minutes)',
      yAxis: 'Current (A)',
    },
  },
  smoothing: {
    h2: 'Smoothing algorithms',
    intro:
      'Every electrical measurement arrives with noise. Before predicting, you must decide how to clean it — and here the decision is not blind: three classic formulations are compared with <strong class="font-semibold text-ink">supervised metrics against the ground truth</strong> (RMSE, MAE, SNR improvement, R²). The winner is the one closest to the reference signal, not the one that makes the prettiest curve.',
    bestBadge: '★ Lowest RMSE vs S_ref',
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
        eqLabels: ['Functional', 'Solution', 'Selection (vs S_ref)'],
        nota: 'λ is chosen by minimizing RMSE against the reference signal S_ref. Dᵈ is the difference matrix of order d.',
      },
    ],
    chart: {
      raw: 'Original signal (noisy)',
      whittaker: 'Whittaker (λ=2)',
      xAxis: 'Time (minutes)',
      yAxis: 'Current (A)',
    },
  },
  lstm: {
    titlePre: '',
    titlePost: ' predictive model',
    intro:
      'A 7-layer recurrent neural network that remembers the past to anticipate the future. LSTM cells capture the temporal dynamics of consumption — daily cycles, laboratory peaks, nighttime drops. It works at 10-minute resolution: an input window of 288 samples (48 h) projects the next 144 (24 h), and recursively extends the forecast up to 7 days.',
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
      'Model A, trained on smoothed data (Whittaker, λ = 2), statistically outperforms Model B, trained on noisy data, when both are evaluated against the ground truth (S_ref).',
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
      { t: 'Ground truth & smoothing', d: 'Implementation of Kalman, Savitzky-Golay, and Whittaker. Supervised selection against the reference signal S_ref by minimum RMSE. Winner: Whittaker with λ=2, d=2.' },
      { t: 'LSTM model', d: 'Training two variants — Model A (smoothed data) and Model B (noisy data) — and comparative evaluation against the ground truth with MAE, RMSE, MSE, and NSE metrics.' },
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
