import React from "react";

export default function SummaryCard({ title, value, change, color, icon }) {
  const colorMap = {
    green: "text-green-600 bg-green-100",
    orange: "text-orange-600 bg-orange-100",
    blue: "text-blue-600 bg-blue-100",
    gray: "text-gray-600 bg-gray-200",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      {/* Left Side: Text */}
      <div>
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className="text-2xl font-bold text-gray-800 mt-1">{value}</div>
        <div
          className={`text-xs mt-1 ${colorMap[color]} inline-block px-2 py-1 rounded-full`}
        >
          {change} from last month
        </div>
      </div>

      {/* Right Side: Icon */}
      <div className="p-3 rounded-full bg-gray-100">{icon}</div>
    </div>
  );
}
