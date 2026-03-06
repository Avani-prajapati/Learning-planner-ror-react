import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SweetList from "./components/SweetList";
import AddSweet from "./components/AddSweet";
import sweetsData from "./constant/sweet.json";

function SweetShop() {
  const [sweets, setSweets] = useState(sweetsData);

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <Header setFormOpen={setIsFormOpen} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        
        {isFormOpen && (
          <div className="mb-6">
            <AddSweet setSweets={setSweets} setIsFormOpen={setIsFormOpen} />
          </div>
        )}

        <SweetList sweets={sweets} />

      </main>

      <Footer />

    </div>
  );
}

export default SweetShop;