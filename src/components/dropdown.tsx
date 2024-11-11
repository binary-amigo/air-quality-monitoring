import { useState } from "react";

type DropdownButtonProps = {
    isSelected: boolean
    setIsSelected: (isSelected: boolean) => void
    selectedCity: string
    setSelectedCity: (city: string) => void
}

const DropdownButton: React.FC<DropdownButtonProps> = ({isSelected, setIsSelected, selectedCity, setSelectedCity}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedCity, setSelectedCity] = useState("Select City");

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setIsOpen(false);
    setIsSelected(true); // Update isSelected state to true
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className={`bg-gray-800 text-white px-4 py-2 w-40 text-left rounded-lg hover:bg-gray-700 focus:outline-none ${
          isSelected ? "border-green-500" : ""
        }`}
      >
        {selectedCity}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-400 rounded-lg shadow-lg z-50">
          <ul className="py-2">
            {["Bhopal", "Indore", "Mumbai"].map((city) => (
              <li
                key={city}
                className="px-4 py-2 cursor-pointer hover:bg-gray-300"
                onClick={() => handleSelectCity(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Displaying if a city is selected */}
      {/* {isSelected && (
        <p className="mt-4 text-green-500">City selected: {selectedCity}</p>
      )} */}
    </div>
  );
};

export default DropdownButton;
