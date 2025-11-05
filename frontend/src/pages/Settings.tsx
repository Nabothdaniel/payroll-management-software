import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import {
  User,
  Building,
  DollarSign,
  Bell,
  Shield,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
} from "lucide-react";
import { useSettings } from "../hooks/useSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("company");
  const { settings, setSettings, saveSettings, loading } = useSettings();

  const tabs = [
    { id: "company", label: "Company", icon: Building },
    { id: "payroll", label: "Payroll", icon: DollarSign },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "profile", label: "Profile", icon: User },
  ];

  const handleChange = (field: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await saveSettings(settings);
      toast.success("Settings saved successfully 🎉");
      new Audio("/sounds/save.mp3").play?.();
    } catch (error) {
      toast.error("Failed to save settings");
      console.error(error);
    }
  };

  if (loading)
    return <div className="p-8 text-gray-500">Loading settings...</div>;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary mt-1">
          Manage your payroll system configuration
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-text-primary"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === "company" && (
            <motion.div
              className="card p-6 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold">Company Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">
                    Company Name
                  </label>
                  <div className="flex items-center gap-2 input">
                    <Building className="w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      value={settings.companyName || ""}
                      onChange={(e) =>
                        handleChange("companyName", e.target.value)
                      }
                      placeholder="Aspire Global"
                      className="flex-1 outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">
                    Industry
                  </label>
                  <select
                    className="w-full input"
                    value={settings.industry || "Technology"}
                    onChange={(e) => handleChange("industry", e.target.value)}
                  >
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Retail</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">
                    Email
                  </label>
                  <div className="flex items-center gap-2 input">
                    <Mail className="w-4 h-4 text-text-muted" />
                    <input
                      type="email"
                      value={settings.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="contact@aspire.com"
                      className="flex-1 outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">
                    Phone
                  </label>
                  <div className="flex items-center gap-2 input">
                    <Phone className="w-4 h-4 text-text-muted" />
                    <input
                      type="tel"
                      value={settings.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+234 801 234 5678"
                      className="flex-1 outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-text-secondary">
                    Address
                  </label>
                  <div className="flex items-center gap-2 input">
                    <MapPin className="w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      value={settings.address || ""}
                      onChange={(e) => handleChange("address", e.target.value)}
                      placeholder="123 Allen Ave, Ikeja, Lagos"
                      className="flex-1 outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">
                    Time Zone
                  </label>
                  <div className="flex items-center gap-2 input">
                    <Globe className="w-4 h-4 text-text-muted" />
                    <select
                      value={settings.timeZone || "Africa/Lagos"}
                      onChange={(e) => handleChange("timeZone", e.target.value)}
                      className="flex-1 outline-none bg-transparent"
                    >
                      <option>Africa/Lagos</option>
                      <option>Africa/Accra</option>
                      <option>Europe/London</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">
                    Currency
                  </label>
                  <select
                    className="w-full input"
                    value={settings.currency || "NGN (₦)"}
                    onChange={(e) => handleChange("currency", e.target.value)}
                  >
                    <option>NGN (₦)</option>
                    <option>USD ($)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  className="btn-primary flex items-center gap-2"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
