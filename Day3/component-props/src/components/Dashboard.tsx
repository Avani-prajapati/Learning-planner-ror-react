import Card from "./Card";

export default function Dashboard() {
  const places = [
    {
      name: "Paris",
      description: "The city of love and lights.",
      image: "https://picsum.photos/200/300?paris",
    },
    {
      name: "Tokyo",
      description: "A bustling metropolis blending tradition and modernity.",
      image: "https://picsum.photos/200/300?tokyo",
    },
    {
      name: "New York",
      description: "The city that never sleeps.",
      image: "https://picsum.photos/200/300?newyork",
    },
    {
      name: "New York",
      description: "The city that never sleeps.",
      image: "https://picsum.photos/200/300?newyork",
    },
    {
      name: "New York",
      description: "The city that never sleeps.",
      image: "https://picsum.photos/200/300?newyork",
    },
    {
      name: "New York",
      description: "The city that never sleeps.",
      image: "https://picsum.photos/200/300?newyork",
    },
    {
      name: "New York",
      description: "The city that never sleeps.",
      image: "https://picsum.photos/200/300?newyork",
    },
    {
      name: "New York",
      description: "The city that never sleeps.",
      image: "https://picsum.photos/200/300?newyork",
    },
  ];
  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-5 gap-1 ">
        {places.map((place, index) => (
          <Card
            key={index}
            name={place.name}
            description={place.description}
            image={place.image}
          />
        ))}
      </div>
    </div>
  );
}
