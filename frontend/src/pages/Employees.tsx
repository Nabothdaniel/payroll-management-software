// src/pages/Employees.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEmployees } from "../hooks/useEmployee";
import AddEmployeeModal from "../components/AddEmployeemodal";

const Employees = () => {
  const { employees, loading } = useEmployees();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className=" px-0 md:p-8 space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-text-secondary">Manage employee details and payroll data</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center justify-center rounded-md text-sm gap-2 h-10 px-4"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </button>

      </motion.div>

      {/* Employee List */}
      <div className="card p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : employees.length === 0 ? (
          <p className="text-center text-text-secondary">No employees found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-text-secondary font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium">Department</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium">Salary</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, i) => (
                  <motion.tr
                    key={emp.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-semibold">
                        {emp.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </div>
                      <span className="font-medium">{emp.name}</span>
                    </td>
                    <td className="py-3 px-4 text-text-secondary">{emp.email}</td>
                    <td className="py-3 px-4 text-text-secondary">{emp.department}</td>
                    <td className="py-3 px-4 font-semibold">
                      ₦{Number(emp.salary).toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <AddEmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Employees;
