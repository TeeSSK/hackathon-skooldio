import React from "react";

const ValidateCard = ({ job }) => {
  const { Job, isRecommended, reason } = job;

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-xl font-bold">{Job}</h2>
      <p className="text-sm mb-4">
        <span className="font-semibold">Reason: </span>
        {reason}
      </p>
      {isRecommended ? (
        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Recommended
        </span>
      ) : (
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Not Recommended
        </span>
      )}
    </div>
  );
};

export default ValidateCard;
export { ValidateCard };
