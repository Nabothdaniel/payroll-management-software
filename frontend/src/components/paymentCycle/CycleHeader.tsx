import { motion } from "framer-motion";
import { Filter, Plus } from "lucide-react";

interface Props {
  onCreate: () => void;
}

const CycleHeader = ({ onCreate }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Payment Cycle</h1>
        <p className="text-text-secondary mt-1">Manage and track payroll cycles</p>
      </div>
      <div className="flex gap-3">
        <button className="btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button
          onClick={onCreate}
          className="btn-primary inline-flex items-center justify-center gap-2 px-3 h-10 text-sm rounded-md"
        >
          <Plus className="w-4 h-4" />
          Create Cycle
        </button>

      </div>
    </motion.div>
  );
};

export default CycleHeader;
