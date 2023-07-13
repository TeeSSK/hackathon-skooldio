/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "@/util/store";
import axios from "axios";
import {
  Card,
  AddForm,
  JobCard,
  JobAddForm,
  ValidateCard,
} from "../../components";

const initialPersona = {
  name: "John",
  age: 25,
  pain: "Back pain",
  currentWork: "Software Engineer",
};

const target = () => {
  const [detail, setDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [persona, setPersona] = useState(null);
  const [test, setTest] = useState([]);
  const { topic, globalVariable } = useContext(StoreContext);
  const [job, setJob] = useState([]);
  const [why, setWhy] = useState([]);
  const [newLoading, setNewLoading] = useState(false);
  const [showIndustry, setShowIndustry] = useState(false);
  const [industry, setIndustry] = useState("");
  const [inLoading, setInLoading] = useState(false);

  useEffect(() => {
    console.log({ topic, globalVariable });
    if (!topic || globalVariable.length === 0) return;
    const prompt = `Act as a business development in online teaching platform company focusing on improving most-in-demand skill for Thai people. 

    Your task is to research a valid target group of ${topic} online course 
    
    Steps to Complete tasks are
    1) Understand the skills that ${topic} provides: ${globalVariable}
    2) Read the job description of the jobs
    3) Try to analyze whether the the skills that  ${topic} provides are relevant and 
     benefits to those job or not by these criteria; job descriptions, skill requirements, impact on job performance, industry relevance, market demand, employer requirements, and career growth opportunities.
    
    The results are list of jobs that requires ${topic} skillsets, and how ${topic} could benefits to those jobs.
    
    Constraints
    1. The results should be in lists
    2. Don't repeat the instructions
    3. 10 of Your Results strictly in json format like:
    [
      {
        "JobTitle": "string",
        "RelevantSkills": "string",
        "Benefits": "string"
      },
      {
        "JobTitle": "string",
        "RelevantSkills": "string",
        "Benefits": "string"
      },
      {
        "JobTitle": "string",
        "RelevantSkills": "string",
        "Benefits": "string"
      },
      {
        "JobTitle": "string",
        "RelevantSkills": "string",
        "Benefits": "string"
      }
    ]
    Example:
        [
          {
            "JobTitle": "UX Designer",
            "RelevantSkills: "User research, wireframing, prototyping, user testing.",
            "Benefits: "Service Design skills enhance the UX designer's ability to create holistic user experiences, aligning business goals with user needs, and improving the overall usability and satisfaction of digital products"
          },
          {
            "JobTitle": "Product Manager",
            "RelevantSkills": "Market research, product strategy, cross-functional collaboration",
            "Benefits": "Service Design skills enable product managers to take a customer-centric approach to product development. They can better understand user expectations, identify opportunities for service innovation, and design products that deliver superior customer experiences"
          },
          {
            "JobTitle": "Software Engineer",
            "RelevantSkills": "Software development, programming, data structures, algorithms",
            "Benefits": "Service Design skills enable software engineers to take a customer-centric approach to product development. They can better understand user expectations, identify opportunities for service innovation, and design products that deliver superior customer experiences"
          },
          {
            "JobTitle": "Data Analyst",
            "RelevantSkills": "Data analysis, data visualization, data modeling, SQL",
            "Benefits": "Service Design skills enable data analysts to take a customer-centric approach to product development. They can better understand user expectations, identify opportunities for service innovation, and design products that deliver superior customer experiences"
          }
        ]
  `;
    sendMessage(prompt);
  }, [globalVariable]);

  const addJob = (newJob) => {
    // setJob((prevItems) => {
    //   if (prevItems.length === 0) {
    //     return [newJob];
    //   }
    //   return [...prevItems, newJob];
    // });
    const prompt = `Act As a product development representative of an online teaching platform focusing on improving the most in-demand skills in Data, Tech, UX/UI, and Business for Thai people at an Education Technology Company that has the task to develop a new online course about Service Design. 

    Your task is to predict the possibility of ${newJob} if they were a recommended target audience group of the ${topic} online course.
    
    These are topics this course provides.
    ${globalVariable}
    
    Steps to complete tasks are:
    1) Understand ${newJob}'s job description
    2) Try to analyze whether the ${newJob}'s skills can be improved by topics and benefits of the ${topic} that were provided before indicated by these criteria; job descriptions, skill requirements, impact on job performance, industry relevance, market demand, employer requirements, and career growth opportunities.
    
    
    Constraints:
    Your Results strictly in json format like:
    {
      Job: "Job",
      isRecommended: "true or false",
      reason: "the reasons for the analysis.",
    }
    Example:
    {
      "Job": "Software Engineer",
      "isRecommended": true,
      "reason": "Software engineers deal with vast amounts of data on a regular basis in their job, and power BI provides an excellent tool for visualizing data in a user-friendly manner. Power BI can help software engineers create interactive reports, dashboards, and visualizations, allowing them to make informed decisions based on data trends and patterns. Improving their skills in power BI can also lead to increased job performance and career growth opportunities, as data analysis and visualization are in high demand across various industries. Therefore, we recommend software engineers to take the power BI online course."
    }
    `;
    validateJob(prompt, newJob);
    // Constraints
    // 1) The results should be in "recommended" or "not recommended", and the reasons for the analysis.
    // The expected Outline for the output is
    // "recommended" or "not recommended"
    // with the reasons for the analysis.
  };

  function parseStringToArrayOfObjects(input) {
    // try {
    //   const parsedArray = JSON.parse(input);
    //   if (Array.isArray(parsedArray)) {
    //     return parsedArray;
    //   } else {
    //     throw new Error("Input is not a valid array");
    //   }
    // } catch (error) {
    //   console.error("Error parsing string to array:", error);
    //   return [];
    // }
    const parsedArray = JSON.parse(input);
    return parsedArray;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Topic:", topic);
    console.log("Detail:", detail);
    // You can perform additional actions here, such as sending the form data to a server
    // let prompt = `This is a persona for a ${topic} named ${topic}. ${topic} is a ${detail}.`;
    const prompt = `Act as Researcher, a specialist in product research, at Education Technology Company provided courses about Data, Tech, UX/UI and Business. 

    Your main task is to research related topics and contents of the Course Topic ${topic}, also research the benefits of learning this course, soft skills and hard skills gained from these courses and benefits of having those skills.
    
    Steps to Complete Task are
    1.Read the Course Topic
    2.Research the details relevant to that Topic
    3.Provide an accurate 10 results or more if necessary for these sections: Related topic and Contents, and describe about it
    
    Constraints:
    Your Results strictly in json format like:
    [
      {
        Topic: "Topic 1",
        Describe: "about this topic and content"
      },
      {
        Topic: "Topic 2",
        Describe: "about this topic and content"
      },
      {
        Topic: "Topic 3",
        Describe: "about this topic and content"
      },
      {
        Topic: "Topic 4",
        Describe: "about this topic and content"
      },
      {
        Topic: "Topic 5",
        Describe: "about this topic and content"
      },
      {
        Topic: "Topic 6",
        Describe: "about this topic and content"
      },
      {
        Topic: "Topic 7",
        Describe: "about this topic and content"
      },
      {
        Topic: "Topic 8",
        Describe: "about this topic and content"
      },
      {
        Topic: "Topic 9",
        Describe: "about this topic and content"
      },
      {
        Topic: "Topic 10",
        Describe: "about this topic and content"
      }
    ]`;
    sendMessage(prompt);
  };

  const handleAdd = (newItem) => {
    setTest((prevItems) => [newItem, ...prevItems]);
    console.log(test);
  };

  function formatIndustriesData(dataString) {
    const industriesArray = dataString.split(/\d+\.\s/).slice(1);

    const formattedData = industriesArray.map((industry) => {
      const [industryTitle, ...industryDetails] = industry.split(/\n/);
      const [industryNumber, industryName] = industryTitle.split(". ");
      const details = industryDetails
        .filter((detail) => detail.trim() !== "")
        .map((detail) => detail.trim());

      return {
        number: industryNumber,
        name: industryName,
        details: details,
      };
    });

    return formattedData;
  }

  const sendMessage = (message) => {
    const url = "/api/chat";

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: message }],
    };

    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data.choices[0].message.content);
        console.log(typeof response.data.choices[0].message.content);
        const message = response.data.choices[0].message.content;
        const topics = parseStringToArrayOfObjects(message);
        setTest((prevItems) => [...topics, ...prevItems]);
        console.log(typeof topics);
        console.log(topics);
        // const personasArray = mapBenefitsFromString(
        //   response.data.choices[0].message.content
        // );
        // setData(personasArray);
        // console.log(personasArray);
        // setData((prevData) => [
        //   ...prevData,
        //   { type: "bot", message: response.data.choices[0].message.content },
        // ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const validateJob = (message, job) => {
    const url = "/api/chat";

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: message }],
    };

    setNewLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data.choices[0].message.content);
        console.log(typeof response.data.choices[0].message.content);
        const message = response.data.choices[0].message.content;
        const topics = parseStringToArrayOfObjects(message);
        console.log(typeof topics);
        console.log(topics);
        setWhy((prevItems) => [topics, ...prevItems]);
        setNewLoading(false);
      })
      .catch((error) => {
        setNewLoading(false);
        console.log(error);
      });
  };

  const genIndustry = (message) => {
    const url = "/api/chat";

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: message }],
    };

    setInLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data.choices[0].message.content);
        console.log(typeof response.data.choices[0].message.content);
        const message = response.data.choices[0].message.content;
        const formattedData = formatIndustriesData(message);
        setIndustry(message);
        setInLoading(false);
      })
      .catch((error) => {
        setNewLoading(false);
        console.log(error);
      });
  };

  const handleGenIndustry = () => {
    console.log("industry");
    setShowIndustry(!showIndustry);
    if (industry) return;
    const prompt = `Act as Researcher, a specialist in competitive analytics research, at an Education Technology Company that provided an online teaching platform focusing on improving the most in-demand skills in Data, Tech, UX/UI, and Business for Thai people. 

    Your task is to research as accurately as possible lists of the industry that required a field of knowledge and skills from the online course about ${topic} that includes these content topics :
    
    ${globalVariable}
    
    The steps to Complete the Task are
    1. Research related industry types
    2. Try to analyze whether the skills that ${topic} provides are relevant and beneficial to those industries or not by these criteria; industry’s domain knowledge, job position at those industries, skill requirements, impact on job performance, industry relevance, and market demand.
    
    Constraints:
    Your Results should be lists
    
    The expected Outline for each output is
    1. Industry type 1
    1.2. reasons why that industry requires these skills
    1.3. which parts of industry operation require these skills
    1.4. benefits of employees if they have those skills in their industry
    1.5. list at least 10 Thai companies or organizations as an example
    2. Industry type 2
    2.2. reasons why that industry requires these skills
    2.3. which parts of industry operation require these skills
    2.4. benefits of employees if they have those skills in their industry
    2.5. list at least 10 Thai companies or organizations as an example
    `;

    genIndustry(prompt);
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-x-hidden overflow-y-scroll min-h-screen bg-black via-zinc-600/20 to-black">
      <div className="text-white">This is target page</div>
      {/* <div className="max-w-4xl w-full bg-white">
        <form onSubmit={handleSubmit} className="rounded px-8 py-6">
          <div className="mb-4">
            <label
              htmlFor="topic"
              className="block text-black text-sm font-bold mb-2"
            >
              Topic:
            </label>
            <input
              type="text"
              id="topic"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <div className="text-sm text-zinc-500 mt-2">
              Note: if your topic is came from the date after sep 2021. Please,
              avoid to use specific name and explain the topic instead
            </div>
            <div className="text-sm text-zinc-500">
              For example: midjourney ai. Please, write topic like{" "}
              {`"The Ai for generate image with text"`}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div> */}
      <div className="max-w-4xl w-full bg-white my-4">
        <JobAddForm onSubmit={addJob} />
      </div>
      <div className="max-w-4xl w-full">
        <div className="bg-white">
          {job.map((jobpos, index) => (
            <p key={index} className="text-xl font-semibold mb-2">
              {jobpos}
            </p>
          ))}
        </div>
        {newLoading ? (
          <div className="flex justify-center items-center text-white text-3xl my-4">
            Loading...
          </div>
        ) : (
          <div
            className={`bg-white shadow-md p-6 mb-4 ${
              newLoading || why.length === 0 ? "hidden" : ""
            }`}
          >
            {why ? (
              <div>
                {why.map((job, index) => (
                  <ValidateCard key={index} job={job} />
                ))}
              </div>
            ) : null}
          </div>
        )}
        {showIndustry ? (
          <>
            {inLoading ? (
              <div className="flex justify-center items-center text-white text-3xl my-4">
                Loading...
              </div>
            ) : (
              <div
                className={`bg-white shadow-md p-6 mb-4 ${
                  inLoading || !industry ? "hidden" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleGenIndustry}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {showIndustry
                      ? "Back to Job Position"
                      : "Research Industry"}
                  </button>
                </div>
                {industry ? <div>{industry}</div> : null}
              </div>
            )}
          </>
        ) : (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center text-white text-3xl my-4">
                Loading...
              </div>
            ) : (
              <div
                className={`bg-white shadow-md p-6 mb-4 ${
                  isLoading || test.length === 0 ? "hidden" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleGenIndustry}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {showIndustry
                      ? "Back to Job Position"
                      : "Research Industry"}
                  </button>
                </div>
                {test ? (
                  <div>
                    {test.map((benefit, index) => (
                      <JobCard key={index} benefit={benefit} />
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default target;
