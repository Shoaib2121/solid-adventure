import React, { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "./components/Sidebar";
import ItemMapping from "./components/ItemMapping";
import InventorySync from "./components/InventorySync";
import OrderDashboard from "./components/OrderDashboard";
import Placeholder from "./components/Placeholder";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("mapping");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Section (pushed by sidebar on desktop) */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Navbar */}
        <header className="bg-white shadow flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 md:px-6 py-3 gap-2">
          {/* Breadcrumb */}
          <div className="text-gray-500 text-sm">
            Dashboard <span className="mx-1">›</span>{" "}
            <span className="text-gray-700 font-medium">
              {activeTab === "mapping"
                ? "Item Mapping"
                : activeTab === "orders"
                ? "Order Dashboard"
                : activeTab === "inventory"
                ? "Inventory Sync"
                : activeTab === "settings"
                ? "Settings"
                : "Help & Support"}
            </span>
          </div>

          {/* Search + Profile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent focus:outline-none w-full text-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://i.pravatar.cc/40?img=3"
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-gray-700">M.Shoaib</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-2 md:p-6 overflow-y-auto min-w-0">
          {activeTab === "mapping" && <ItemMapping />}
          {activeTab === "orders" && <OrderDashboard />}
          {activeTab === "inventory" && <InventorySync />}
          {activeTab === "settings" && <Placeholder title="Settings" />}
          {activeTab === "help" && <Placeholder title="Help & Support" />}
        </main>
      </div>
    </div>
  );
}
