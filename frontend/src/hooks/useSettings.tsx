// useSettings.ts
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
export const useSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user?.uid) return;
      try {
        const ref = doc(db, "settings", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) setSettings(snap.data());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [user]);

  const saveSettings = async (newSettings: any) => {
    if (!user?.uid) return;
    const ref = doc(db, "settings", user.uid);
    await setDoc(ref, newSettings, { merge: true });
    setSettings(newSettings);
  };

  return { settings, setSettings, saveSettings, loading };
};
