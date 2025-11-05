import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-text-primary">
        Good morning, {user?.displayName?.split(' ')[0] || 'User'}
      </h1>
      <p className="text-text-secondary mt-1">
        Here's a quick overview of your day
      </p>
    </motion.div>
  );
};

export default DashboardHeader;
