import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useMemo } from "react";
import RecentItems from "./RecentItems";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartColors = [
  "rgba(220, 38, 38, 0.7)",
  "rgba(34, 197, 94, 0.7)",
  "rgba(59, 130, 246, 0.7)",
  "rgba(234, 179, 8, 0.7)",
  "rgba(168, 85, 247, 0.7)",
];
const chartBorderColors = [
  "rgba(220, 38, 38, 1)",
  "rgba(34, 197, 94, 1)",
  "rgba(59, 130, 246, 1)",
  "rgba(234, 179, 8, 1)",
  "rgba(168, 85, 247, 1)",
];

const useCategoryTotals = (items: Item[], categories: string[]) => {
  return useMemo(() => {
    return categories.map((cat) =>
      items
        .filter((item) => item.category === cat)
        .reduce((sum, item) => sum + item.amount, 0)
    );
  }, [items, categories]);
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        boxWidth: 20,
        padding: 20,
      },
    },
    title: {
      display: true,
      text: "Your Savings by Category",
      font: { size: 22 },
      padding: { top: 10, bottom: 30 },
    },
  },
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 1500,
    easing: "easeOutBounce" as const,
  },
};

// Placeholder for recent items (reduced to 5)
const initialItems = [
  {
    id: 1,
    name: "Skipped TV Purchase",
    category: "Entertainment",
    amount: 400,
    date: new Date("2024-06-01"),
  },
  {
    id: 2,
    name: "Ate at Home",
    category: "Dining Out",
    amount: 30,
    date: new Date("2024-06-02"),
  },
  {
    id: 3,
    name: "No New Shoes",
    category: "Clothing",
    amount: 60,
    date: new Date("2024-06-03"),
  },
  {
    id: 4,
    name: "Biked Instead of Uber",
    category: "Travel",
    amount: 15,
    date: new Date("2024-06-04"),
  },
  {
    id: 5,
    name: "Used Old Laptop",
    category: "Electronics",
    amount: 800,
    date: new Date("2024-06-05"),
  },
];

const categories = [
  "Entertainment",
  "Dining Out",
  "Electronics",
  "Clothing",
  "Travel",
];

// Add Item type for local use
type Item = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: Date;
};

const AccountHome: React.FC = () => {
  const { user } = useAuth();
  const storageKey = user ? `recentSavingsItems_${user.name}` : undefined;
  const [items, setItems] = useState<Item[]>(() => {
    if (!storageKey) return initialItems;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed: any[] = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsed.map(
          (item: any): Item => ({ ...item, date: new Date(item.date) })
        );
      } catch {
        return initialItems;
      }
    }
    return initialItems;
  });
  const [form, setForm] = useState({
    name: "",
    category: categories[0],
    amount: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const categoryTotals = useCategoryTotals(items, categories);
  const chartData = useMemo(
    () => ({
      labels: categories,
      datasets: [
        {
          data: categoryTotals,
          backgroundColor: chartColors,
          borderColor: chartBorderColors,
          borderWidth: 2,
          cutout: "70%",
        },
      ],
    }),
    [categoryTotals, categories]
  );

  // Sync items to localStorage whenever they change
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, storageKey]);

  // Add new item
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.amount) return;
    const newItem = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      amount: Number(form.amount),
      date: new Date(),
    };
    setItems([newItem, ...items].slice(0, 10));
    setForm({ name: "", category: categories[0], amount: "" });
  };

  // Start editing
  const handleEdit = (id: number) => {
    const item = items.find((i: Item) => i.id === id);
    if (item) {
      setEditId(id);
      setForm({
        name: item.name,
        category: item.category,
        amount: String(item.amount),
      });
    }
  };

  // Update item
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId === null) return;
    setItems(
      items.map((item: Item) =>
        item.id === editId
          ? {
              ...item,
              name: form.name,
              category: form.category,
              amount: Number(form.amount),
            }
          : item
      )
    );
    setEditId(null);
    setForm({ name: "", category: categories[0], amount: "" });
  };

  // Delete item
  const handleDelete = (id: number) => {
    setItems(items.filter((item: Item) => item.id !== id));
  };

  return (
    <div className="account-home">
      <div className="welcome-message">
        <h1>Welcome to your Savings Tracker</h1>
        <p className="user-status">User "{user?.name}" is logged in</p>
      </div>
      <div style={{ maxWidth: 420, margin: "2rem auto", width: "100%" }}>
        <Pie data={chartData} options={pieOptions} />
      </div>
      <RecentItems
        items={items}
        categories={categories}
        form={form}
        editId={editId}
        setForm={setForm}
        setEditId={setEditId}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AccountHome;
