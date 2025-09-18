# 🌡️ ClimaZero Frontend

**Dashboard Web Interactivo para Estación Meteorológica ESP32**

Una aplicación web moderna desarrollada en React que visualiza datos meteorológicos en tiempo real desde una estación ESP32 con integración a Supabase. Esta aplicación es una extensión del proyecto base [ClimaZero ESP32](https://github.com/BrunoFCapri/ClimaZero) que proporciona una interfaz web rica e interactiva para el monitoreo climático.

## 🌐 Demo en Vivo
**URL de Producción:** https://clima-zero-3xlfopf5y-brunofcapris-projects.vercel.app

---

## 📋 Tabla de Contenidos

- [🚀 Características](#-características)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [📦 Instalación](#-instalación)
- [⚙️ Configuración](#️-configuración)
- [🎯 Uso](#-uso)
- [📊 Componentes](#-componentes)
- [🗄️ Integración con Supabase](#️-integración-con-supabase)
- [🎨 Interfaz de Usuario](#-interfaz-de-usuario)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔧 API y Conexiones](#-api-y-conexiones)
- [🌍 Despliegue](#-despliegue)
- [🔍 Troubleshooting](#-troubleshooting)
- [🚧 Funcionalidades Avanzadas](#-funcionalidades-avanzadas)
- [📄 Licencia](#-licencia)

---

## 🚀 Características

### Visualización de Datos
- **Dashboard en Tiempo Real**: Visualización inmediata de temperatura y humedad
- **Gráficos Interactivos**: Líneas de tiempo con Chart.js para análisis histórico
- **Vista Calendario**: Promedios diarios organizados por mes
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **Iconografía Dinámica**: Iconos animados que reflejan condiciones climáticas

### Funcionalidades Interactivas
- **Filtros Temporales**: Visualización por día, hora, minuto o base de datos completa
- **Navegación Suave**: Scroll automático entre secciones
- **Estados Hover**: Efectos visuales responsivos
- **Responsive Design**: Adaptable a dispositivos móviles y desktop

### Integración de Datos
- **Conexión Supabase**: Datos en tiempo real desde base de datos en la nube
- **Histórico Completo**: Acceso a todo el registro meteorológico
- **Procesamiento Inteligente**: Agrupación y cálculo de estadísticas
- **Manejo de Errores**: Sistema robusto de manejo de estados de error

---

## 🛠️ Stack Tecnológico

### Frontend Framework
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1"
}
```

### Herramientas de Desarrollo
```json
{
  "vite": "^7.1.2",
  "eslint": "^9.33.0",
  "@vitejs/plugin-react": "^5.0.0"
}
```

### Librerías Principales
```json
{
  "@supabase/supabase-js": "^2.57.4",
  "chart.js": "^4.5.0",
  "react-chartjs-2": "^5.3.0",
  "framer-motion": "^12.23.12"
}
```

### Especificaciones Técnicas
- **Entorno de Desarrollo**: Vite + Hot Module Replacement
- **Transpilación**: ESNext con soporte moderno
- **Bundle Size**: Optimizado para producción
- **Compatibilidad**: Chrome 90+, Firefox 88+, Safari 14+

---

## 📦 Instalación

### Requisitos Previos
- **Node.js**: Versión 18.0.0 o superior
- **npm**: Versión 9.0.0 o superior
- **Git**: Para clonar el repositorio

### Clonar el Repositorio
```bash
git clone https://github.com/BrunoFCapri/ClimaZero.git
cd ClimaZero/frontend
```

### Instalar Dependencias
```bash
# Usando npm
npm install

# O usando yarn
yarn install

# O usando pnpm
pnpm install
```

### Verificar Instalación
```bash
npm run dev
```
La aplicación debería estar disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto frontend:

```env
# Configuración de Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-de-supabase

# Configuración de desarrollo (opcional)
VITE_DEV_MODE=true
VITE_API_ENDPOINT=http://192.168.1.100/data
```

### Configuración de Supabase

En `src/App.jsx`, actualizar las constantes:

```javascript
// Reemplazar con tus credenciales de Supabase
const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
const SUPABASE_ANON_KEY = 'tu-clave-anonima-aqui';
```

### Configuración de Vite

El archivo `vite.config.js` incluye optimizaciones para producción:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
          supabase: ['@supabase/supabase-js'],
          animations: ['framer-motion']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
```

---

## 🎯 Uso

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev

# Ejecutar linting
npm run lint

# Construir para producción
npm run build

# Preview de build de producción
npm run preview
```

### Flujo de Trabajo de Desarrollo

1. **Iniciar Desarrollo**: `npm run dev`
2. **Verificar Conexión**: Confirmar que Supabase esté conectado
3. **Desarrollar Features**: Hot reload automático disponible
4. **Linting**: Ejecutar `npm run lint` regularmente
5. **Testing**: Probar en diferentes dispositivos
6. **Build**: `npm run build` antes del despliegue

### Navegación de la Aplicación

#### Sección Home
- **Vista Principal**: Tarjetas de previsión diaria
- **Filtros Temporales**: 
  - Por Día: Agrupación diaria con temperaturas máximas/mínimas
  - Por Hora: Datos horarios detallados
  - Por Minuto: Datos en tiempo real
  - DB: Vista completa de base de datos

#### Sección Calendario
- **Vista Mensual**: Calendario con promedios diarios
- **Indicadores Visuales**: 
  - 🌡️ Temperatura promedio
  - 💧 Humedad promedio
- **Estados**: Días con/sin datos claramente diferenciados

#### Sección Gráfica
- **Chart Interactivo**: Línea de tiempo de temperatura
- **Escalas Configurables**:
  - Día: Progresión horaria
  - Semana: Vista semanal
  - Mes: Tendencias mensuales
  - Año: Análisis anual
- **Estadísticas**: Máximo, mínimo y mediana automáticos

---

## 📊 Componentes

### App.jsx - Componente Principal
```jsx
// Funcionalidades principales:
- Gestión de estado global
- Conexión con Supabase
- Filtros temporales
- Navegación suave
- Animaciones con Framer Motion
```

**Props y Estados Principales:**
- `data`: Array de datos meteorológicos
- `loading`: Estado de carga
- `error`: Manejo de errores
- `filter`: Filtro temporal activo
- `showDB`: Mostrar vista de base de datos

### DayChartPanel.jsx - Componente de Gráficas
```jsx
// Características:
- Integración Chart.js
- Escalas dinámicas
- Cálculos estadísticos
- Filtros temporales avanzados
```

**Props:**
- `data`: Datos para graficar
- `day`: Día seleccionado
- `onDayChange`: Callback para cambio de día

### CalendarPanel.jsx - Componente Calendario
```jsx
// Funcionalidades:
- Vista calendario mensual
- Cálculo de promedios diarios
- Indicadores visuales de estado
```

**Props:**
- `data`: Datos meteorológicos
- `onClose`: Callback de cierre (opcional)

### Componentes de Iconografía Animada

#### SunIcon - Sol Amarillo (Calor)
```jsx
// Usado para temperaturas >= 26°C
- Animación de rotación continua
- Color dorado (#FFD600)
- Rayos solares animados
```

#### BlueSunIcon - Sol Azul (Frío)
```jsx
// Usado para temperaturas <= 20°C
- Animación de rotación suave
- Color azul claro (#4FC3F7)
- Indicador de frío
```

#### SunCloudIcon - Sol con Nubes (Templado)
```jsx
// Usado para temperaturas 21-25°C
- Combinación sol + nubes
- Animación de opacidad en nubes
- Indicador de clima templado
```

#### DropIcon - Gota de Humedad
```jsx
// Usado para humedad >= 65%
- Animación de rebote vertical
- Color azul agua (#4FC3F7)
- Reflejo interno animado
```

---

## 🗄️ Integración con Supabase

### Configuración de la Base de Datos

#### Tabla `readings`
```sql
CREATE TABLE readings (
  id BIGSERIAL PRIMARY KEY,
  time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  temperature DECIMAL(5,2) NOT NULL,
  humidity DECIMAL(5,2) NOT NULL,
  device_id TEXT DEFAULT 'esp32_station',
  location TEXT DEFAULT NULL
);

-- Índices para optimización
CREATE INDEX idx_readings_time ON readings(time DESC);
CREATE INDEX idx_readings_device ON readings(device_id);
```

#### Políticas de Seguridad RLS
```sql
-- Habilitar Row Level Security
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY "Public read access" ON readings
  FOR SELECT USING (true);

-- Política para inserción (ESP32)
CREATE POLICY "ESP32 insert access" ON readings
  FOR INSERT WITH CHECK (device_id IS NOT NULL);
```

### Cliente de Supabase

```javascript
// Configuración del cliente
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tu-proyecto.supabase.co',
  'tu-clave-publica'
);

// Función de obtención de datos
async function fetchWeatherHistory() {
  const { data, error } = await supabase
    .from('readings')
    .select('time, temperature, humidity')
    .order('time', { ascending: false })
    .limit(1000); // Últimos 1000 registros
  
  if (error) throw error;
  return data;
}
```

### Manejo de Estados de Conexión

```javascript
// Estados de la aplicación
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Efecto para cargar datos
useEffect(() => {
  async function loadData() {
    try {
      setLoading(true);
      const history = await fetchWeatherHistory();
      setData(transformData(history));
    } catch (err) {
      setError(`Error al cargar datos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }
  
  loadData();
}, []);
```

---

## 🎨 Interfaz de Usuario

### Sistema de Colores

```css
:root {
  /* Colores principales */
  --primary-gold: #bfa14a;      /* Oro principal */
  --primary-blue: #4FC3F7;      /* Azul agua */
  --warm-yellow: #FFD600;       /* Amarillo cálido */
  --cool-blue: #B3E5FC;         /* Azul frío */
  
  /* Colores de estado */
  --success-green: #8bc34a;     /* Verde éxito */
  --error-red: #d32f2f;         /* Rojo error */
  --warning-orange: #ff9800;    /* Naranja advertencia */
  
  /* Colores neutrales */
  --dark-text: #1a2233;         /* Texto oscuro */
  --light-gray: #e5e7eb;        /* Gris claro */
  --background: #fff;           /* Fondo blanco */
}
```

### Tipografía

```css
/* Fuentes del sistema */
font-family: 
  -apple-system, 
  BlinkMacSystemFont, 
  'Segoe UI', 
  'Roboto', 
  'Oxygen',
  'Ubuntu', 
  'Cantarell', 
  'Fira Sans', 
  'Droid Sans', 
  'Helvetica Neue',
  sans-serif;

/* Escalas de tamaño */
--text-xs: 12px;    /* Texto pequeño */
--text-sm: 14px;    /* Texto secundario */
--text-base: 16px;  /* Texto base */
--text-lg: 18px;    /* Texto grande */
--text-xl: 20px;    /* Títulos */
--text-2xl: 24px;   /* Títulos principales */
```

### Animaciones con Framer Motion

#### Variantes de Contenedor
```javascript
const containerVariants = {
  hidden: { 
    opacity: 0.7, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.05,
      duration: 0.25 
    } 
  }
};
```

#### Variantes de Elementos
```javascript
const itemVariants = {
  hidden: { 
    opacity: 0.7, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.18 
    } 
  }
};
```

#### Efectos Hover
```javascript
// Efecto de escala en hover
whileHover={{ 
  scale: 1.06, 
  boxShadow: '0 4px 24px #bfa14a33' 
}}

// Rotación continua para iconos
animate={{ rotate: 360 }}
transition={{ 
  repeat: Infinity, 
  duration: 1.2, 
  ease: 'linear' 
}}
```

### Responsividad

```css
/* Mobile First Approach */
.forecast-cards-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .forecast-cards-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .forecast-cards-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large Desktop */
@media (min-width: 1200px) {
  .forecast-cards-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 📁 Estructura del Proyecto

```
frontend/
├── public/
│   └── vite.svg                 # Logo de Vite
├── src/
│   ├── assets/
│   │   └── react.svg           # Logo de React
│   ├── components/
│   │   ├── App.jsx             # Componente principal
│   │   ├── DayChartPanel.jsx   # Panel de gráficas
│   │   └── CalendarPanel.jsx   # Panel calendario
│   ├── styles/
│   │   ├── App.css             # Estilos principales
│   │   └── index.css           # Estilos globales
│   ├── utils/
│   │   └── (futuros helpers)
│   ├── hooks/
│   │   └── (futuros hooks)
│   ├── main.jsx                # Punto de entrada
│   ├── hornero.svg             # Logo de la aplicación
│   └── logo.svg                # Logo alternativo
├── .env.local                  # Variables de entorno
├── .gitignore                  # Archivos ignorados por Git
├── eslint.config.js           # Configuración ESLint
├── index.html                 # Template HTML
├── package.json               # Dependencias y scripts
├── README.md                  # Este archivo
└── vite.config.js            # Configuración de Vite
```

### Descripción de Archivos Clave

#### `src/App.jsx`
- **Función**: Componente raíz de la aplicación
- **Responsabilidades**: 
  - Gestión de estado global
  - Conexión con Supabase
  - Enrutado de navegación
  - Filtros temporales
  - Animaciones principales

#### `src/DayChartPanel.jsx`
- **Función**: Visualización de gráficas temporales
- **Responsabilidades**:
  - Rendering de gráficas Chart.js
  - Cálculos estadísticos
  - Filtros de escala temporal
  - Interactividad de datos

#### `src/CalendarPanel.jsx`
- **Función**: Vista de calendario mensual
- **Responsabilidades**:
  - Generación de calendario
  - Cálculo de promedios diarios
  - Visualización de estados de datos

#### `src/App.css`
- **Función**: Estilos principales de la aplicación
- **Incluye**: 
  - Clases de componentes
  - Animaciones CSS
  - Responsive design
  - Tema visual

---

## 🔧 API y Conexiones

### Endpoints de Supabase

#### Obtener Lecturas
```javascript
GET /rest/v1/readings
Headers:
  - apikey: [SUPABASE_ANON_KEY]
  - Authorization: Bearer [SUPABASE_ANON_KEY]

Query Parameters:
  - select: time,temperature,humidity
  - order: time.desc
  - limit: 1000
```

#### Respuesta de Ejemplo
```json
{
  "data": [
    {
      "time": "2025-09-18T14:30:00.000Z",
      "temperature": 25.4,
      "humidity": 62.1
    },
    {
      "time": "2025-09-18T14:25:00.000Z", 
      "temperature": 25.2,
      "humidity": 63.5
    }
  ],
  "error": null
}
```

### Transformación de Datos

```javascript
// Función de transformación de datos de Supabase
function transformData(rawData) {
  return rawData.map(row => {
    const dateObj = new Date(row.time);
    const dias = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
    const dia = dias[dateObj.getDay()];
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const hh = String(dateObj.getHours()).padStart(2, '0');
    const min = String(dateObj.getMinutes()).padStart(2, '0');
    
    return {
      fecha: `${dia} ${mm}--${dd}--${hh}-${min}`,
      temp: row.temperature,
      hum: row.humidity,
      time: row.time // Campo original para filtrado
    };
  });
}
```

### Manejo de Errores

```javascript
// Sistema robusto de manejo de errores
async function fetchWithRetry(fetchFunction, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchFunction();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Espera exponencial
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}

// Uso
try {
  const data = await fetchWithRetry(() => 
    supabase.from('readings').select('*').order('time', { ascending: false })
  );
} catch (error) {
  setError(`Error persistente: ${error.message}`);
}
```

---

## 🌍 Despliegue

### Despliegue en Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login en Vercel
vercel login

# 3. Desplegar desde la carpeta frontend
cd frontend
vercel

# 4. Configurar variables de entorno en dashboard de Vercel
# VITE_SUPABASE_URL=tu_url
# VITE_SUPABASE_ANON_KEY=tu_key
```

### Despliegue en Netlify

```bash
# 1. Build del proyecto
npm run build

# 2. Instalar Netlify CLI
npm install -g netlify-cli

# 3. Login y deploy
netlify login
netlify deploy --prod --dir=dist
```

### Configuración de Dominio Personalizado

```bash
# En Vercel
vercel domains add tu-dominio.com

# Configurar DNS
# Tipo: CNAME
# Nombre: @
# Valor: cname.vercel-dns.com
```

### Variables de Entorno en Producción

```env
# Variables requeridas para producción
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima
VITE_ENVIRONMENT=production
```

### GitHub Actions para CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
    paths: ['frontend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      - name: Build
        run: |
          cd frontend
          npm run build
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          working-directory: frontend
```

---

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Error de Conexión con Supabase
```
Error al obtener el historial: Invalid API key
```

**Solución:**
- Verificar `SUPABASE_URL` y `SUPABASE_ANON_KEY`
- Confirmar que las políticas RLS permiten acceso público
- Revisar configuración de CORS en Supabase

```javascript
// Test de conexión
async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('readings')
      .select('count(*)')
      .single();
    
    console.log('Conexión exitosa:', data);
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}
```

#### 2. Datos No Se Muestran
```
Componente carga pero sin datos
```

**Diagnóstico:**
```javascript
// Debug en consola del navegador
console.log('Data length:', data.length);
console.log('Loading state:', loading);
console.log('Error state:', error);
console.log('Sample data:', data[0]);
```

**Soluciones:**
- Verificar que la tabla `readings` tiene datos
- Confirmar nombres de columnas (`time`, `temperature`, `humidity`)
- Revisar timezone de fechas

#### 3. Gráficas No Se Renderizan
```
Error: Canvas is already in use
```

**Solución:**
```javascript
// Limpiar canvas antes de recrear
useEffect(() => {
  return () => {
    const chart = chartRef.current;
    if (chart) {
      chart.destroy();
    }
  };
}, []);
```

#### 4. Animaciones Lagueadas
```
Rendimiento lento en dispositivos móviles
```

**Optimizaciones:**
```javascript
// Reducir animaciones en dispositivos de bajo rendimiento
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animationProps = prefersReducedMotion ? {} : {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};
```

### Herramientas de Debug

#### React Developer Tools
- Instalar extensión del navegador
- Inspeccionar props y estado de componentes
- Profiler para rendimiento

#### Comando de Debug
```bash
# Ejecutar con debug habilitado
VITE_DEBUG=true npm run dev
```

#### Logs de Supabase
```javascript
// Habilitar logs detallados
const supabase = createClient(url, key, {
  global: {
    debug: true
  }
});
```

### Monitoreo en Producción

```javascript
// Error boundary para capturar errores
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado:', error, errorInfo);
    // Enviar a servicio de monitoreo (ej: Sentry)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo salió mal. Por favor recarga la página.</h1>;
    }

    return this.props.children;
  }
}
```

---

## 🚧 Funcionalidades Avanzadas

### Características en Desarrollo

#### 1. Notificaciones Push
```javascript
// Implementación futura
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register('/sw.js');
    // Configurar notificaciones de temperatura extrema
  }
};
```

#### 2. Exportación de Datos
```javascript
// Función para exportar CSV
const exportToCSV = (data) => {
  const csv = [
    ['Fecha', 'Temperatura', 'Humedad'],
    ...data.map(row => [row.time, row.temp, row.hum])
  ].map(row => row.join(',')).join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'clima-data.csv';
  a.click();
};
```

#### 3. Comparación de Periodos
```javascript
// Vista comparativa entre fechas
const ComparisonView = ({ startDate, endDate }) => {
  const [compareData, setCompareData] = useState([]);
  
  // Lógica de comparación temporal
  useEffect(() => {
    const filtered = data.filter(row => {
      const date = new Date(row.time);
      return date >= startDate && date <= endDate;
    });
    setCompareData(filtered);
  }, [startDate, endDate, data]);
  
  return <div>/* Componente de comparación */</div>;
};
```

#### 4. Predicciones con IA
```javascript
// Integración futura con modelos de ML
const WeatherPrediction = () => {
  const [predictions, setPredictions] = useState([]);
  
  useEffect(() => {
    // Llamada a API de predicción
    fetch('/api/predict', {
      method: 'POST',
      body: JSON.stringify(data.slice(-100)) // Últimos 100 puntos
    })
    .then(res => res.json())
    .then(setPredictions);
  }, [data]);
  
  return <div>/* Componente de predicciones */</div>;
};
```

### Integraciones Externas Planificadas

#### Weather APIs
- **OpenWeatherMap**: Comparación con datos meteorológicos oficiales
- **AccuWeather**: Pronósticos profesionales
- **WeatherAPI**: Datos históricos extendidos

#### Servicios de Monitoreo
- **Sentry**: Monitoreo de errores en producción
- **LogRocket**: Grabación de sesiones de usuario
- **Google Analytics**: Análisis de uso

#### Bases de Datos Adicionales
- **InfluxDB**: Para series temporales de alta frecuencia
- **MongoDB**: Almacenamiento de configuraciones complejas
- **Redis**: Cache de datos frecuentemente accedidos

---

## 📱 Versión Móvil

### Progressive Web App (PWA)

```json
// manifest.json (futuro)
{
  "name": "ClimaZero",
  "short_name": "ClimaZero",
  "description": "Monitoreo meteorológico en tiempo real",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#bfa14a",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Características Móviles

- **Touch Gestures**: Swipe entre secciones
- **Offline Mode**: Datos cached cuando no hay conexión
- **Push Notifications**: Alertas de temperaturas extremas
- **Native Features**: Compartir, geolocalización

---

## 🔒 Seguridad

### Mejores Prácticas Implementadas

#### 1. Sanitización de Datos
```javascript
// Validación de datos entrantes
const validateReading = (data) => {
  const temp = parseFloat(data.temperature);
  const hum = parseFloat(data.humidity);
  
  return {
    isValid: temp >= -50 && temp <= 80 && hum >= 0 && hum <= 100,
    errors: []
  };
};
```

#### 2. Variables de Entorno Seguras
```javascript
// Solo variables con prefijo VITE_ son expuestas al cliente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Variables sensibles solo en servidor
if (typeof window === 'undefined') {
  const privateKey = process.env.SUPABASE_SERVICE_KEY; // Solo servidor
}
```

#### 3. Políticas de Contenido
```html
<!-- Content Security Policy -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               connect-src 'self' https://*.supabase.co;
               style-src 'self' 'unsafe-inline';">
```

---

## 📚 Documentación para Desarrolladores

### Contribuir al Proyecto

#### 1. Fork y Clone
```bash
git clone https://github.com/tu-usuario/ClimaZero.git
cd ClimaZero/frontend
```

#### 2. Crear Rama de Feature
```bash
git checkout -b feature/nueva-funcionalidad
```

#### 3. Desarrollo
```bash
npm install
npm run dev
```

#### 4. Testing y Lint
```bash
npm run lint
npm run test # (cuando esté disponible)
```

#### 5. Commit y Push
```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

### Convenciones de Código

#### JavaScript/JSX
```javascript
// Usar camelCase para variables y funciones
const fetchWeatherData = async () => {};

// Usar PascalCase para componentes
const WeatherCard = ({ temperature, humidity }) => {};

// Usar constantes para valores fijos
const TEMPERATURE_THRESHOLDS = {
  COLD: 20,
  WARM: 26
};
```

#### CSS
```css
/* BEM naming convention */
.weather-card {}
.weather-card__title {}
.weather-card__title--highlighted {}

/* Mobile-first responsive design */
.container {
  /* Mobile styles first */
}

@media (min-width: 768px) {
  .container {
    /* Tablet and up */
  }
}
```

### API de Componentes

#### WeatherCard
```jsx
<WeatherCard 
  temperature={25.4}      // number: Temperatura en °C
  humidity={62.1}         // number: Humedad en %
  date="2025-09-18"      // string: Fecha ISO
  isToday={false}        // boolean: Si es el día actual
  onHover={handleHover}  // function: Callback para hover
  animate={true}         // boolean: Habilitar animaciones
/>
```

#### ChartPanel
```jsx
<ChartPanel 
  data={weatherData}     // array: Datos meteorológicos
  scale="dia"           // string: 'dia'|'semana'|'mes'|'ano'
  height={400}          // number: Altura del gráfico
  showStats={true}      // boolean: Mostrar estadísticas
  onDataPointClick={fn} // function: Click en punto de datos
/>
```

---

## 🎯 Roadmap

### Versión 2.0 (Q1 2025)
- [ ] PWA completa con offline mode
- [ ] Notificaciones push
- [ ] Exportación de datos (CSV, JSON)
- [ ] Comparación entre periodos
- [ ] Configuración de alertas personalizadas

### Versión 2.1 (Q2 2025)
- [ ] Integración con APIs meteorológicas externas
- [ ] Predicciones con machine learning
- [ ] Vista de mapas con múltiples estaciones
- [ ] Sistema de usuarios y perfiles

### Versión 3.0 (Q3 2025)
- [ ] App móvil nativa (React Native)
- [ ] Dashboard administrativo
- [ ] API pública para terceros
- [ ] Integración IoT avanzada

---

## 🤝 Contribuciones

### Cómo Contribuir

1. **Issues**: Reportar bugs o solicitar features
2. **Pull Requests**: Contribuir código siguiendo las convenciones
3. **Documentación**: Mejorar o traducir documentación
4. **Testing**: Escribir tests para componentes

### Guías de Contribución

- Seguir las convenciones de código establecidas
- Incluir tests para nuevas funcionalidades
- Documentar cambios en el README
- Usar commits descriptivos (Conventional Commits)

### Reconocimientos

Contribuidores al proyecto:
- **Bruno Fabián Capri** - Desarrollador principal
- **Comunidad** - Ideas y feedback

---

## 📄 Licencia

```
MIT License

Copyright (c) 2025 Bruno Fabián Capri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Soporte y Contacto

### Contacto del Desarrollador
- **Email**: bruno.fabian.capri.oficial@gmail.com
- **Teléfono**: +54 343 4178190
- **Discord**: bruno.f.c
- **GitHub**: [@BrunoFCapri](https://github.com/BrunoFCapri)

### Repositorios Relacionados
- **ESP32 Backend**: https://github.com/BrunoFCapri/ClimaZero
- **Frontend Web**: Este repositorio
- **Documentación**: Incluida en ambos repositorios

### Enlaces Útiles
- **Demo en Vivo**: https://clima-zero-3xlfopf5y-brunofcapris-projects.vercel.app
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard

---

**Versión del Documento**: 1.0  
**Última Actualización**: Septiembre 2025  
**Estado**: En Producción  
**Autor**: Bruno Fabián Capri

---

*Este proyecto es parte de la serie ClimaZero - soluciones integrales para monitoreo meteorológico con ESP32, React y tecnologías en la nube.*
