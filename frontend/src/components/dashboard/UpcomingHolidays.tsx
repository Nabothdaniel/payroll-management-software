import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Umbrella } from "lucide-react";

interface Holiday {
  name: string;
  date: string;
}

const UpcomingHolidays = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHolidays = async () => {
    try {
      const year = new Date().getFullYear();
      const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/NG`);
      if (!res.ok) throw new Error(`API responded with status ${res.status}`);

      const data = await res.json();

      // 🕓 Normalize today to 00:00 to avoid same-day filtering issues
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // ✅ Keep only today and future holidays
      const filtered = data.filter((item: any) => {
        const holidayDate = new Date(item.date);
        holidayDate.setHours(0, 0, 0, 0);
        return holidayDate >= today;
      });

      const formatted = filtered.map((item: any) => ({
        name: item.localName,
        date: new Date(item.date).toLocaleDateString("en-NG", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }));

      setHolidays(formatted);
    } catch (err) {
      console.error("Failed to fetch holidays:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Umbrella className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Upcoming Holidays</h2>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading holidays...</p>
      ) : holidays.length > 0 ? (
        <ul className="space-y-2">
          {holidays.map((h, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span>{h.name}</span>
              <span className="text-gray-500">{h.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No upcoming holidays found</p>
      )}
    </motion.div>
  );
};

export default UpcomingHolidays;
