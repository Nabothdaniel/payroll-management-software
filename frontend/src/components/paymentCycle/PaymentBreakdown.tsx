import { motion } from "framer-motion";

import type { Employee } from "../../types";

interface PaymentBreakdownProps {
  employees: Employee[];
}

const PaymentBreakdown = ({ employees }: PaymentBreakdownProps) => {
  // Sum up totals
  const totals = employees.reduce(
    (acc, emp) => {
      acc.base += emp.salary;
      acc.overtime += emp.overtime || 0;
      acc.bonuses += emp.bonus || 0;
      acc.benefits += emp.benefits || 0;
      acc.other += emp.other || 0;
      return acc;
    },
    { base: 0, overtime: 0, bonuses: 0, benefits: 0, other: 0 }
  );

  const totalAmount =
    totals.base + totals.overtime + totals.bonuses + totals.benefits + totals.other;

  const breakdown = [
    { category: "Base Salary", amount: totals.base, color: "bg-chart-blue" },
    { category: "Overtime", amount: totals.overtime, color: "bg-chart-cyan" },
    { category: "Bonuses", amount: totals.bonuses, color: "bg-chart-purple" },
    { category: "Benefits", amount: totals.benefits, color: "bg-chart-orange" },
    { category: "Other", amount: totals.other, color: "bg-chart-red" },
  ];

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-6">Payment Breakdown</h2>

      {employees.length === 0 ? (
        <p className="text-center text-text-secondary">No employee data available</p>
      ) : (
        <div className="space-y-4">
          {breakdown.map((item, index) => {
            const percentage = totalAmount
              ? ((item.amount / totalAmount) * 100).toFixed(1)
              : "0.0";
            return (
              <motion.div
                key={index}
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-text-secondary">{percentage}%</span>
                    <span className="font-bold">₦{item.amount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full ${item.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default PaymentBreakdown;
