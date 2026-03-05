export default function Card() {
  return (
    <div className="bg-white shadow-lg border-2 border-gray-400 rounded-xl p-4 w-64 hover:shadow-xl transition duration-300">
      <img
        src="https://picsum.photos/200/300"
        alt="Card Image"
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      <h1 className="text-lg font-semibold text-gray-800 mb-1">Card Title</h1>

      <p className="text-gray-600 text-sm">This is a card component.</p>
    </div>
  );
}
