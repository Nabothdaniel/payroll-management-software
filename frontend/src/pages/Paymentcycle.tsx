import { useState } from "react";
import CycleHeader from "../components/paymentCycle/CycleHeader";
import CycleList from "../components/paymentCycle/CycleList";
import StatsCards from "../components/paymentCycle/StatsCards";
import PaymentBreakdown from "../components/paymentCycle/PaymentBreakdown";
import EmployeeTable from "../components/paymentCycle/EmployeeTable";
import CreateCycleModal from "../components/paymentCycle/CreateCycleModal";
import { useEmployees } from "../hooks/useEmployee";

const PaymentCycle = () => {
  const [selectedCycle, setSelectedCycle] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { employees } = useEmployees();

  return (
    <div className="px-0 md:p-8 space-y-6">
      <CycleHeader onCreate={() => setIsCreateModalOpen(true)} />
      <CycleList selectedCycle={selectedCycle} onSelect={setSelectedCycle} />
      <StatsCards />
      <PaymentBreakdown employees={employees} />
      <EmployeeTable />
      <CreateCycleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default PaymentCycle;
