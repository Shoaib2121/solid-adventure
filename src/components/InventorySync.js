import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function InventorySync() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(
          "/netsuite-api/app/site/hosting/scriptlet.nl?script=99&deploy=1&compid=TD3032620&ns-at=AAEJ7tMQZ7cccAU6W7MOeCTu5No9Jszw0CV_6cNhzByn8MXjXaU"
        );
        const data = await response.json();

        if (data.success) {
          setItems(data.data);
        } else {
          throw new Error("Failed to fetch inventory data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-2xl font-bold mb-4">Inventory Sync</h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-gray-600">Loading inventory...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-xs md:text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-2 text-left whitespace-nowrap">Item</th>
                <th className="px-2 py-2 text-left whitespace-nowrap">
                  Qty Available
                </th>
                <th className="px-2 py-2 text-left whitespace-nowrap">
                  Qty On Hand
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td
                    className="px-2 py-4 text-center text-gray-500"
                    colSpan="3"
                  >
                    No items found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, idx) => (
                  <tr key={item.id || idx} className="border-t">
                    <td className="px-2 py-2 break-words max-w-xs">
                      {item.name}
                    </td>
                    <td className="px-2 py-2">{item.qtyAvailable}</td>
                    <td className="px-2 py-2">{item.qtyOnHand}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
