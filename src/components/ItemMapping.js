import React, { useState } from "react";
import { Edit, Trash2, Search, X } from "lucide-react";

export default function ItemMapping() {
  const [mappings, setMappings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newMapping, setNewMapping] = useState({
    platform: "",
    productId: "",
    productName: "",
    platform1: "",
    platform2: "",
    platform3: "",
  });
  const [saving, setSaving] = useState(false);

  const filteredMappings = mappings.filter(
    (m) =>
      m.platform?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.productId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.platform1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.platform2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.platform3?.toLowerCase().includes(searchTerm.toLowerCase())
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
        <button
          className="bg-blue-600 text-white flex items-center px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto justify-center"
          onClick={() => setShowModal(true)}
        >
          + Add New
        </button>
      </div>

      {/* Modal for Add New */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold mb-4">Add New Mapping</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                try {
                  const res = await fetch(
                    "https://td3032620.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=128&deploy=1&compid=TD3032620&ns-at=AAEJ7tMQQB9WBes4OJ5w_Zp_EmnCNjh0ctgkeZWH-Ve31cdjswE",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "Mozilla/5.0",
                      },
                      body: JSON.stringify(newMapping),
                    }
                  );

                  if (!res.ok) throw new Error("Failed to save mapping");
                  const saved = await res.json();

                  setMappings((prev) => [...prev, saved]);
                  setShowModal(false);
                  setNewMapping({
                    platform: "",
                    productId: "",
                    productName: "",
                    platform1: "",
                    platform2: "",
                    platform3: "",
                  });
                } catch (err) {
                  console.error("Error saving mapping:", err);
                  alert("Failed to save mapping.");
                } finally {
                  setSaving(false);
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={newMapping.platform}
                    onChange={(e) =>
                      setNewMapping({ ...newMapping, platform: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product ID
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={newMapping.productId}
                    onChange={(e) =>
                      setNewMapping({
                        ...newMapping,
                        productId: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={newMapping.productName}
                    onChange={(e) =>
                      setNewMapping({
                        ...newMapping,
                        productName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Platform 1
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={newMapping.platform1}
                    onChange={(e) =>
                      setNewMapping({
                        ...newMapping,
                        platform1: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Platform 2
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={newMapping.platform2}
                    onChange={(e) =>
                      setNewMapping({
                        ...newMapping,
                        platform2: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Platform 3
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={newMapping.platform3}
                    onChange={(e) =>
                      setNewMapping({
                        ...newMapping,
                        platform3: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-xs md:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 text-left">Platform</th>
              <th className="px-2 py-2 text-left">Product ID</th>
              <th className="px-2 py-2 text-left">Product Name</th>
              <th className="px-2 py-2 text-left">Platform 1</th>
              <th className="px-2 py-2 text-left">Platform 2</th>
              <th className="px-2 py-2 text-left">Platform 3</th>
              <th className="px-2 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMappings.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-2 py-4 text-center text-gray-500">
                  No mappings found.
                </td>
              </tr>
            ) : (
              filteredMappings.map((m, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-2 py-2">{m.platform}</td>
                  <td className="px-2 py-2">{m.productId}</td>
                  <td className="px-2 py-2">{m.productName}</td>
                  <td className="px-2 py-2">{m.platform1}</td>
                  <td className="px-2 py-2">{m.platform2}</td>
                  <td className="px-2 py-2">{m.platform3}</td>
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
