import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, AddForm } from "../../components";
import { StoreContext } from "@/util/store";
import Link from "next/link";

const initialPersona = {
  name: "John",
  age: 25,
  pain: "Back pain",
  currentWork: "Software Engineer",
};

const Content = () => {
  const [topic, setTopic] = useState("");
  const [detail, setDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [persona, setPersona] = useState(null);
  const [test, setTest] = useState([]);
  const { globalVariable, updateGlobalVariable, updateTopic } =
    useContext(StoreContext);

  useEffect(() => {
    console.log(test);
  }, [test]);

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

    Your main task is to research related topics and contents of the Course Topic ${topic}.
    
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
    setTest((prevItems) => {
      if (prevItems.length === 0) {
        return [newItem];
      }
      return [...prevItems, newItem];
    });
    //console.log(test);
  };

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
        setTest((prevItems) => [...prevItems, ...topics]);
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

  const handleLink = () => {
    console.log("go to target page");
    updateGlobalVariable(test);
    updateTopic(topic);
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-x-hidden overflow-y-scroll min-h-screen bg-black via-zinc-600/20 to-black">
      <div className="text-white">This is content page</div>
      <div className="max-w-4xl w-full bg-white">
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
              Note: if your topic came from the date after sep 2021. Please,
              avoid to use specific name and explain the topic instead
            </div>
            <div className="text-sm text-zinc-500">
              For example: Midjourney AI. Please, write topic like{" "}
              {`"The AI for generate image with text"`}
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
      </div>
      <div className="max-w-4xl w-full bg-white my-4">
        <AddForm handleAdd={handleAdd} />
      </div>
      <div className="max-w-4xl w-full">
        {isLoading ? (
          <div className="flex justify-center items-center text-white text-3xl">
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
                onClick={handleLink}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <Link
                  key={"/Target"}
                  href={"/Target"}
                  className="text-sm duration-500 text-white hover:text-white"
                >
                  Generate Job Position
                </Link>
              </button>
            </div>
            {/* <PersonaCard initialPersona={initialPersona} /> */}
            {/* <div className="text-black text-md">{test}</div> */}
            {test ? (
              <div>
                {test.map((benefit, index) => (
                  <Card key={index} benefit={benefit} />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
