import React, { useState } from "react";
import {
  ClipboardList,
  Map,
  Package,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

function SidebarButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center text-[14px] px-4 mx-4 w-[85%] rounded-full py-2 text-left transition ${
        active
          ? "bg-white bg-opacity-20 text-white font-semibold"
          : "text-white font-semibold hover:bg-blue-500"
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );
}

export default function Sidebar({ activeTab, setActiveTab }) {
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 font-bold text-xl flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-600"></div>
        <span className="text-white">Xpert.io</span>
      </div>
      <hr className="border-t border-white border-opacity-20 " />
      {/* Navigation */}
      <nav className="space-y-2 flex-1 mt-8">
        <SidebarButton
          icon={<ClipboardList className="w-5 h-5 mr-3" />}
          label="Order Dashboard"
          active={activeTab === "orders"}
          onClick={() => {
            setActiveTab("orders");
            setOpen(false);
          }}
        />
        <SidebarButton
          icon={<Map className="w-5 h-5 mr-3" />}
          label="Item Mapping"
          active={activeTab === "mapping"}
          onClick={() => {
            setActiveTab("mapping");
            setOpen(false);
          }}
        />
        <SidebarButton
          icon={<Package className="w-5 h-5 mr-3" />}
          label="Inventory Sync"
          active={activeTab === "inventory"}
          onClick={() => {
            setActiveTab("inventory");
            setOpen(false);
          }}
        />
        <br />
        <hr className="mt-8 mb-2 my-4 border-t border-white border-opacity-20" />
        {/* Tools */}
        <div className="mt-10 px-4 text-xs uppercase tracking-wide text-gray-200 font-semibold">
          Tools
        </div>
        <SidebarButton
          icon={<Settings className="w-5 h-5 mr-3" />}
          label="Settings"
          active={activeTab === "settings"}
          onClick={() => {
            setActiveTab("settings");
            setOpen(false);
          }}
        />
        <SidebarButton
          icon={<HelpCircle className="w-5 h-5 mr-3" />}
          label="Help & Support"
          active={activeTab === "help"}
          onClick={() => {
            setActiveTab("help");
            setOpen(false);
          }}
        />
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#3B6FF8] p-2 rounded-full shadow-lg focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 w-64 h-screen z-20 bg-[#3B6FF8] text-white overflow-y-auto rounded-br-[120px]">
        {sidebarContent}
      </aside>

      {/* Sidebar for mobile (drawer) */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-[#3B6FF8] text-white flex flex-col h-full rounded-br-[120px] animate-slideInLeft relative">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
            {sidebarContent}
          </div>
          {/* Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
}
