import { useState } from "react";

export default function AddSweet({ setSweets, setIsFormOpen }: { setSweets: any; setIsFormOpen: any }) {
  const [newSweet, setNewSweet] = useState({
    name: "",
    price: 0,
    description: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSweets((prev: any) => [...prev, { ...newSweet, id: Date.now() }]);
    setNewSweet({
      name: "",
      price: 0,
      description: "",
    });
    setIsFormOpen(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg shadow-sm p-6 max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add New Sweet</h2>
      <label className="block text-sm font-medium text-gray-700">Name: 

      <input
        type="text"
        placeholder="Sweet Name"
        value={newSweet.name}
        onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </label>


      <label className="block text-sm font-medium text-gray-700">Price:
      <input
        type="number"
        placeholder="Price"
        value={newSweet.price}
        onChange={(e) =>
          setNewSweet({ ...newSweet, price: parseFloat(e.target.value) || 0 })
        }
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      </label>

      <label className="block text-sm font-medium text-gray-700">Description:
      <input
        type="text"
        placeholder="Description"
        value={newSweet.description}
        onChange={(e) =>
          setNewSweet({ ...newSweet, description: e.target.value })
        }
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