export interface Employee {
  id?: string;
  email: string;
  name: string;
  department: string;
  salary: number;
  overtime?: number;
  bonus?: number;
  benefits?: number;
  other?: number;
  status?: "Processed" | "Pending";

}


export interface PaymentCycle {
  id: string;
  period: string;
  startDate: string;
  endDate: string;
  dueDate: string;
  status: "In Progress" | "Completed" | "Scheduled";
  totalAmount: number;
  employeeCount: number;
  createdAt: any;
  isAutomatic: boolean;
}