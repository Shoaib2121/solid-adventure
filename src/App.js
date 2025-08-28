import React, { useState, useEffect } from "react";
import { ClipboardList, Map, Package, Settings } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 font-bold text-xl">Xpert.io</div>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("mapping")}
            className={`flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 rounded-lg ${
              activeTab === "mapping" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <Map className="w-5 h-5 mr-3" /> Item Mapping
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 rounded-lg ${
              activeTab === "orders" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <ClipboardList className="w-5 h-5 mr-3" /> Orders Dashboard
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 rounded-lg ${
              activeTab === "inventory" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <Package className="w-5 h-5 mr-3" /> Inventory Sync
          </button>
          <button className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5 mr-3" /> Settings
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "mapping" && <FieldMapping />}
        {activeTab === "orders" && <OrdersDashboard />}
        {activeTab === "inventory" && <InventorySync />}
      </main>
    </div>
  );
}

// ---------------- TAB COMPONENTS ----------------

// 🔹 Field Mapping (API Driven)
function FieldMapping() {
  const [sku, setSku] = useState("");
  const [item, setItem] = useState("");
  const [mappings, setMappings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mappings") // your own backend API or mock
      .then((res) => res.json())
      .then((data) => {
        setMappings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    if (!sku || !item) return;
    const newMapping = { sku, item };

    await fetch("/api/mappings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMapping),
    });

    setMappings([...mappings, newMapping]);
    setSku("");
    setItem("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Item Mapping</h2>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="Shopify SKU"
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="NetSuite Item"
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          ➕ Save Mapping
        </button>
      </div>

      <h3 className="font-semibold mb-2">Existing Mappings</h3>
      {loading ? (
        <p>Loading mappings...</p>
      ) : (
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Shopify SKU</th>
              <th className="px-4 py-2 text-left">NetSuite Item</th>
            </tr>
          </thead>
          <tbody>
            {mappings.map((map, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{map.sku}</td>
                <td className="px-4 py-2">{map.item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// 🔹 Orders Dashboard (API Driven)
function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/c/5ef3-33fb-4b47-b95a")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders Dashboard</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Tran ID</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.salesOrderId} className="border-t">
                <td className="px-4 py-2">{o.salesOrder.id}</td>
                <td className="px-4 py-2">{o.salesOrder.tranid}</td>
                <td className="px-4 py-2">{o.salesOrder.date}</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                    {o.salesOrder.status}
                  </span>
                </td>
                <td className="px-4 py-2">{o.salesOrder.customer}</td>
                <td className="px-4 py-2">${o.salesOrder.total}</td>
                <td className="px-4 py-2">
                  <a
                    href={o.salesOrder.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// 🔹 Inventory Sync (API Driven)
function InventorySync() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/c/cb43-1385-4463-9f1d")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setItems(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching inventory:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory Sync</h2>
      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Item</th>
              <th className="px-4 py-2 text-left">Qty Available</th>
              <th className="px-4 py-2 text-left">Qty On Hand</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="px-4 py-2">{i.name}</td>
                <td className="px-4 py-2">{i.qtyAvailable}</td>
                <td className="px-4 py-2">{i.qtyOnHand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
