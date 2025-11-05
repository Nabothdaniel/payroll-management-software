import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { useEmployees } from "../hooks/useEmployee";
import type { Employee } from "../types";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Form state using strings for numeric inputs
interface FormEmployee {
  name: string;
  email: string;
  department: string;
  salary: string;
  overtime: string;
  bonus: string;
  benefits: string;
  other: string;
}

const AddEmployeeModal = ({ isOpen, onClose }: AddEmployeeModalProps) => {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [employeeForm, setEmployeeForm] = useState<FormEmployee>({
    name: "",
    email: "",
    department: "",
    salary: "",
    overtime: "",
    bonus: "",
    benefits: "",
    other: "",
  });

  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const { addEmployee, addBulkEmployees, loading } = useEmployees();

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Employee = {
      name: employeeForm.name,
      email: employeeForm.email,
      department: employeeForm.department,
      salary: Number(employeeForm.salary) || 0,
      overtime: Number(employeeForm.overtime) || 0,
      bonus: Number(employeeForm.bonus) || 0,
      benefits: Number(employeeForm.benefits) || 0,
      other: Number(employeeForm.other) || 0,
    };
    await addEmployee(payload);
    onClose();
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkFile) return;
    await addBulkEmployees(bulkFile);
    onClose();
  };

  if (!isOpen) return null;

  // Animate each field on mobile
  const mobileMotion = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl relative overflow-auto max-h-[90vh]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-semibold mb-4">Add Employee</h2>

          {/* Mode toggle */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setMode("single")}
              className={`px-3 py-1 rounded-lg text-sm ${
                mode === "single" ? "bg-primary text-white" : "bg-gray-100"
              }`}
            >
              Single Employee
            </button>
            <button
              onClick={() => setMode("bulk")}
              className={`px-3 py-1 rounded-lg text-sm ${
                mode === "bulk" ? "bg-primary text-white" : "bg-gray-100"
              }`}
            >
              Bulk Upload
            </button>
          </div>

          {/* Single Employee Form */}
          {mode === "single" ? (
            <form
              onSubmit={handleSingleSubmit}
              className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/** Full Name */}
              <motion.div {...mobileMotion}>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g., John Doe"
                  value={employeeForm.name}
                  onChange={(e) =>
                    setEmployeeForm({ ...employeeForm, name: e.target.value })
                  }
                  className="input w-full"
                  required
                />
              </motion.div>

              {/** Email */}
              <motion.div {...mobileMotion}>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="e.g., john@example.com"
                  value={employeeForm.email}
                  onChange={(e) =>
                    setEmployeeForm({ ...employeeForm, email: e.target.value })
                  }
                  className="input w-full"
                  required
                />
              </motion.div>

              {/** Department */}
              <motion.div {...mobileMotion}>
                <label className="block mb-1 font-medium">Department</label>
                <input
                  type="text"
                  placeholder="e.g., Engineering"
                  value={employeeForm.department}
                  onChange={(e) =>
                    setEmployeeForm({ ...employeeForm, department: e.target.value })
                  }
                  className="input w-full"
                  required
                />
              </motion.div>

              {/** Salary */}
              <motion.div {...mobileMotion}>
                <label className="block mb-1 font-medium">Salary (₦)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={employeeForm.salary}
                  onChange={(e) =>
                    setEmployeeForm({ ...employeeForm, salary: e.target.value })
                  }
                  className="input w-full"
                  required
                />
              </motion.div>

              {/** Optional salary breakdown */}
              <fieldset className="border p-3 rounded-lg md:col-span-2">
                <legend className="font-medium">Optional Salary Breakdown</legend>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-2">
                  {["Overtime", "Bonus", "Benefits", "Other"].map((field) => (
                    <motion.div key={field} {...mobileMotion}>
                      <label className="block text-sm">{field} (₦)</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={employeeForm[field.toLowerCase() as keyof FormEmployee]}
                        onChange={(e) =>
                          setEmployeeForm({
                            ...employeeForm,
                            [field.toLowerCase()]: e.target.value,
                          })
                        }
                        className="input w-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </fieldset>

              {/** Submit button */}
              <motion.div {...mobileMotion} className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-2"
                >
                  {loading ? "Adding..." : "Add Employee"}
                </button>
              </motion.div>
            </form>
          ) : (
            // Bulk Upload Form
            <form onSubmit={handleBulkSubmit} className="space-y-4">
              <label
                htmlFor="bulkUpload"
                className="flex items-center justify-center border-2 border-dashed rounded-xl py-8 text-gray-500 cursor-pointer hover:border-primary"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload CSV File
              </label>
              <input
                id="bulkUpload"
                type="file"
                accept=".csv"
                onChange={(e) => setBulkFile(e.target.files?.[0] || null)}
                className="hidden"
              />

              <button
                type="submit"
                disabled={loading || !bulkFile}
                className="btn-primary w-full px-3 py-2 rounded-sm"
              >
                {loading ? "Uploading..." : "Upload Employees"}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddEmployeeModal;
