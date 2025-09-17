import './App.css';
import horneroLogo from './hornero.svg';
import { motion } from 'framer-motion';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import DayChartPanel from './DayChartPanel';
import CalendarPanel from './CalendarPanel';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wywcuhdexiiitliibpnu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5d2N1aGRleGlpaXRsaWlicG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMDU1NDAsImV4cCI6MjA3Mjc4MTU0MH0.d0tXuL0TR0807doulx-K_cXpj670QTJvv27oNYqG_is';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const containerVariants = {
  hidden: { opacity: 0.7, y: 10 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, delayChildren: 0.05, duration: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0.7, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};



// Sol amarillo animado (calor)
function SunIcon({ animate }) {
  return (
    <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{verticalAlign:'middle',marginRight:4}}
      animate={animate ? { rotate: 360 } : { rotate: 0 }}
      transition={animate ? { repeat: Infinity, duration: 1.2, ease: 'linear' } : {}}
    >
      <circle cx="12" cy="12" r="5" fill="#FFD600"/>
      <g stroke="#FFD600" strokeWidth="2">
        <line x1="12" y1="2" x2="12" y2="5"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="5" y2="12"/>
        <line x1="19" y1="12" x2="22" y2="12"/>
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
      </g>
    </motion.svg>
  );
}
// Sol azul animado (frío)
function BlueSunIcon({ animate }) {
  return (
    <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{verticalAlign:'middle',marginRight:4}}
      animate={animate ? { rotate: 360 } : { rotate: 0 }}
      transition={animate ? { repeat: Infinity, duration: 1.2, ease: 'linear' } : {}}
    >
      <circle cx="12" cy="12" r="5" fill="#4FC3F7"/>
      <g stroke="#4FC3F7" strokeWidth="2">
        <line x1="12" y1="2" x2="12" y2="5"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="5" y2="12"/>
        <line x1="19" y1="12" x2="22" y2="12"/>
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
      </g>
    </motion.svg>
  );
}
// Sol con nube animados (templado)
function SunCloudIcon({ animate }) {
  return (
    <span style={{position:'relative',display:'inline-block',width:28,height:22}}>
      <SunIcon animate={animate} />
      <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{position:'absolute',left:8,top:7}} initial={{opacity:0.7}} animate={{opacity:[0.7,1,0.7,1,0.7]}} transition={{repeat:Infinity,duration:2.2,ease:'easeInOut'}}>
        <ellipse cx="8" cy="10" rx="7" ry="4" fill="#B0BEC5"/>
        <ellipse cx="5" cy="8" rx="3" ry="2" fill="#CFD8DC"/>
        <ellipse cx="13" cy="11" rx="4" ry="3" fill="#ECEFF1"/>
      </motion.svg>
    </span>
  );
}
function CloudIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{verticalAlign:'middle',marginRight:4}}><ellipse cx="12" cy="16" rx="8" ry="5" fill="#B0BEC5"/><ellipse cx="8" cy="14" rx="4" ry="3" fill="#CFD8DC"/><ellipse cx="16" cy="15" rx="5" ry="4" fill="#ECEFF1"/></svg>
  );
}
function DropIcon({ animate }) {
  return (
    <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{verticalAlign:'middle',marginRight:4}}
      animate={animate ? { y: [0, 8, 0] } : { y: 0 }}
      transition={animate ? { repeat: Infinity, duration: 1.1, ease: 'easeInOut' } : {}}
    >
      <path d="M12 2C12 2 5 10.5 5 15.5C5 19.09 8.13 22 12 22C15.87 22 19 19.09 19 15.5C19 10.5 12 2 12 2Z" fill="#4FC3F7"/>
      <ellipse cx="12" cy="17" rx="3" ry="2" fill="#B3E5FC"/>
    </motion.svg>
  );
}

function getTempIcon(temp, animate) {
  // Calor >= 26: sol amarillo animado
  if (temp >= 26) return <SunIcon animate={animate} />;
  // Frío <= 20: sol azul animado
  if (temp <= 20) return <BlueSunIcon animate={animate} />;
  // Templado: sol con nube animados
  return <SunCloudIcon animate={animate} />;
}
function getHumIcon(hum, animate) {
  // Humedad alta >= 65
  if (hum >= 65) return <DropIcon animate={animate} />;
  return null;
}


