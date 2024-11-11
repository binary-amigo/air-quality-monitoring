import DropdownButton from "./dropdown"; 
import { useState } from "react";

type NavbarProps = {
  onSidebarToggle: () => void;
  getData: () => void;
  loading: boolean;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({
  onSidebarToggle,
  getData,
  loading,
  selectedCity,
  setSelectedCity,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-50 shadow-lg flex items-center justify-between">
  {/* Left Section (Title) */}
  <h1 className="text-xl font-bold">Air Quality Index</h1>

  {/* Right Section */}
  <div className="flex items-center space-x-4">
    {/* Fetch Button */}
    <button
      onClick={getData}
      className={`bg-[#6d6d6d] px-8 py-2 rounded-xl hover:bg-[#4f4f4f] ${
        !isSelected ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={!isSelected}
    >
      {loading ? "Loading..." : "Click me"}
    </button>

    {/* Dropdown Button */}
    <DropdownButton isSelected={isSelected} setIsSelected={setIsSelected} selectedCity={selectedCity} setSelectedCity={setSelectedCity}/>
  </div>
</nav>

  );
};

export default Navbar;
