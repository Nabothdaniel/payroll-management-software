import { useState } from "react";
import { motion } from "framer-motion";
import { usePaymentCycles } from "../../hooks/usePaymentCycles";
import type { Employee } from "../../types";

const EmployeeTable = () => {
  const { employees, markEmployeeProcessed } = usePaymentCycles();
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-6">Employee Payments</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-text-secondary font-medium">Employee</th>
              <th className="py-3 px-4 text-left text-text-secondary font-medium">Department</th>
              <th className="py-3 px-4 text-left text-text-secondary font-medium">Salary</th>
              <th className="py-3 px-4 text-left text-text-secondary font-medium">Status</th>
              <th className="py-3 px-4 text-left text-text-secondary font-medium">Action</th>
            </tr>
          </thead>

          <motion.tbody initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {employees.map((e: Employee, i: number) => (
              <motion.div key={String(e.id)}>
                {/* Main row */}
                <motion.tr
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                  onClick={() => toggleExpand(String(e.id))}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-semibold">
                        {e.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="font-medium">{e.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-text-secondary">{e.department}</td>
                  <td className="py-4 px-4 font-semibold">₦{e.salary.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        e.status === "Processed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {e.status || "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {e.status !== "Processed" && (
                      <button
                        className="text-primary hover:text-primary-dark font-medium text-sm"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          markEmployeeProcessed(String(e.id));
                        }}
                      >
                        Mark Processed
                      </button>
                    )}
                  </td>
                </motion.tr>

                {/* Expanded details row */}
                {expandedIds.includes(String(e.id)) && (
                  <motion.tr
                    className="bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td colSpan={5} className="px-6 py-3 text-sm text-text-secondary">
                      <div className="grid grid-cols-2 gap-4">
                        <p><strong>Email:</strong> {e.email || "N/A"}</p>
                        <p><strong>Department:</strong> {e.department}</p>
                        <p><strong>Salary:</strong> ₦{e.salary?.toLocaleString() || 0}</p>
                        <p><strong>Overtime:</strong> ₦{e.overtime?.toLocaleString() || 0}</p>
                        <p><strong>Bonus:</strong> ₦{e.bonus?.toLocaleString() || 0}</p>
                        <p><strong>Benefits:</strong> ₦{e.benefits?.toLocaleString() || 0}</p>
                        <p><strong>Other:</strong> ₦{e.other?.toLocaleString() || 0}</p>
                        <p><strong>Status:</strong> {e.status || "Pending"}</p>
                        <p><strong>ID:</strong> {String(e.id)}</p>
                        {/* Add any other employee fields you may have */}
                      </div>
                    </td>
                  </motion.tr>
                )}
              </motion.div>
            ))}
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default EmployeeTable;
