import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useEmployees } from "../hooks/useEmployee";
import { useAnalytics } from "../hooks/useAnalytics";

const Analytics = () => {
  const { employees } = useEmployees();
  const { monthlyData, departmentData, expenseData, stats, summary } = useAnalytics(employees);

  // Helper to format currency in Naira
  // Helper to format currency in Naira
const formatNaira = (amount: number | string, isCurrency = true) =>
  isCurrency ? `₦${Number(amount).toLocaleString()}` : amount;


  return (
    <div className="px-0 md:p-8 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-text-primary">Analytics & Reports</h1>
        <p className="text-text-secondary mt-1">Comprehensive payroll insights and trends</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-text-secondary text-sm">{stat.label}</p>
          <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Payroll Trend */}
        <motion.div className="card p-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <h2 className="text-xl font-semibold mb-6">Payroll Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                formatter={(value: number) => formatNaira(value)}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="payroll" stroke="hsl(173 80% 40%)" strokeWidth={3} dot={{ fill: "hsl(173 80% 40%)", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Distribution */}
        <motion.div className="card p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <h2 className="text-xl font-semibold mb-6">Department Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData.map(d => ({ name: d.name, value: d.value }))}
                cx="50%"
                cy="50%"
                dataKey="value"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent as number * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {departmentData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatNaira(value)}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Employee Growth */}
        <motion.div className="card p-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <h2 className="text-xl font-semibold mb-6">Employee Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                formatter={(value: number) => formatNaira(value)}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend />
              <Bar dataKey="employees" fill="hsl(173 80% 40%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expense Breakdown */}
        <motion.div className="card p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <h2 className="text-xl font-semibold mb-6">Expense Breakdown</h2>
          <div className="space-y-6">
            {expenseData.map((item, i) => (
              <motion.div
                key={i}
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.category}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-text-secondary">{item.percentage}%</span>
                    <span className="font-bold">{formatNaira(item.amount)}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summary.map((card, i) => (
          <motion.div
            key={i}
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
          >
            <h3 className="text-sm text-text-secondary mb-2">{card.title}</h3>
            <p className="text-2xl font-bold mb-1">{card.value}</p>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary text-sm">{card.amount || card.employees || card.description}</p>
              <span className="text-green-600 font-medium text-sm">{card.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
