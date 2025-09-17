import React, { useMemo } from 'react';

function getDayKey(date) {
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}

export default function CalendarPanel({ data, onClose }) {
  // Agrupar datos por día y calcular promedios
  const days = useMemo(() => {
    const groups = {};
    data.forEach(row => {
      const key = getDayKey(row.time);
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });
    return Object.entries(groups).map(([day, rows]) => {
      const avgTemp = (rows.reduce((a, b) => a + b.temp, 0) / rows.length).toFixed(1);
      const avgHum = (rows.reduce((a, b) => a + b.hum, 0) / rows.length).toFixed(1);
      return { day, avgTemp, avgHum };
    });
  }, [data]);

  // Obtener año y mes actuales
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekDay = firstDay.getDay();

  // Crear matriz de días para el calendario
  const calendar = [];
  let week = Array(startWeekDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }
  if (week.length) calendar.push(week.concat(Array(7 - week.length).fill(null)));

  // Mapear promedios por día
  const avgByDay = Object.fromEntries(days.map(d => [d.day.slice(8, 10), d]));

  return (
    <div style={{background:'#fff',borderRadius:12,padding:24,boxShadow:'0 2px 16px #0001',maxWidth:700,margin:'32px auto'}}>
  {/* Botón de cerrar eliminado */}
      <h2 style={{marginBottom:16}}>Clima promedio diario ({year}-{String(month+1).padStart(2,'0')})</h2>
      <table style={{width:'100%',borderCollapse:'collapse',textAlign:'center'}}>
        <thead>
          <tr style={{background:'#f5f5f5'}}>
            <th>Dom</th><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th>
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, i) => (
            <tr key={i}>
              {week.map((d, j) => {
                const info = d && avgByDay[String(d).padStart(2,'0')];
                return (
                  <td key={j} style={{padding:8,background:info? '#e3f2fd':'#fafafa',border:'1px solid #eee',borderRadius:4,minWidth:48}}>
                    {d ? (
                      <div>
                        <div style={{fontWeight:600}}>{d}</div>
                        {info ? (
                          <div style={{fontSize:13}}>
                            <span>🌡️ {info.avgTemp}°C</span><br/>
                            <span>💧 {info.avgHum}%</span>
                          </div>
                        ) : <div style={{fontSize:12,color:'#bbb'}}>Sin datos</div>}
                      </div>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
