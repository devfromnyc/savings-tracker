import React from "react";

type Item = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: Date;
};

type RecentItemsProps = {
  items: Item[];
  categories: string[];
  form: { name: string; category: string; amount: string };
  editId: number | null;
  setForm: React.Dispatch<
    React.SetStateAction<{ name: string; category: string; amount: string }>
  >;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  handleCreate: (e: React.FormEvent) => void;
  handleUpdate: (e: React.FormEvent) => void;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
};

const RecentItems: React.FC<RecentItemsProps> = ({
  items,
  categories,
  form,
  editId,
  setForm,
  setEditId,
  handleCreate,
  handleUpdate,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Recent Savings</h2>
      <form
        onSubmit={editId === null ? handleCreate : handleUpdate}
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
        <input
          type="text"
          placeholder="Item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            minWidth: 120,
          }}
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          style={{
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            minWidth: 80,
          }}
          min={0}
          required
        />
        <button
          type="submit"
          style={{
            padding: 8,
            borderRadius: 6,
            background: editId === null ? "#22c55e" : "#f59e42",
            color: "white",
            border: "none",
            fontWeight: 600,
          }}>
          {editId === null ? "Add" : "Update"}
        </button>
        {editId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ name: "", category: categories[0], amount: "" });
            }}
            style={{
              padding: 8,
              borderRadius: 6,
              background: "#e11d48",
              color: "white",
              border: "none",
              fontWeight: 600,
            }}>
            Cancel
          </button>
        )}
      </form>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{item.name}</div>
              <div style={{ color: "#64748b", fontSize: 14 }}>
                {item.category} &bull; Saved ${item.amount}
              </div>
              <div style={{ color: "#a1a1aa", fontSize: 12 }}>
                {item.date.toLocaleDateString()}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => handleEdit(item.id)}
                style={{
                  background: "#f59e42",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}>
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  background: "#e11d48",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentItems;
