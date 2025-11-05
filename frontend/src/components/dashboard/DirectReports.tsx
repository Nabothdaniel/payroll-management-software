import { motion } from "framer-motion";
import { Users } from "lucide-react";

const team = [
  { name: "Chika Obi", role: "Engineer", time: "8:00 AM" },
  { name: "Tunde Alabi", role: "Designer", time: "8:10 AM" },
  { name: "Sarah James", role: "Product Lead", time: "9:00 AM" },
];

const DirectReports = () => (
  <motion.div
    className="card p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        Direct Reports
      </h2>
    </div>

    <ul className="space-y-3">
      {team.map((person, index) => (
        <li key={index} className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">{person.name}</p>
            <p className="text-xs text-gray-500">{person.role}</p>
          </div>
          <span className="text-xs text-gray-500">{person.time}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default DirectReports;
