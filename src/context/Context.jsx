import React, { createContext, useState } from "react"; // Importing React, createContext, and useState
import run from "../config/gemini"; // Importing the run function from the specified path

export const context = createContext(); // Creating a new context

const ContextProvider = (props) => {
  // State variables and their setters
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]); // Corrected to prevPrompt
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Function to display words one by one with a delay
  const delayPara = (index, words) => {
    if (index < words.length) {
      setTimeout(() => {
        setResultData((prevData) => prevData + words[index] + " ");
        delayPara(index + 1, words);
      }, 50);
    }
  };

  // Function to start a new chat
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // Function to handle the submission of a prompt
  const OnSent = async (prompt) => {
    setResultData(""); // Clear previous result data
    setLoading(true); // Set loading state to true
    setShowResult(true); // Set showResult to true to display the result section
    let response; // Variable to store the response from the run function
    if(prompt !== undefined){
      response = await run(prompt); // Run the prompt if it's defined
      setRecentPrompt(prompt); // Set recent prompt
    }
    else{
      setPrevPrompt(prev => [...prev, input]); // Add input to previous prompts
      setRecentPrompt(input); // Set recent prompt to input
      response = await run(input); // Run the input prompt
    }

    try {
      // Splitting the response by '**' and formatting it with <b> tags
      let responseArray = response.split("**");
      let newResponse = "";
    
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 === 0) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      // Replacing '*' with </b> tags and splitting by spaces
      let newResponse2 = newResponse.split("*").join("</b>");
      let newResponseArray = newResponse2.split(" ");
      delayPara(0, newResponseArray); // Display the response with delay
    } catch (error) {
      setResultData("There was an error processing your request."); // Set error message if there is an error
    } finally {
      setLoading(false); // Set loading state to false
      setInput(""); // Clear the input
    }
  };

  // Defining the context value
  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    OnSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  // Providing the context to the children components
  return (
    <context.Provider value={contextValue}>
      {props.children}
    </context.Provider>
  );
};

export default ContextProvider; // Exporting the ContextProvider component
