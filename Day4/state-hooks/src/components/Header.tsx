export default function Header({ setFormOpen }: { setFormOpen: (isOpen: boolean) => void }) {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      
      <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
        Sweet Shop
      </h1>

      <button
        onClick={() => setFormOpen(true)}
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold hover:cursor-pointer px-5 py-2 rounded-lg  shadow-sm"
      >
        + Add Sweet
      </button>

    </header>
  );
}
