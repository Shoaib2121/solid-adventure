import React from "react";

export default function Placeholder({ title }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600 mt-2">This section is under construction.</p>
    </div>
  );
}
