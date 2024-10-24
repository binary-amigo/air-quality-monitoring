import React, { useEffect, useState } from 'react';

interface SpeedometerProps {
  value: number;
}

const Speedometer: React.FC<SpeedometerProps> = ({ value }) => {
  const [rotation, setRotation] = useState<number>(-90); // Start at -90 degrees (0 position)

  useEffect(() => {
    const maxSpeed = 180;
    const finalRotation = (value / maxSpeed) * 180 - 90; // -90 to 90 degrees range
    setRotation(finalRotation);
  }, [value]);

  return (
    <div className="relative w-64 h-64">
      {/* Speedometer background */}
      <div className="absolute inset-0 flex justify-center items-center">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 10 40 A 40 40 0 0 1 90 40"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          {/* Speed markers */}
          {[...Array(19)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="5"
              x2="50"
              y2="10"
              transform={`rotate(${i * 10 - 90}, 50, 50)`}
              stroke="black"
            />
          ))}
        </svg>
      </div>

      {/* Triangle Arrow */}
      <div
        className="absolute inset-0 flex justify-center items-center transition-transform ease-out"
        style={{ 
          transform: `rotate(${rotation}deg)`, 
          transitionDuration: '3s',
          transformOrigin: 'bottom center' // Rotates around the bottom of the triangle
        }}
      >
        {/* Using CSS to create a small triangle */}
        <div 
          className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-red-500"
        ></div>
      </div>

      {/* Speed text */}
      <div className="absolute inset-x-0 bottom-0 text-center">
        <span className="text-2xl font-bold">{value} km/h</span>
      </div>
    </div>
  );
};

export default Speedometer;
