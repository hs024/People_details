import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../features/users/usersSlice";

export default function UserForm({ onClose, user }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    city: "",
    street: "",
    zip: "",
    company: "",
    catchPhrase: "",
    business: "",
    website: "",
  });

  // 🔹 PREFILL ON EDIT
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        website: user.website || "",
        city: user.address?.city || "",
        street: user.address?.street || "",
        zip: user.address?.zipcode || "",
        company: user.company?.name || "",
        catchPhrase: user.company?.catchPhrase || "",
        business: user.company?.bs || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    const payload = {
      id: user ? user.id : Date.now(),
      name: form.name,
      username: form.username,
      email: form.email,
      phone: form.phone,
      website: form.website,
      address: {
        city: form.city,
        street: form.street,
        zipcode: form.zip,
      },
      company: {
        name: form.company,
        catchPhrase: form.catchPhrase,
        bs: form.business,
      },
    };

    user ? dispatch(updateUser(payload)) : dispatch(addUser(payload));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {user ? "Update User" : "Add User"}
          </h2>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name *"
            className="input border p-1"
          />
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="input border p-1"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email *"
            className="input border p-1"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="input border p-1"
          />
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website"
            className="input md:col-span-2 border p-1"
          />

          <h3 className="md:col-span-2 font-semibold">Address</h3>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="input border p-1"
          />
          <input
            name="street"
            value={form.street}
            onChange={handleChange}
            placeholder="Street"
            className="input border p-1"
          />
          <input
            name="zip"
            value={form.zip}
            onChange={handleChange}
            placeholder="Zip"
            className="input border p-1"
          />

          <h3 className="md:col-span-2 font-semibold">Company</h3>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="input border p-1"
          />
          <input
            name="catchPhrase"
            value={form.catchPhrase}
            onChange={handleChange}
            placeholder="Catch Phrase"
            className="input md:col-span-2 border p-1"
          />
          <input
            name="business"
            value={form.business}
            onChange={handleChange}
            placeholder="Business"
            className="input md:col-span-2 border p-1"
          />

          <div className="md:col-span-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              {user ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
