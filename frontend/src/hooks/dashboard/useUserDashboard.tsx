// src/hooks/useUserDashboard.ts
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export const useUserDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [payroll, setPayroll] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [timeOffRequests, setTimeOffRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    try {
      const unsubTasks = onSnapshot(
        query(collection(db, "tasks"), where("userId", "==", user.uid)),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTasks(data);
        }
      );

      const unsubPayroll = onSnapshot(
        query(collection(db, "payrollCycles"), where("userId", "==", user.uid)),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setPayroll(data);
        }
      );

      const unsubReports = onSnapshot(collection(db, "directReports"), (snapshot) => {
        setReports(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

      const unsubRequests = onSnapshot(collection(db, "timeOffRequests"), (snapshot) => {
        setTimeOffRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

      setLoading(false);

      return () => {
        unsubTasks();
        unsubPayroll();
        unsubReports();
        unsubRequests();
      };
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error(error);
    }
  }, [user]);

  const latestPayroll = payroll.find((c) => c.status === "In Progress") || payroll[0];

  return {
    tasks,
    payroll,
    reports,
    timeOffRequests,
    latestPayroll,
    loading,
  };
};
