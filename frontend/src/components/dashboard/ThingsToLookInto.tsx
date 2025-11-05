import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const tasks = [
  { id: 1, title: "Approve pending payroll", status: "Pending" },
  { id: 2, title: "Review leave requests", status: "2 awaiting review" },
  { id: 3, title: "Confirm new employee data", status: "1 unverified" },
];

const ThingsToLookInto = () => (
  <motion.div
    className="card p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        Things to Look Into
      </h2>
    </div>

    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
        >
          <span className="font-medium text-sm">{task.title}</span>
          <span className="text-xs text-gray-500">{task.status}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default ThingsToLookInto;
