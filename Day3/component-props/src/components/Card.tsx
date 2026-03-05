export default function Card({name, description, image}: {name: string, description: string, image: string}) {
  return (
    <div className="bg-white shadow-lg border-2 border-gray-400 rounded-xl p-4 w-64 hover:shadow-xl transition duration-300">
      <img
        src={image}
        alt={name}

        className="w-full h-40 object-cover rounded-md mb-3"
      />

      <h1 className="text-lg font-semibold text-gray-800 mb-1">{name}</h1>

      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
