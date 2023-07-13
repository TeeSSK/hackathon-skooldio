import React, { useState } from "react";

const AddForm = ({ handleAdd }) => {
  const [topic, setTopic] = useState("");
  const [describe, setDescribe] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { Topic: topic, Describe: describe };
    handleAdd(newItem);
    setTopic("");
    setDescribe("");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded px-8 py-6">
      <div className="flex flex-col mb-4">
        <label htmlFor="topic" className="mb-2 font-semibold">
          Topic:
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="px-2 py-2 border rounded"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="describe" className="mb-2 font-semibold">
          Description:
        </label>
        <textarea
          id="describe"
          value={describe}
          onChange={(e) => setDescribe(e.target.value)}
          className="px-2 py-1 border rounded h-32"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add
      </button>
    </form>
  );
};

export default AddForm;
export { AddForm };
