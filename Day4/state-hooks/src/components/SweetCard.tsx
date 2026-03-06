export default function SweetCard({ sweet }: { sweet: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {sweet.name}
      </h2>

      <p className="text-gray-600 text-sm mb-3">
        {sweet.description}
      </p>

      <p className="text-lg font-bold text-pink-600">
        ${sweet.price}
      </p>
    </div>
  );
}