import React from 'react';


const Card1 = ({ onClick, img, h1 }) => {
  return (
    <div
      onClick={onClick}
      className="w-[200px] h-[200px] ml-[70px] border rounded-lg shadow-lg overflow-hidden text-center cursor-pointer hover:bg-gray-100 transition duration-200"
    >
      <img className="w-[150px] h-[120px] m-auto" src={img} alt={h1} />
      <h1 className="text-gray-600 text-center text-xl mt-2">{h1}</h1>
    </div>
  );
};

export default Card1;



