import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

const requests = [
  { id: 1, name: "John Doe", date: "24–27 Oct", reason: "Medical Leave" },
  { id: 2, name: "Aisha Musa", date: "2–5 Nov", reason: "Family Event" },
];

const TimeOffRequests = () => {
  const handleAction = (name: string, action: "approved" | "rejected") => {
    toast.success(`${name}'s request ${action}.`);
  };

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Time-Off Requests
        </h2>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium text-sm">{req.name}</p>
              <p className="text-xs text-gray-500">{req.reason}</p>
              <p className="text-xs text-gray-500">{req.date}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(req.name, "approved")}
                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(req.name, "rejected")}
                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TimeOffRequests;
