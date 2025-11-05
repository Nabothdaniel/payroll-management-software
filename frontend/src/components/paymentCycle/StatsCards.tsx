import { motion } from "framer-motion";
import { DollarSign, Users, Calendar, TrendingUp } from "lucide-react";

const StatsCards = () => {
  const stats = [
    { icon: DollarSign, label: "Total Payroll", value: "₦125,450", change: "+12.5%", color: "bg-chart-blue" },
    { icon: Users, label: "Employees", value: "48", change: "+2", color: "bg-chart-cyan" },
    { icon: Calendar, label: "Processing Days", value: "2", change: "-1 day", color: "bg-chart-purple" },
    { icon: TrendingUp, label: "Avg. Salary", value: "₦2,614", change: "+8.3%", color: "bg-chart-orange" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-green-600 font-medium">{stat.change}</span>
          </div>
          <div>
            <p className="text-text-secondary text-sm">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
