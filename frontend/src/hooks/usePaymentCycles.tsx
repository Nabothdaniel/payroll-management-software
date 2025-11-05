import { useState, useEffect } from "react";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  updateDoc,
  doc,
  Timestamp 
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { toast } from "sonner";

import type { PaymentCycle,Employee } from "../types";



export const usePaymentCycles = () => {
  const [cycles, setCycles] = useState<PaymentCycle[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch payment cycles
  useEffect(() => {
    const q = query(collection(db, "paymentCycles"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cyclesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PaymentCycle[];
      setCycles(cyclesData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Fetch employees in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "employees"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Employee[];
      setEmployees(data);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Create a manual payment cycle
  const createManualCycle = async (cycleData: Omit<PaymentCycle, "id" | "createdAt" | "isAutomatic" | "totalAmount" | "employeeCount">) => {
    try {
      if (employees.length === 0) {
        toast.error("No employees found. Please add employees first.");
        return;
      }

      const totalAmount = employees.reduce((sum, emp) => sum + Number(emp.salary || 0), 0);
      const employeeCount = employees.length;

      await addDoc(collection(db, "paymentCycles"), {
        ...cycleData,
        totalAmount,
        employeeCount,
        isAutomatic: false,
        createdAt: Timestamp.now(),
      });

      toast.success(`Payment cycle created — ₦${totalAmount.toLocaleString()} for ${employeeCount} employees`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to create payment cycle");
      throw error;
    }
  };

  // 🔹 Update employee payment status & recalc cycle totals
  const markEmployeeProcessed = async (empId: string) => {
    try {
      await updateDoc(doc(db, "employees", empId), { status: "Processed" });
      toast.success("Employee marked as Processed");

      // Optional: recalc cycles total
      // Example: if you have a cycle per month, you can update totals here
      // e.g., fetch cycles, recalc totalAmount of pending vs processed
    } catch (err) {
      console.error(err);
      toast.error("Failed to update employee status");
    }
  };

  const updateCycleStatus = async (cycleId: string, status: PaymentCycle["status"]) => {
    try {
      await updateDoc(doc(db, "paymentCycles", cycleId), { status });
      toast.success(`Payment cycle marked as ${status}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to update cycle status");
      throw error;
    }
  };

  return {
    cycles,
    employees,
    loading,
    createManualCycle,
    updateCycleStatus,
    markEmployeeProcessed,
  };
};
