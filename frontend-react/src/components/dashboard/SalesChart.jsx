// src/components/dashboard/SalesChart.jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MONTH_NAMES = ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'];

const SalesChart = ({ vendesPerMes }) => {
  // Construïm un mapa dels últims 6 mesos
  const now = new Date();
  const labels = [];
  const totalsMap = {};

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    labels.push(MONTH_NAMES[d.getMonth()]);
    totalsMap[key] = 0;
  }

  // Omplim amb dades reals de l'API
  (vendesPerMes || []).forEach(v => {
    const key = `${v._id.any}-${v._id.mes}`;
    if (key in totalsMap) totalsMap[key] = v.totalMes;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Ingressos (€)',
        data: Object.values(totalsMap),
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return 'rgba(255, 233, 25, 0.7)';
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(255, 233, 25, 0.85)');
          gradient.addColorStop(1, 'rgba(255, 233, 25, 0.15)');
          return gradient;
        },
        borderColor: '#ffe919',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(255, 233, 25, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111',
        borderColor: '#ffe91944',
        borderWidth: 1,
        titleColor: '#ffe919',
        bodyColor: '#e5e7eb',
        callbacks: {
          label: (ctx) => ` €${ctx.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#9ca3af', font: { family: 'Inter, sans-serif', size: 12 } },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: {
          color: '#9ca3af',
          font: { family: 'Inter, sans-serif', size: 12 },
          callback: (val) => `€${val}`,
        },
      },
    },
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,233,25,0.1)',
      borderRadius: '1rem',
      padding: '1.5rem',
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
          📊 Vendes per Mes
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.25rem' }}>
          Ingressos dels últims 6 mesos
        </p>
      </div>
      <div style={{ height: '260px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesChart;
