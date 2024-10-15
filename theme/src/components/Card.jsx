import React, { useState } from "react";
import {
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import ContentAdder from "./ContentAdder";

const Card = () => {
  const [card, setCard] = useState([
    {
      id: 1,
      data: `Dil ki 💓 dhadkan mein tum, saanson 🌬️ mein ho base, ❤️ Ishq 💕 ki
          gehraiyon mein, tum hi 🌹 ho mere apne. ✨`,
    },
  ]);
  return (
    <div>
      <div className="sm:mb-8 sm:flex sm:justify-center my-5 sm:my-5 lg:my-10 flex justify-center align-middle flex-col">
        <div className="relative rounded-full px-6 py-3 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20 text-center">
          {card.map((data) => data.data)}
        </div>
        <div className="flex ml-6 bottom-3 relative gap-3 text-gray-700">
          <PencilSquareIcon className="h-5 cursor-pointer" />
          <TrashIcon className="h-5 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Card;
