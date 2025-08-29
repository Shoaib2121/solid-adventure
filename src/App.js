import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Map,
  Package,
  Settings,
  Bell,
  Search,
  User,
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 For search

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 font-bold text-xl text-blue-600">⚡ Xpert.io</div>
        <nav className="space-y-2 flex-1">
          <SidebarButton
            icon={<Map className="w-5 h-5 mr-3" />}
            label="Item Mapping"
            active={activeTab === "mapping"}
            onClick={() => setActiveTab("mapping")}
          />
          <SidebarButton
            icon={<ClipboardList className="w-5 h-5 mr-3" />}
            label="Orders Dashboard"
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
          />
          <SidebarButton
            icon={<Package className="w-5 h-5 mr-3" />}
            label="Inventory Sync"
            active={activeTab === "inventory"}
            onClick={() => setActiveTab("inventory")}
          />
          <SidebarButton
            icon={<Settings className="w-5 h-5 mr-3" />}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </nav>
        <div className="p-4 border-t text-sm text-gray-500">
          © 2025 Xpert.io
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow flex items-center justify-between px-6 py-3">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setActiveTab("orders"); // jump to orders tab
                }
              }}
              className="bg-transparent focus:outline-none w-full text-sm"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "mapping" && <FieldMapping />}
          {activeTab === "orders" && (
            <OrdersDashboard searchTerm={searchTerm} />
          )}
          {activeTab === "inventory" && <InventorySync />}
          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold">⚙️ Settings</h2>
              <p className="text-gray-600 mt-2">
                Manage your app preferences here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ---------------- Sidebar Button ----------------
function SidebarButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 w-full text-left rounded-lg transition ${
        active
          ? "bg-blue-50 text-blue-600 font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ---------------- TAB COMPONENTS ----------------

// 🔹 Field Mapping
function FieldMapping() {
  const [sku, setSku] = useState("");
  const [item, setItem] = useState("");
  const [mappings, setMappings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mappings")
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ➕ Save Mapping
        </button>
      </div>

      <h3 className="font-semibold mb-2">Existing Mappings</h3>
      {loading ? (
        <p>Loading mappings...</p>
      ) : (
        <table className="min-w-full bg-white border rounded-lg shadow text-sm">
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

// 🔹 Orders Dashboard (with search filter)
function OrdersDashboard({ searchTerm }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://td3032620.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=97&deploy=1&compid=TD3032620&ns-at=AAEJ7tMQFHrjyiJxScATuDJpqEsspSQ73OKWi096Lf3rp2P4jNU"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔹 Filter orders by Order ID
  const filteredOrders = orders.filter((o) =>
    searchTerm ? String(o.salesOrder.id).includes(searchTerm) : true
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders Dashboard</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found for ID "{searchTerm}"</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Tran ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.salesOrderId} className="border-t">
                  <td className="px-4 py-2">{o.salesOrder.id}</td>
                  <td className="px-4 py-2">{o.salesOrder.tranid}</td>
                  <td className="px-4 py-2">{o.salesOrder.date}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      {o.salesOrder.status}
                    </span>
                  </td>

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
        </div>
      )}
    </div>
  );
}

// 🔹 Inventory Sync
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
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory Sync</h2>
      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full text-sm">
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
        </div>
      )}
    </div>
  );
}
