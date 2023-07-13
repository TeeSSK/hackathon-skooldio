import React, { useState } from "react";

const Card = ({ benefit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBenefit, setEditedBenefit] = useState(benefit);

  const handleSave = () => {
    setIsEditing(false);
    // Perform any necessary save/update actions with editedBenefit data
    console.log("Edited Benefit:", editedBenefit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    console.log(editedBenefit);
    setEditedBenefit((prevBenefit) => ({
      ...prevBenefit,
      [name]: value,
    }));
  };

  const handleEdited = () => {
    setIsEditing(true);
  };

  return (
    <div className="bg-white shadow-md rounded p-6 mb-4">
      {isEditing ? (
        <>
          <input
            type="text"
            id="topic"
            name="Topic"
            className="px-2 py-2 border rounded w-full"
            value={editedBenefit.Topic}
            onChange={handleChange}
          />
          <textarea
            name="Describe"
            value={editedBenefit.Describe}
            onChange={handleChange}
            className="mb-4 px-2 py-1 border rounded w-full h-32"
          ></textarea>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">{editedBenefit.Topic}</h2>
          <p className="text-gray-600 mb-4">{editedBenefit.Describe}</p>
          <button
            onClick={() => handleEdited(index)}
            className="text-blue-500 hover:text-blue-700 font-semibold focus:outline-none"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Card;
export { Card };
