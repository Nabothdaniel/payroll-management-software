import { motion } from "framer-motion";
import { Gift } from "lucide-react";

const birthdays = [
  { name: "Ada Eze", date: "Oct 26", dept: "Finance" },
  { name: "Victor Ayeni", date: "Nov 3", dept: "HR" },
  { name: "Rita Ojo", date: "Nov 10", dept: "Design" },
];

const UpcomingBirthdays = () => (
  <motion.div
    className="card p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    <div className="flex items-center gap-2 mb-4">
      <Gift className="w-5 h-5 text-pink-500" />
      <h2 className="text-xl font-semibold">Upcoming Birthdays</h2>
    </div>

    <ul className="space-y-3">
      {birthdays.map((b, i) => (
        <li key={i} className="flex justify-between items-center">
          <div>
            <p className="font-medium text-sm">{b.name}</p>
            <p className="text-xs text-gray-500">{b.dept}</p>
          </div>
          <span className="text-xs text-gray-500">{b.date}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default UpcomingBirthdays;
