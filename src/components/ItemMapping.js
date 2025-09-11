import React, { useState, useEffect } from "react";
import { Edit, Trash2, Search } from "lucide-react";

export default function ItemMapping() {
  const [mappings, setMappings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMappings([
      {
        platform: "Netsuite",
        productId: "#12345667",
        productName: "Apple Airpods",
        platform1: "Daraz - #12345667",
        platform2: "Amazon - #533256436",
        platform3: "Ebay - #8932486677",
      },
      {
        platform: "Miro",
        productId: "#24354355",
        productName: "Power Bank",
        platform1: "Amazon - #24354355",
        platform2: "Temu - #34571856943",
        platform3: "Alibaba - #53535325",
      },
    ]);
  }, []);

  const filteredMappings = mappings.filter(
    (m) =>
      m.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.platform1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.platform2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.platform3.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-2xl font-bold mb-4">Item Mapping</h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6 gap-2">
        <div></div>
        <button className="bg-blue-600 text-white flex items-center px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto justify-center">
          + Add New
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-xs md:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 text-left whitespace-nowrap">
                Platform Name
              </th>
              <th className="px-2 py-2 text-left whitespace-nowrap">
                Product ID
              </th>
              <th className="px-2 py-2 text-left whitespace-nowrap">
                Product Name
              </th>
              <th className="px-2 py-2 text-left whitespace-nowrap">
                Platform 1
              </th>
              <th className="px-2 py-2 text-left whitespace-nowrap">
                Platform 2
              </th>
              <th className="px-2 py-2 text-left whitespace-nowrap">
                Platform 3
              </th>
              <th className="px-2 py-2 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMappings.length === 0 ? (
              <tr>
                <td className="px-2 py-4 text-center text-gray-500" colSpan="7">
                  No mappings found.
                </td>
              </tr>
            ) : (
              filteredMappings.map((m, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-2 py-2 break-words max-w-xs">
                    {m.platform}
                  </td>
                  <td className="px-2 py-2 break-words max-w-xs">
                    {m.productId}
                  </td>
                  <td className="px-2 py-2 break-words max-w-xs">
                    {m.productName}
                  </td>
                  <td className="px-2 py-2 break-words max-w-xs">
                    {m.platform1}
                  </td>
                  <td className="px-2 py-2 break-words max-w-xs">
                    {m.platform2}
                  </td>
                  <td className="px-2 py-2 break-words max-w-xs">
                    {m.platform3}
                  </td>
                  <td className="px-2 py-2 flex space-x-2">
                    <button className="text-blue-700 hover:underline">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:underline">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
