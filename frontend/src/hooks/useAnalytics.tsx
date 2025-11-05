// src/hooks/useAnalytics.ts
import { useState, useEffect } from "react";
import { DollarSign, Users, Calendar, Activity } from "lucide-react";
import type { Employee } from "../types"; // define Employee with { department, salary, benefits }

interface MonthlyData {
  month: string;
  payroll: number;
  employees: number;
}

interface DepartmentData {
  name: string;
  value: number;
  color: string;
}

interface ExpenseData {
  category: string;
  amount: number;
  percentage: number;
}

interface StatCard {
  icon: any;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
}

interface SummaryCard {
  title: string;
  value: string;
  amount?: string;
  employees?: string;
  description?: string;
  trend: string;
}

export const useAnalytics = (employees: Employee[]) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);
  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [summary, setSummary] = useState<SummaryCard[]>([]);

  useEffect(() => {
    if (!employees.length) return;

    // Monthly data
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov"];
    const monthly: MonthlyData[] = months.map((month, idx) => ({
      month,
      payroll: employees.reduce((sum, e) => sum + (e.salary || 0), 0) + idx * 2000,
      employees: employees.length
    }));
    setMonthlyData(monthly);

    // Department distribution
    const deptTotals: Record<string, number> = {};
    employees.forEach(emp => {
      deptTotals[emp.department] = (deptTotals[emp.department] || 0) + (emp.salary || 0);
    });

    const colors = ["#3B82F6", "#06B6D4", "#8B5CF6", "#F97316", "#EF4444"];
    const departments: DepartmentData[] = Object.entries(deptTotals).map(
      ([name, value], idx) => ({ name, value, color: colors[idx % colors.length] })
    );
    setDepartmentData(departments);

    // Expense data
    const totalPayroll = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    const benefitsTotal = employees.reduce((sum, emp) => sum + (emp.benefits || 0), 0);
    const taxes = totalPayroll * 0.15;
    const other = totalPayroll * 0.05;

    setExpenseData([
      { category: "Salaries", amount: totalPayroll, percentage: 68 },
      { category: "Benefits", amount: benefitsTotal, percentage: 12 },
      { category: "Taxes", amount: taxes, percentage: 14 },
      { category: "Other", amount: other, percentage: 6 },
    ]);

    // Stats
    setStats([
  {
    icon: DollarSign,
    label: "Total Payroll YTD",
    value: `₦${totalPayroll.toLocaleString()}`,
    change: "+15.2%",
    trend: "up",
    color: "bg-chart-blue",
  },
  {
    icon: Users,
    label: "Active Employees",
    value: employees.length.toString(), // plain number
    change: "+14.3%",
    trend: "up",
    color: "bg-chart-cyan",
  },
  {
    icon: Calendar,
    label: "Avg. Processing Time",
    value: "2.3 days", // plain text
    change: "-18.5%",
    trend: "down",
    color: "bg-chart-purple",
  },
  {
    icon: Activity,
    label: "Cost per Employee",
    value: `₦${Math.round(totalPayroll / employees.length).toLocaleString()}`,
    change: "+5.8%",
    trend: "up",
    color: "bg-chart-orange",
  },
]);


    // Summary cards
    setSummary([
      { title: "Highest Paid Department", value: "Engineering", amount: `₦${Math.max(...Object.values(deptTotals))}`, trend: "+8.2%" },
      { title: "Most Growing Department", value: "Marketing", employees: "12 employees", trend: "+25%" },
      { title: "Efficiency Score", value: "94%", description: "Processing efficiency", trend: "+3.5%" },
    ]);
  }, [employees]);

  return { monthlyData, departmentData, expenseData, stats, summary };
};
