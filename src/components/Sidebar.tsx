import { useState } from "react";

type SidebarProps = {
  isOpen: boolean;
  data: { date: string; _id: string; city: string }[];
  onItemClick: (item: { title: string; url: string }) => void;
};

const AppSidebar: React.FC<SidebarProps> = ({ isOpen, data, onItemClick }) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Toggle the History section
  const toggleHistory = () => setIsHistoryOpen((prev) => !prev);

  return (
    <div
      className={`fixed left-0 top-[64px] h-[calc(100vh-64px)] bg-gray-900 text-white w-64 p-4 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <ul>
        {/* Recent Section */}
        <li className="mb-4 cursor-pointer hover:text-gray-300" onClick={() => window.location.reload()}>Recent</li>

        {/* History Section */}
        <li>
          <div
            className="mb-4 cursor-pointer hover:text-gray-300 flex justify-between items-center"
            onClick={toggleHistory}
          >
            <span>History</span>
            <span>{isHistoryOpen ? "-" : "+"}</span>
          </div>

          {/* Expandable Sub-menu */}
          {isHistoryOpen && (
            <ul className="pl-4">
              {data.slice(0, 10).map((item) => {
                const dateObj = new Date(item.date);
                const formattedTitle = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()} ${item?.city}`;
                

                return (
                  <li key={item._id} className="mb-2 cursor-pointer hover:text-gray-300">
                    <a
                      className="text-sm"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onItemClick({ title: formattedTitle, url: item._id });
                      }}
                    >
                      {formattedTitle}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default AppSidebar;
