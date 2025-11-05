import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  addDoc
} from "firebase/firestore";
import { db } from "../lib/firebase"

export interface Activity {
  id: string;
  type: "payment_cycle" | "time_off" | "employee" | "payroll";
  title: string;
  description: string;
  timestamp: any;
  user?: string;
}

export const useRealtimeActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "activities"),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const activitiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Activity[];

      setActivities(activitiesData);
      setLoading(false);

      // 👇 Log a default activity if none exists
      if (activitiesData.length === 0) {
        await addDoc(collection(db, "activities"), {
          type: "system",
          title: "Welcome to your dashboard 🎉",
          description: "Start tracking your first activity here!",
          timestamp: Timestamp.now(),
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const logActivity = async (activity: Omit<Activity, "id" | "timestamp">) => {
    try {
      await addDoc(collection(db, "activities"), {
        ...activity,
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      console.error("Failed to log activity:", error);
    }
  };

  return { activities, loading, logActivity };
};
