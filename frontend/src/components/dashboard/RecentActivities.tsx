import { motion } from "framer-motion";
import { Activity as ActivityIcon } from "lucide-react";
import { useRealtimeActivities } from "../../hooks/useRealtimeActivities";

const RecentActivities = () => {
  const { activities, loading } = useRealtimeActivities();

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ActivityIcon className="w-5 h-5 text-primary" />
          Recent Activities
        </h2>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : activities.length === 0 ? (
          <p className="text-text-secondary text-center py-4">No recent activities</p>
        ) : (
          activities.slice(0, 5).map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-text-secondary">{activity.description}</p>
                <p className="text-xs text-text-secondary mt-1">
                  {new Date(activity.timestamp?.toDate?.() || Date.now()).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default RecentActivities;
