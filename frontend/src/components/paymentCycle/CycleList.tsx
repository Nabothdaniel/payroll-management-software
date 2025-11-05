import { motion } from "framer-motion";
import { usePaymentCycles } from "../../hooks/usePaymentCycles";

interface Props {
  selectedCycle: string;
  onSelect: (id: string) => void;
}

const CycleList = ({ selectedCycle, onSelect }: Props) => {
  const { cycles, loading } = usePaymentCycles();

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (cycles.length === 0) {
    return (
      <div className="card p-8 w-full text-center">
        <p className="text-text-secondary">
          No payment cycles yet. Create your first cycle!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex gap-4 overflow-x-auto pb-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {cycles.map((cycle) => (
        <motion.button
          key={cycle.id}
          onClick={() => onSelect(cycle.id)}
          className={`card p-6 min-w-[300px] transition-all ${
            selectedCycle === cycle.id
              ? "border-primary ring-2 ring-primary/20"
              : "hover:border-gray-300"
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">
              {cycle.period}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                cycle.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : cycle.status === "In Progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {cycle.status}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Total Amount</span>
              <span className="font-bold text-xl">
                ₦{cycle.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Employees</span>
              <span className="font-semibold">{cycle.employeeCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Due Date</span>
              <span className="font-semibold">{cycle.dueDate}</span>
            </div>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CycleList;
