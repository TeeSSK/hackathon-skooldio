import React, { useState } from "react";

const JobCard = ({ benefit }) => {
  const [editedBenefit, setEditedBenefit] = useState(benefit);

  return (
    <div className="bg-white shadow-md rounded p-6 mb-4">
      <>
        <h2 className="text-xl font-semibold mb-2">{editedBenefit.JobTitle}</h2>
        <p className="text-gray-600 font-semibold mb-4">
          Relevant Skills: {editedBenefit.RelevantSkills}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Benefits: </span>{" "}
          {editedBenefit.Benefits}
        </p>
      </>
    </div>
  );
};

export default JobCard;
export { JobCard };
