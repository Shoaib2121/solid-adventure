import React, { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  Search,
  CheckCircle,
  Package,
  Clock,
  XCircle,
} from "lucide-react";
import SummaryCard from "./SummaryCard";

export default function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch API data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://td3032620.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=97&deploy=1&compid=TD3032620&ns-at=AAEJ7tMQFHrjyiJxScATuDJpqEsspSQ73OKWi096Lf3rp2P4jNU"
        );
        const json = await res.json();

        if (json.success && json.data) {
          const mappedOrders = json.data.map((item) => {
            let status = item.salesOrder.status;

            // Status mapping
            if (status === "Closed") status = "Completed";
            if (status === "Pending Billing" || status === "Billed")
              status = "Fulfilled Order";

            return {
              id: item.salesOrder.id,
              transId: item.salesOrder.tranid,
              date: item.salesOrder.date,
              status: status,
              amount: `PKR - ${item.salesOrder.total}`,
              link: item.salesOrder.link,
            };
          });

          setOrders(mappedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Filter by search
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(search) ||
      order.transId.toString().includes(search) ||
      order.status.toLowerCase().includes(search.toLowerCase())
  );

  // Count summary
  const summary = {
    Completed: orders.filter((o) => o.status === "Completed").length,
    FulfilledOrder: orders.filter((o) => o.status === "Fulfilled Order").length,
    PendingFulfillment: orders.filter((o) => o.status === "Pending Fulfillment")
      .length,
    Processing: orders.filter((o) => o.status === "Processing").length,
  };

  const statusColor = {
    Completed: "bg-green-100 text-green-600",
    "Fulfilled Order": "bg-orange-100 text-orange-600",
    "Pending Fulfillment": "bg-blue-100 text-blue-600",
    Processing: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-2xl font-bold mb-4">Order Dashboard</h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Completed Orders"
          value={summary.Completed}
          change="+12%"
          color="green"
          icon={<CheckCircle className="text-green-500 w-8 h-8" />}
        />
        <SummaryCard
          title="Fulfilled Orders"
          value={summary.FulfilledOrder}
          change="+8%"
          color="orange"
          icon={<Package className="text-orange-500 w-8 h-8" />}
        />
        <SummaryCard
          title="Pending Fulfillments"
          value={summary.PendingFulfillment}
          change="+15%"
          color="blue"
          icon={<Clock className="text-blue-500 w-8 h-8" />}
        />
        <SummaryCard
          title="Cancel Orders"
          value={summary.Processing}
          change="-3%"
          color="gray"
          icon={<XCircle className="text-gray-500 w-8 h-8" />}
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-xs md:text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-2 py-2 whitespace-nowrap">Order ID</th>
              <th className="px-2 py-2 whitespace-nowrap">Trans ID</th>
              <th className="px-2 py-2 whitespace-nowrap">Date</th>
              <th className="px-2 py-2 whitespace-nowrap">Status</th>
              <th className="px-2 py-2 whitespace-nowrap">Amount</th>
              <th className="px-2 py-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, i) => (
              <tr key={i} className="border-t">
                <td className="px-2 py-2">{order.id}</td>
                <td className="px-2 py-2">{order.transId}</td>
                <td className="px-2 py-2">{order.date}</td>
                <td className="px-2 py-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      statusColor[order.status] || "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-2 py-2">{order.amount}</td>
                <td className="px-2 py-2 flex space-x-2">
                  <a
                    href={
                      order.link && !order.link.startsWith("http")
                        ? `https://td3032620.extforms.netsuite.com${order.link}`
                        : order.link
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    <Edit className="w-4 h-4" />
                  </a>
                  <button className="text-red-600 hover:underline">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
