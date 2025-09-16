import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Plus, Settings } from "lucide-react";

// --- Utility: Flatten nested JSON keys ---
const flattenJson = (obj, prefix = "") =>
  Object.keys(obj).flatMap((key) =>
    typeof obj[key] === "object" && obj[key] !== null
      ? flattenJson(obj[key], prefix + key + ".")
      : prefix + key
  );

export default function JsonMapper() {
  const [sourceJson, setSourceJson] = useState({});
  const [sourceFields, setSourceFields] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [savedMappings, setSavedMappings] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsIndex, setDetailsIndex] = useState(null);
  // Load saved mappings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("json_mapper_mappings");
    if (saved) setSavedMappings(JSON.parse(saved));
  }, []);

  // Save mappings to localStorage
  const saveCurrentMapping = () => {
    const newSaved = [
      ...savedMappings,
      { name: `Order Mapping #${savedMappings.length + 1}`, mappings },
    ];
    setSavedMappings(newSaved);
    localStorage.setItem("json_mapper_mappings", JSON.stringify(newSaved));
  };

  // Delete a saved mapping
  const deleteMapping = (idx) => {
    const newSaved = savedMappings.filter((_, i) => i !== idx);
    setSavedMappings(newSaved);
    localStorage.setItem("json_mapper_mappings", JSON.stringify(newSaved));
    // If deleting the one being viewed, close details
    if (showDetails && detailsIndex === idx) {
      setShowDetails(false);
      setDetailsIndex(null);
    }
  };

  // Show details for a saved mapping
  const openDetails = (idx) => {
    setDetailsIndex(idx);
    setShowDetails(true);
  };

  // Edit a saved mapping (load into editor)
  const editMapping = (idx) => {
    setMappings(savedMappings[idx].mappings);
    setShowDetails(false);
  };

  // Simulated API JSON
  useEffect(() => {
    const response = {
      id: 450789469,
      admin_graphql_api_id: "gid://shopify/Order/450789469",
      app_id: null,
      browser_ip: "0.0.0.0",
      buyer_accepts_marketing: false,
      cancel_reason: null,
      cancelled_at: null,
      cart_token: "68778783ad298f1c80c3bafcddeea02f",
      checkout_id: 901414060,
      checkout_token: "bd5a8aa1ecd019dd3520ff791ee3a24c",
      client_details: {
        accept_language: null,
        browser_height: null,
        browser_ip: "0.0.0.0",
        browser_width: null,
        session_hash: null,
        user_agent: null,
      },
      closed_at: null,
      confirmation_number: null,
      confirmed: true,
      contact_email: "bob.norman@mail.example.com",
      created_at: "2008-01-10T11:00:00-05:00",
      currency: "USD",
      current_subtotal_price: "195.67",
      current_subtotal_price_set: {
        shop_money: {
          amount: "195.67",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "195.67",
          currency_code: "USD",
        },
      },
      current_total_additional_fees_set: null,
      current_total_discounts: "3.33",
      current_total_discounts_set: {
        shop_money: {
          amount: "3.33",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "3.33",
          currency_code: "USD",
        },
      },
      current_total_duties_set: null,
      current_total_price: "199.00",
      current_total_price_set: {
        shop_money: {
          amount: "199.00",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "199.00",
          currency_code: "USD",
        },
      },
      current_total_tax: "0.00",
      current_total_tax_set: {
        shop_money: {
          amount: "0.00",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "0.00",
          currency_code: "USD",
        },
      },
      customer_locale: null,
      customer: {
        id: 207119551,
        email: "bob.norman@mail.example.com",
        created_at: "2024-01-10T11:00:00-05:00",
        updated_at: "2024-01-10T11:00:00-05:00",
        first_name: "Bob",
        last_name: "Norman",
        orders_count: 1,
        state: "disabled",
        tax_exempt: false,
        verified_email: true,
        multipass_identifier: null,
        tax_exemptions: [],
        phone: "+16136120707",
        tags: "",
        currency: "USD",
        addresses: [
          {
            id: 207119551,
            customer_id: 207119551,
            first_name: null,
            last_name: null,
            company: null,
            address1: "Chestnut Street 92",
            address2: "",
            city: "Louisville",
            province: "Kentucky",
            country: "United States",
            zip: "40202",
            phone: "555-625-1199",
            name: "",
            province_code: "KY",
            country_code: "US",
            country_name: "United States",
            default: true,
          },
        ],
        admin_graphql_api_id: "gid://shopify/Customer/207119551",
      },
      discount_applications: [
        {
          target_type: "line_item",
          type: "discount_code",
          value: "10.0",
          value_type: "fixed_amount",
          allocation_method: "across",
          target_selection: "all",
          code: "TENOFF",
        },
      ],
      discount_codes: [
        {
          code: "TENOFF",
          amount: "10.00",
          type: "fixed_amount",
        },
      ],
      email: "bob.norman@mail.example.com",
      financial_status: "authorized",
      fulfillment_status: null,
      landing_site: "http://www.example.com?source=abc",
      landing_site_ref: "abc",
      location_id: null,
      name: "#1001",
      note: null,
      note_attributes: [
        {
          name: "custom engraving",
          value: "Happy Birthday",
        },
      ],
      number: 1,
      order_number: 1001,
      order_status_url:
        "https://apple.myshopify.com/690933842/orders/b1946a1d37386cb1406526a9c1d31d00/authenticate?key=abcdef1234567890",
      original_total_additional_fees_set: null,
      original_total_duties_set: null,
      payment_gateway_names: ["bogus"],
      phone: "+16136120707",
      po_number: null,
      presentment_currency: "USD",
      processed_at: "2008-01-10T11:00:00-05:00",
      reference: "fdwabnwaonasd",
      referring_site: "http://www.otherexample.com",
      source_identifier: "fdwabnwaonasd",
      source_name: "web",
      source_url: null,
      subtotal_price: "195.67",
      subtotal_price_set: {
        shop_money: {
          amount: "195.67",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "195.67",
          currency_code: "USD",
        },
      },
      tags: "",
      tax_exempt: false,
      tax_lines: [],
      taxes_included: false,
      test: false,
      token: "b1946a1d37386cb1406526a9c1d31d00",
      total_discounts: "3.33",
      total_discounts_set: {
        shop_money: {
          amount: "3.33",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "3.33",
          currency_code: "USD",
        },
      },
      total_line_items_price: "199.00",
      total_line_items_price_set: {
        shop_money: {
          amount: "199.00",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "199.00",
          currency_code: "USD",
        },
      },
      total_outstanding: "199.00",
      total_price: "199.00",
      total_price_set: {
        shop_money: {
          amount: "199.00",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "199.00",
          currency_code: "USD",
        },
      },
      total_shipping_price_set: {
        shop_money: {
          amount: "3.33",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "3.33",
          currency_code: "USD",
        },
      },
      total_tax: "0.00",
      total_tax_set: {
        shop_money: {
          amount: "0.00",
          currency_code: "USD",
        },
        presentment_money: {
          amount: "0.00",
          currency_code: "USD",
        },
      },
      total_tip_received: "0.00",
      total_weight: 0,
      updated_at: "2008-01-10T11:00:00-05:00",
      user_id: null,
      billing_address: {
        first_name: "Bob",
        address1: "Chestnut Street 92",
        phone: "555-625-1199",
        city: "Louisville",
        zip: "40202",
        province: "Kentucky",
        country: "United States",
        last_name: "Norman",
        address2: "",
        company: null,
        latitude: 45.41634,
        longitude: -75.6868,
        name: "Bob Norman",
        country_code: "US",
        province_code: "KY",
      },
      fulfillments: [],
      line_items: [
        {
          id: 466157049,
          admin_graphql_api_id: "gid://shopify/LineItem/466157049",
          attributed_staffs: [],
          current_quantity: 1,
          fulfillable_quantity: 1,
          fulfillment_service: "manual",
          fulfillment_status: null,
          gift_card: false,
          grams: 200,
          name: "IPod Nano - 8gb - green",
          price: "199.00",
          price_set: {
            shop_money: {
              amount: "199.00",
              currency_code: "USD",
            },
            presentment_money: {
              amount: "199.00",
              currency_code: "USD",
            },
          },
          product_exists: true,
          product_id: 632910392,
          properties: [
            {
              name: "Custom Engraving Front",
              value: "Happy Birthday",
            },
          ],
          quantity: 1,
          requires_shipping: true,
          sku: "IPOD2008GREEN",
          taxable: true,
          title: "IPod Nano - 8gb",
          total_discount: "0.00",
          total_discount_set: {
            shop_money: {
              amount: "0.00",
              currency_code: "USD",
            },
            presentment_money: {
              amount: "0.00",
              currency_code: "USD",
            },
          },
          variant_id: 39072856,
          variant_inventory_management: "shopify",
          variant_title: "green",
          vendor: null,
          tax_lines: [
            {
              channel_liable: null,
              price: "3.98",
              price_set: {
                shop_money: {
                  amount: "3.98",
                  currency_code: "USD",
                },
                presentment_money: {
                  amount: "3.98",
                  currency_code: "USD",
                },
              },
              rate: 0.06,
              title: "State Tax",
            },
          ],
          duties: [],
          discount_allocations: [
            {
              amount: "3.33",
              amount_set: {
                shop_money: {
                  amount: "3.33",
                  currency_code: "USD",
                },
                presentment_money: {
                  amount: "3.33",
                  currency_code: "USD",
                },
              },
              discount_application_index: 0,
            },
          ],
        },
      ],
      payment_terms: null,
      refunds: [],
      shipping_address: {
        first_name: "Bob",
        address1: "Chestnut Street 92",
        phone: "555-625-1199",
        city: "Louisville",
        zip: "40202",
        province: "Kentucky",
        country: "United States",
        last_name: "Norman",
        address2: "",
        company: null,
        latitude: 45.41634,
        longitude: -75.6868,
        name: "Bob Norman",
        country_code: "US",
        province_code: "KY",
      },
      shipping_lines: [
        {
          id: 369256396,
          carrier_identifier: null,
          code: "Free Shipping",
          discounted_price: "0.00",
          discounted_price_set: {
            shop_money: {
              amount: "0.00",
              currency_code: "USD",
            },
            presentment_money: {
              amount: "0.00",
              currency_code: "USD",
            },
          },
          phone: null,
          price: "0.00",
          price_set: {
            shop_money: {
              amount: "0.00",
              currency_code: "USD",
            },
            presentment_money: {
              amount: "0.00",
              currency_code: "USD",
            },
          },
          requested_fulfillment_service_id: null,
          source: "shopify",
          title: "Free Shipping",
          tax_lines: [],
          discount_allocations: [],
        },
      ],
    };

    setSourceJson(response);
    setSourceFields(flattenJson(response));
  }, []);

  // Add a new mapping row
  const addMapping = () => {
    setMappings([...mappings, { source: "", destination: "" }]);
  };

  // Update mapping values
  const handleMappingChange = (index, field, value) => {
    const updated = [...mappings];
    updated[index][field] = value;
    setMappings(updated);
  };

  // Generate transformed JSON
  const generateJson = () => {
    const result = {};
    mappings.forEach((map) => {
      if (map.source && map.destination) {
        // fetch value from source JSON
        const keys = map.source.split(".");
        let val = sourceJson;
        for (let k of keys) {
          if (val) val = val[k];
        }
        result[map.destination] = val;
      }
    });
    return result;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">JSON Field Mapper</h2>

      {/* Saved Mappings List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Saved Mappings</h3>
        {savedMappings.length === 0 ? (
          <div className="text-gray-500">No saved mappings yet.</div>
        ) : (
          <ul className="space-y-2">
            {savedMappings.map((m, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-white rounded shadow p-2"
              >
                <span>{m.name}</span>
                <div className="space-x-2">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => openDetails(idx)}
                  >
                    Details
                  </button>
                  <button
                    className="text-green-600 underline"
                    onClick={() => editMapping(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 underline"
                    onClick={() => deleteMapping(idx)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && detailsIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowDetails(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold mb-4">Mapping Details</h3>
            <ul className="mb-4">
              {savedMappings[detailsIndex].mappings.map((map, i) => (
                <li key={i} className="mb-1">
                  <span className="font-semibold">{map.source}</span> →{" "}
                  <span>{map.destination}</span>
                </li>
              ))}
            </ul>
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => editMapping(detailsIndex)}
            >
              Edit This Mapping
            </button>
          </div>
        </div>
      )}

      {/* Mapping Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Source field (from API)</th>
            <th className="p-2 border">Destination field</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mappings.map((map, idx) => (
            <tr key={idx}>
              <td className="p-2 border">
                <select
                  className="border p-1 rounded w-full"
                  value={map.source}
                  onChange={(e) =>
                    handleMappingChange(idx, "source", e.target.value)
                  }
                >
                  <option value="">Select source</option>
                  {sourceFields.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2 border">
                <input
                  type="text"
                  placeholder="Enter destination field"
                  value={map.destination}
                  onChange={(e) =>
                    handleMappingChange(idx, "destination", e.target.value)
                  }
                  className="border p-1 rounded w-full"
                />
              </td>
              <td className="p-2 border text-center">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Mapping Button & Save Button */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={addMapping}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Plus className="w-5 h-5" /> Add Mapping
        </button>
        <button
          onClick={saveCurrentMapping}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Save Mapping
        </button>
      </div>

      {/* Preview Output */}
      <h3 className="text-xl font-semibold mt-6">Generated JSON</h3>
      <pre className="mt-2 bg-black text-white p-4 rounded">
        {JSON.stringify(generateJson(), null, 2)}
      </pre>
    </div>
  );
}
