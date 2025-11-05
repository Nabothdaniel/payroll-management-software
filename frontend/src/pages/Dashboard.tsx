import DashboardHeader from "../components/dashboard/DashboardHeader";
import ThingsToLookInto from "../components/dashboard/ThingsToLookInto";
import PayrollOverview from "../components/dashboard/PayrollOverview";
import RecentActivities from "../components/dashboard/RecentActivities";
import MyShortcuts from "../components/dashboard/MyShortcuts";
import UpcomingHolidays from "../components/dashboard/UpcomingHolidays";

const Dashboard = () => {
  return (
    <div className="p-8 space-y-6">
      <DashboardHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left side */}
        <div className="xl:col-span-2 space-y-6">
          <ThingsToLookInto />
          <PayrollOverview />
          <RecentActivities />
        </div>

        {/* Right side */}
        <div className="space-y-6">
          <MyShortcuts />
          <UpcomingHolidays />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
