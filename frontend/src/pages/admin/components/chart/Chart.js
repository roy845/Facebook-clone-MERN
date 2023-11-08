import "./chart.css";

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width={800} height={300} aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#000000" />
          <Line type="monotone" dataKey={dataKey} stroke="#000000" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#000000" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
