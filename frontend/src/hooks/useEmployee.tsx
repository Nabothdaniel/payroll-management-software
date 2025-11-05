import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  writeBatch,
  doc,
} from "firebase/firestore";
import { toast } from "sonner";
import type { Employee } from "../types";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch employees and update state
  const fetchEmployees = async (): Promise<void> => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "employees"));
      const data: Employee[] = snap.docs.map((d) => {
        const docData = d.data();
        return {
          id: d.id,
          name: docData.name ?? "",
          email: docData.email ?? "",
          department: docData.department ?? "",
          salary: Number(docData.salary ?? 0),
          overtime: Number(docData.overtime ?? 0),
          bonus: Number(docData.bonus ?? 0),
          benefits: Number(docData.benefits ?? 0),
          other: Number(docData.other ?? 0),
        };
      });
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  // Add single employee
  const addEmployee = async (emp: Omit<Employee, "id" | "createdAt">) => {
    setLoading(true);
    try {
      await addDoc(collection(db, "employees"), {
        ...emp,
        salary: Number(emp.salary),
        createdAt: Timestamp.now(),
      });
      toast.success("Employee added successfully!");
      await fetchEmployees();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  // Add bulk employees
  const addBulkEmployees = async (file: File) => {
    setLoading(true);
    try {
      const text = await file.text();
      const rows = text.split("\n").slice(1);
      const batch = writeBatch(db);
      const employeesRef = collection(db, "employees");

      rows.forEach((row) => {
        const [name, email, department, salary] = row.split(",").map((x) => x.trim());
        if (name && email) {
          const newDocRef = doc(employeesRef);
          batch.set(newDocRef, {
            name,
            email,
            department,
            salary: Number(salary) || 0,
            createdAt: Timestamp.now(),
          });
        }
      });

      await batch.commit();
      toast.success("Bulk employees added successfully!");
      await fetchEmployees();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload bulk employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, addEmployee, addBulkEmployees, fetchEmployees };
};
