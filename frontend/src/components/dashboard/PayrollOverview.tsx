import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { usePaymentCycles } from "../../hooks/usePaymentCycles";

const PayrollOverview = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const { cycles } = usePaymentCycles();
  const latestCycle = cycles.find(c => c.status === "In Progress") || cycles[0];

  const payrollData = [
    { label: "Gross Pay", amount: 20312, color: "bg-chart-blue" },
    { label: "Deductions", amount: 14896, color: "bg-chart-cyan" },
    { label: "Taxes", amount: 10000, color: "bg-chart-purple" },
    { label: "Benefits", amount: 3000, color: "bg-chart-orange" },
    { label: "Others", amount: 1896, color: "bg-chart-red" },
  ];

  useEffect(() => {
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current.children,
        { width: 0 },
        { 
          width: (i) => ["25%", "20%", "30%", "15%", "10%"][i],
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.1
        }
      );
    }
  }, []);

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Payroll</h2>
        <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
          View all payroll <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-text-secondary">
            {latestCycle ? `${latestCycle.period} - ${latestCycle.status}` : 'No active cycle'}
          </p>
          <p className="font-semibold text-xl">
            ${latestCycle ? latestCycle.totalAmount.toLocaleString() : '0'}
          </p>
        </div>
        <div className="flex h-3 rounded-full overflow-hidden" ref={progressRef}>
          {payrollData.map((item, index) => (
            <div key={index} className={`${item.color} h-full`} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PayrollOverview;
