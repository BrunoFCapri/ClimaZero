import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function DayChartPanel({ data, day, onClose, onDayChange }) {
  const [scale, setScale] = useState('dia');
  const [selected, setSelected] = useState('');
  if (!data || data.length === 0) return null;

  // Agrupar por escala
  function getKey(row) {
    const d = new Date(row.time);
    if (scale === 'dia') return d.toISOString().slice(0, 10);
    if (scale === 'semana') {
      const year = d.getFullYear();
      const firstDay = new Date(d.getFullYear(), 0, 1);
      const days = Math.floor((d - firstDay) / (24 * 60 * 60 * 1000));
      const week = Math.ceil((days + firstDay.getDay() + 1) / 7);
      return `${year}-S${week.toString().padStart(2, '0')}`;
    }
    if (scale === 'mes') return d.toISOString().slice(0, 7);
    if (scale === 'ano') return d.getFullYear().toString();
    return '';
  }

  // Opciones únicas para el selector
  const optionsList = Array.from(new Set(data.map(getKey)));
  const current = selected || optionsList[0];

  // Filtrar los datos del rango seleccionado
  const filtered = data.filter(row => getKey(row) === current);
  if (filtered.length === 0) return <div style={{padding:20}}>No hay datos para este rango.</div>;

  // Etiquetas para el eje X
  const labels = filtered.map(row => {
    const d = new Date(row.time);
    if (scale === 'dia') return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
    if (scale === 'semana' || scale === 'mes') return d.toISOString().slice(0, 10) + ' ' + d.getHours().toString().padStart(2, '0');
    if (scale === 'ano') return d.toISOString().slice(0, 10);
    return '';
  });
  const tempData = filtered.map(row => row.temp);
  const humData = filtered.map(row => row.hum);

  // Calcular máximos, mínimos y mediana
  function median(arr) {
    if (!arr.length) return null;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }
  const tempMax = Math.max(...tempData);
  const tempMin = Math.min(...tempData);
  const tempMed = median(tempData);
  const humMax = Math.max(...humData);
  const humMin = Math.min(...humData);
  const humMed = median(humData);

  // Datasets para la gráfica
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: tempData,
        borderColor: '#bfa14a',
        backgroundColor: 'rgba(191,161,74,0.18)',
        yAxisID: 'y',
        pointRadius: 0,
        fill: true,
        tension: 0.4,
      },

    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#bfa14a',
        bodyColor: '#1a2233',
        borderColor: '#bfa14a',
        borderWidth: 1,
        padding: 12,
      },
      datalabels: {
        color: '#bfa14a',
        font: { weight: 'bold', size: 14 },
      },
    },
    layout: {
      padding: { left: 10, right: 10, top: 10, bottom: 10 },
    },
    scales: {
      x: {
        grid: { color: '#e5e7eb', drawTicks: false },
        ticks: { color: '#bfa14a', font: { size: 14, weight: 'bold' } },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: { color: '#e5e7eb', drawTicks: false },
        ticks: { color: '#1a2233', font: { size: 15, weight: 'bold' } },
        title: { display: false },
  min: Math.min(...tempData) - 4,
  max: Math.max(...tempData) + 4,
      },
    },
    elements: {
      line: { borderWidth: 3 },
      point: { radius: 0 },
    },
    backgroundColor: '#fff',
  };

    return (
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '4px 10px',
        boxShadow: '0 6px 32px #bfa14a33, 0 1.5px 8px #FFD60022',
        maxWidth: 800,
        margin: '18px auto',
        border: '1.5px solid #e5e7eb',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{marginBottom:10,display:'flex',gap:12,alignItems:'center',justifyContent:'center'}}>
          <span style={{fontWeight:700,fontSize:19,letterSpacing:1.1,color:'#4FC3F7',textShadow:'0 1px 8px #b3e5fc88'}}>Gráfica de Temperatura y Humedad</span>
        </div>
        <div style={{marginBottom:8,display:'flex',gap:10,alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
          <label style={{fontWeight:600, color:'#1a2233', fontSize:14}}>Escala:</label>
          <select value={scale} onChange={e => { setScale(e.target.value); setSelected(''); }} style={{padding:'5px 12px',borderRadius:8,border:'1.5px solid #bfa14a',fontWeight:600,background:'#fff', color:'#1a2233', fontSize:14}}>
            <option value="dia">Día</option>
            <option value="semana">Semana</option>
            <option value="mes">Mes</option>
            <option value="ano">Año</option>
          </select>
          <label style={{fontWeight:600,marginLeft:10, color:'#1a2233', fontSize:14}}>Selecciona:</label>
          <select value={current} onChange={e => setSelected(e.target.value)} style={{padding:'5px 12px',borderRadius:8,border:'1.5px solid #4FC3F7',fontWeight:600,background:'#fff', color:'#1a2233', fontSize:14}}>
            {optionsList.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div style={{
          background:'#fff',
          borderRadius:14,
          padding:'2px 4px',
          boxShadow:'0 2px 12px #bfa14a11',
          marginBottom:2,
          minHeight:'90px',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          overflow:'hidden'
        }}>
          <div style={{width:'100%', maxWidth:700, margin:'0 auto', display:'block'}}>
            <Line data={chartData} options={options} />
          </div>
        </div>
  <div style={{marginTop:2,fontSize:14,display:'flex',justifyContent:'center',gap:12}}>
          <div style={{color:'#FFD600',fontWeight:700}}>
            <span style={{fontSize:15}}>🌡️ Temperatura:</span><br/>
            <span style={{fontSize:14}}>Máx: {tempMax}°C | Mín: {tempMin}°C | Mediana: {tempMed}°C</span>
          </div>
          <div style={{color:'#4FC3F7',fontWeight:700}}>
            <span style={{fontSize:15}}>💧 Humedad:</span><br/>
            <span style={{fontSize:14}}>Máx: {humMax}% | Mín: {humMin}% | Mediana: {humMed}%</span>
          </div>
        </div>
      </div>
    );
}
