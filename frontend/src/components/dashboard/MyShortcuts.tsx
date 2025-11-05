import { motion } from "framer-motion";
import { FileText, Users, DollarSign, Calendar } from "lucide-react";

const shortcuts = [
  { label: "Payroll", icon: <DollarSign className="w-4 h-4" /> },
  { label: "Employees", icon: <Users className="w-4 h-4" /> },
  { label: "Reports", icon: <FileText className="w-4 h-4" /> },
  { label: "Calendar", icon: <Calendar className="w-4 h-4" /> },
];

const MyShortcuts = () => (
  <motion.div
    className="card p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    <h2 className="text-xl font-semibold mb-4">My Shortcuts</h2>
    <div className="grid grid-cols-2 gap-3">
      {shortcuts.map((s, i) => (
        <button
          key={i}
          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
        >
          {s.icon}
          <span className="text-sm">{s.label}</span>
        </button>
      ))}
    </div>
  </motion.div>
);

export default MyShortcuts;
