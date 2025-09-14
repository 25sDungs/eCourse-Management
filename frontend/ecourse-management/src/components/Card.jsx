import React from "react";

const Card = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded p-4 w-64">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;