function App() {
  // Scroll animado personalizado
  function smoothScrollTo(element) {
    if (!element) return;
  const targetY = element.getBoundingClientRect().top + window.scrollY + 20;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 700;
    let start;
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    requestAnimationFrame(step);
  }
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('dia');
  const [showDB, setShowDB] = useState(false);
  const chartRef = useRef(null);
  const calendarRef = useRef(null);
  const homeRef = useRef(null);

  // Scroll animado personalizado
  // ...existing code...
  const [selectedDay, setSelectedDay] = useState('');
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (showDB) {
      // Mostrar todos los datos sin agrupar ni filtrar, pero con tempMin igual a temp
      return [...data].sort((a, b) => new Date(b.time) - new Date(a.time)).map(row => ({ ...row, tempMin: row.temp }));
    }
    // Ordena todos los datos por fecha descendente antes de agrupar
    const sortedData = [...data].sort((a, b) => new Date(b.time) - new Date(a.time));
    const groups = {};
    sortedData.forEach((item) => {
      const date = new Date(item.time);
      let key = '';
      if (filter === 'dia') {
        key = date.toISOString().slice(0, 10); // yyyy-mm-dd
      } else if (filter === 'hora') {
        key = date.toISOString().slice(0, 13); // yyyy-mm-ddThh
      } else {
        key = date.toISOString().slice(0, 16); // yyyy-mm-ddThh:mm
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    // Para cada grupo, toma el primer registro (más reciente, ya que está ordenado) y calcula la mínima
    return Object.values(groups).map((group) => {
      const minTemp = Math.min(...group.map(g => g.temp));
      return { ...group[0], tempMin: minTemp };
    });
  }, [data, filter, showDB]);

  // Scroll automático
  


  // Obtener historial real de clima desde Supabase
  useEffect(() => {
    async function fetchWeatherHistory() {
      setLoading(true);
      setError(null);
      let { data: history, error } = await supabase
        .from('readings')
        .select('time, temperature, humidity')
        .order('time', { ascending: false });
      if (error) {
        setError('Error al obtener el historial: ' + error.message);
        setData([]);
      } else {
        // Mapear los datos a formato esperado por la UI
        setData(
          (history || []).map(row => {
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
              time: row.time // Guardar el campo original para filtrar
            };
          })
        );
      }
      setLoading(false);
    }
    fetchWeatherHistory();
  }, []);

  return (
    <div className="App">
      <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, type: 'spring' }} className="App-header">
        <div style={{marginBottom:16, display:'flex', gap:16, justifyContent:'center', alignItems:'center'}}>
          <button style={{padding:'0.5rem 1.2rem',fontWeight:600,borderRadius:8,background:'#8bc34a',color:'#fff',border:'none',cursor:'pointer'}}
            onClick={() => smoothScrollTo(homeRef.current)}>
            Home
          </button>
          <button style={{padding:'0.5rem 1.2rem',fontWeight:600,borderRadius:8,background:'#4FC3F7',color:'#fff',border:'none',cursor:'pointer'}}
            onClick={() => smoothScrollTo(calendarRef.current)}>
            Calendario
          </button>
          <button style={{padding:'0.5rem 1.2rem',fontWeight:600,borderRadius:8,background:'#bfa14a',color:'#fff',border:'none',cursor:'pointer'}}
            onClick={() => smoothScrollTo(chartRef.current)}>
            Gráfica
          </button>
        </div>
        <div style={{ position: 'relative', display: 'inline-block', width: 90, height: 90 }}>
          {/* Animación de viento en la parte superior (opcional, puedes quitarla si quieres todo estático) */}
          <motion.svg
            width="80"
            height="30"
            viewBox="0 0 80 30"
            style={{ position: 'absolute', top: 0, left: 5, pointerEvents: 'none', zIndex: 2 }}
            initial={{ opacity: 0.7 }}
            animate={{
              x: [0, 10, 0, -10, 0],
              opacity: [0.7, 1, 0.7, 1, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          >
            <motion.path
              d="M5 20 Q 20 5, 40 15 Q 60 25, 75 10"
              fill="none"
              stroke="#B3E5FC"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0.7, 1, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="75"
              cy="10"
              r="3.5"
              fill="#B3E5FC"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
            />
          </motion.svg>
          <img
            src={horneroLogo}
            className="App-logo"
            alt="logo hornero"
            style={{ width: 90, height: 90, position: 'relative', zIndex: 1 }}
          />
        </div>
        <h1>ClimaZero</h1>
        <p>Histórico de Temperatura y Humedad</p>
      </motion.header>
      <div ref={homeRef} style={{scrollMarginTop:80}}>
        <motion.main variants={containerVariants} initial="hidden" animate="visible" className="App-main">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#bfa14a' }}>Cargando datos...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#d32f2f' }}>{error}</div>
          ) : (
            <div className="forecast-cards-container">
              <div className="forecast-title">PREVISIÓN DIARIA</div>
              <div className="forecast-filters" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                <button className={`filter-btn${filter === 'dia' && !showDB ? ' active' : ''}`} onClick={() => { setFilter('dia'); setShowDB(false); }}>Por Día</button>
                <button className={`filter-btn${filter === 'hora' && !showDB ? ' active' : ''}`} onClick={() => { setFilter('hora'); setShowDB(false); }}>Por Hora</button>
                <button className={`filter-btn${filter === 'minuto' && !showDB ? ' active' : ''}`} onClick={() => { setFilter('minuto'); setShowDB(false); }}>Por Minuto</button>
                <button className={`filter-btn${showDB ? ' active' : ''}`} style={{ background: showDB ? '#bfa14a' : undefined }} onClick={() => setShowDB(true)}>DB</button>
              </div>
              <motion.div
                key={filter}
                className="cards-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {(showDB ? filteredData : filteredData.slice(0, 7)).map((row, idx) => {
                  const [dia, fecha] = row.fecha.split(' ');
                  let desc = 'Soleado y agradable';
                  if (row.temp >= 26 && row.hum >= 65) {
                    desc = 'Parcialmente soleado y pesado';
                  } else if (row.temp < 21) {
                    desc = 'Fresco o nublado';
                  }
                  const isToday = idx === 0;
                  const isHovered = hovered === idx;
                  return (
                    <motion.div
                      className={`forecast-card${isToday ? ' today' : ''}`}
                      key={row.fecha + row.temp + row.hum}
                      variants={itemVariants}
                      whileHover={{ scale: 1.06, boxShadow: '0 4px 24px #bfa14a33' }}
                      onMouseEnter={() => setHovered(idx)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="forecast-date">
                        <div className="forecast-day">{isToday ? 'HOY' : dia.toUpperCase() + '.'}</div>
                        <div className="forecast-fecha">{fecha.replace(/--/g, '/')}</div>
                      </div>
                      <div className="forecast-main">
                        <div className="forecast-temp">
                          {getTempIcon(row.temp, isHovered)}
                          <span className="temp-max">{row.temp}°</span>
                          <span className="temp-min">{row.tempMin}°</span>
                        </div>
                        <div className="forecast-desc">
                          <b>{desc}</b>
                          <div className="forecast-desc-sec">{
                            row.hum < 30 ? 'Seco, Baja Humedad'
                            : row.hum < 50 ? 'Parcialmente Húmedo, Ideal'
                            : row.hum < 70 ? 'Húmedo, Bochorno'
                            : 'Muy Húmedo, Bochorno Intenso'
                          }</div>
                        </div>
                        <div className="forecast-hum">
                          <DropIcon animate={isHovered && row.hum >= 65} /> {Math.round(row.hum)} %
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          )}
        </motion.main>
      </div>
      <div ref={calendarRef} style={{marginTop:32}}>
        <CalendarPanel data={data} />
      </div>
      <div ref={chartRef} style={{marginTop:32}}>
        <DayChartPanel
          data={data}
          day={selectedDay || (data[0] ? new Date(data[0].time).toISOString().slice(0,10) : '')}
          onDayChange={setSelectedDay}
        />
      </div>
      <footer className="App-footer">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          &copy; 2025 ClimaZero
        </motion.p>
      </footer>
    </div>
  );
}

export default App;
