import { useState } from "react";

const JobAddForm = ({ onSubmit }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [relevantSkills, setRelevantSkills] = useState("");
  const [benefits, setBenefits] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // const newJob = {
    //   JobTitle: jobTitle,
    //   // RelevantSkills: relevantSkills,
    //   // Benefits: benefits,
    // };

    onSubmit(jobTitle);

    // Reset form fields
    setJobTitle("");
    // setRelevantSkills("");
    // setBenefits("");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded px-8 py-6">
      <div className="flex flex-col mb-4">
        <label htmlFor="jobTitle" className="mb-2 font-semibold">
          Job Title:
        </label>
        <input
          id="jobTitle"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="px-2 py-2 border rounded"
        />
      </div>
      {/* <div>
        <label htmlFor="relevantSkills" className="mb-2 font-semibold">Relevant Skills:</label>
        <input
          id="relevantSkills"
          type="text"
          value={relevantSkills}
          onChange={(e) => setRelevantSkills(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="benefits" >Benefits:</label>
        <input
          id="benefits"
          type="text"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
        />
      </div> */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Job
      </button>
    </form>
  );
};

export default JobAddForm;
export { JobAddForm };
