import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { useTransactions } from "../../hooks/useTransactions";

const MyPieChart = () => {
  const { expensesBaseCategory } = useTransactions();
  const [data, setData] = useState(expensesBaseCategory());
  const total = data.reduce((sum, item) => sum + item.cost, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "12px 16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "16px" }}>
            {data.cat}
          </p>
          <p style={{ margin: "5px 0", color: "#666" }}>
            cost: {data.cost.toLocaleString()}$
          </p>
          <p style={{ margin: 0, color: "#999", fontSize: "12px" }}>
            {((data.cost / total) * 100).toFixed(1)}% of total expences
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{height:"100%" , aspectRatio:"1"}}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Expenses Distribution
      </h3>
      <PieChart width="100%" height="85%" responsive>
        <Pie
          data={data}
          dataKey="cost"
          nameKey="cat"
          innerRadius="80%"
          outerRadius="100%"
          cornerRadius="50%"
          fill="blue"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              stroke="#fff"
              strokeWidth={10}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "14px",
          }}
          formatter={(value, entry) => (
            <span style={{ color: "#333" }}>{value}</span>
          )}
        />
      </PieChart>
    </div>
  );
};

export default MyPieChart;
