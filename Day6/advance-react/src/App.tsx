import { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileCard";
import Demo from "./components/Demo";

type Developer = {
  name: string;
  role: string;
  skills: string[];
};

function App() {
  const [developers, setDevelopers] = useState<Developer[]>([
    {
      name: "Avani Prajapati",
      role: "Frontend Developer",
      skills: ["React", "TypeScript", "Chakra UI"]
    },
    {
      name: "John Doe",
      role: "Backend Developer",
      skills: ["Node", "Express", "MongoDB"]
    }
  ]);

  const addDeveloper = (dev: Developer) => {
    setDevelopers((prev) => [...prev, dev]);
  };

  return (
    <Box>
    
      <Navbar addDeveloper={addDeveloper} />
      {/* <Box p={8}>
        <SimpleGrid columns={3} gap={6}>
          {developers.map((dev, index) => (
           <Demo/>
          ))}
        </SimpleGrid>
      </Box> */}
     
      <Box p={8}>
        <SimpleGrid columns={3} gap={6}>
          {developers.map((dev, index) => (
            <ProfileCard
              key={index}
              name={dev.name}
              role={dev.role}
              skills={dev.skills}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default App;