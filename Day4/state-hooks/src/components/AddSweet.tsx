import { useState } from "react";

export default function AddSweet({
  setSweets,
  setIsFormOpen,
}: {
  setSweets: any;
  setIsFormOpen: any;
}) {
  const [newSweet, setNewSweet] = useState({
    name: "",
    price: 0,
    description: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if(!newSweet.name || !newSweet.price || !newSweet.description) {
      alert("Please fill all fields");
      return;
    }

    if(newSweet.price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    setSweets((prev: any) => [...prev, { ...newSweet, id: Date.now() }]);
    setNewSweet({
      name: "",
      price: 0,
      description: "",
    });
    setIsFormOpen(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    
    setNewSweet({
      ...newSweet,
      [name]: value,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg shadow-sm p-6 max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add New Sweet</h2>
      <label className="block text-sm font-medium text-gray-700">
        Name:
        <input
          type="text"
          name="name"
          placeholder="Sweet Name"
          value={newSweet.name}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </label>

      <label className="block text-sm font-medium text-gray-700">
        Price:
        <input
          type="number"
            name="price"
          placeholder="Price"
          value={newSweet.price}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </label>

      <label className="block text-sm font-medium text-gray-700">
        Description:
        <input
          type="text"
            name="description"
          placeholder="Description"
          value={newSweet.description}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-pink-500 hover:cursor-pointer hover:bg-pink-600 text-white px-4 py-2 rounded-md font-medium transition"
        >
          Add Sweet
        </button>

        <button
          type="button"
          onClick={() => setIsFormOpen(false)}
          className="border px-4 hover:cursor-pointer py-2 rounded-md hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
