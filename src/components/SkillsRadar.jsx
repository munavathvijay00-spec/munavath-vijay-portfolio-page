import React from 'react';
import { motion } from 'framer-motion';

const SkillsRadar = () => {
  // Define axes for the radar chart
  const metrics = [
    { name: 'React', value: 95 },
    { name: 'Solidity', value: 85 },
    { name: 'UI/UX', value: 80 },
    { name: 'Node.js', value: 75 },
    { name: 'Three.js', value: 70 },
    { name: 'Tailwind', value: 95 },
  ];

  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  const maxVal = 100;
  const numAxes = metrics.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Calculate points for the polygon based on values
  const dataPoints = metrics.map((metric, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (metric.value / maxVal) * radius;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  });
  
  const polygonString = dataPoints.join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-8 glass rounded-3xl w-full max-w-md mx-auto h-[400px]">
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </radialGradient>
        </defs>
        
        {/* Radar grid circles */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, i) => (
          <circle 
            key={i} 
            cx={center} 
            cy={center} 
            r={radius * scale} 
            fill={scale === 1 ? 'url(#radarBg)' : 'none'} 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="1" 
          />
        ))}

        {/* Radar axes */}
        {metrics.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <line 
              key={i}
              x1={center} 
              y1={center} 
              x2={center + radius * Math.cos(angle)} 
              y2={center + radius * Math.sin(angle)} 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="1" 
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
          points={polygonString} 
          fill="rgba(16, 185, 129, 0.4)" 
          stroke="#10b981" 
          strokeWidth="2"
          className="origin-center hover:fill-emerald-500/60 transition-all cursor-pointer"
        />

        {/* Axis labels */}
        {metrics.map((metric, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = radius + 25;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          return (
            <text 
              key={i} 
              x={x} 
              y={y} 
              fill="#94a3b8" 
              fontSize="12" 
              fontWeight="bold"
              textAnchor="middle" 
              alignmentBaseline="middle"
            >
              {metric.name}
            </text>
          );
        })}

        {/* Data points */}
        {metrics.map((metric, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const r = (metric.value / maxVal) * radius;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return (
            <circle key={`dot-${i}`} cx={x} cy={y} r="4" fill="#10b981" />
          );
        })}
      </svg>
    </div>
  );
};

export default SkillsRadar;
