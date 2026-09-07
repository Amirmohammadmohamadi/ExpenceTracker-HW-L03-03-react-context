import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTransactions } from "../../hooks/useTransactions";
import { useMemo } from "react";

const MyLineChart = () => {
  const { compareBaseTime } = useTransactions();

  const data = useMemo(() => compareBaseTime(), [compareBaseTime]);

  const formatCurrency = (value) => {
    return value.toLocaleString() + "$";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "14px 18px",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            minWidth: "200px",
          }}
        >
          <p
            style={{
              margin: "0 0 8px 0",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#333",
              borderBottom: "1px solid #eee",
              paddingBottom: "8px",
            }}
          >
          </p>

          {payload.map((entry, index) => (
            <p
              key={index}
              style={{
                margin: "6px 0",
                color: entry.color,
                fontSize: "14px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{entry.name}:</span>
              <span style={{ fontWeight: "bold" }}>
                {formatCurrency(entry.value)}
              </span>
            </p>
          ))}

          {payload.length === 2 && (
            <p
              style={{
                margin: "8px 0 0 0",
                color: "#666",
                borderTop: "1px solid #eee",
                paddingTop: "8px",
                fontSize: "14px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Daily Inventory:</span>
              <span
                style={{
                  fontWeight: "bold",
                  color:
                    payload[0].value - payload[1].value >= 0
                      ? "#4CAF50"
                      : "#FF6B6B",
                }}
              >
                {formatCurrency(payload[0].value - payload[1].value)}
              </span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#999",
          backgroundColor: "#f9f9f9",
          borderRadius: "12px",
        }}
      >
        <p style={{ fontSize: "16px" }}>No data to display.</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "450px" }}>
      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Comparison of income and expenses over time
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            angle={-30}
            textAnchor="end"
            height={60}
            interval={1}
            stroke="#999"
          />

          <YAxis
            tickFormatter={(value) => {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + "M";
              } else if (value >= 1000) {
                return (value / 1000).toFixed(0) + "K";
              }
              return value.toString();
            }}
            tick={{ fontSize: 11 }}
            stroke="#999"
            width={60}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            verticalAlign="top"
            height={40}
            iconType="circle"
            iconSize={10}
            wrapperStyle={{
              fontSize: "14px",
              fontWeight: "500",
            }}
            formatter={(value) => {
              return value === "income" ? "income" : "expense";
            }}
          />

          <Line
            type="monotone"
            dataKey="costIncomes"
            stroke="#4CAF50"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#4CAF50",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 8,
              stroke: "#4CAF50",
              strokeWidth: 2,
            }}
            name="income"
          />

          <Line
            type="monotone"
            dataKey="costExpenses"
            stroke="#FF6B6B"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#FF6B6B",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 8,
              stroke: "#FF6B6B",
              strokeWidth: 2,
            }}
            name="expense"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyLineChart;
