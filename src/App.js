import React, { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [response, setResponse] = useState("");

  const surpriseOptions = [
    'Who won the latest Nobel Peace Prize?',
    'Who was VEER SAVARKAR?',
    'Who are Chafekar bandhu?',
    'Pav Bhaji recipe?',
    'Misal Pav?',
    'MAHENDRA SINGH DHONI',
    'Who won the Nobel Peace Prize in 2023?',
    'Who was Nelson Mandela?',
    'What is the significance of the Magna Carta?',
    'How do you make a classic margherita pizza?',
    'Who wrote the novel "To Kill a Mockingbird"?',
    'What is the Higgs boson particle?',
    'Who painted the Mona Lisa?',
    'What are the principles of the Theory of Relativity?',
    'How do you make a traditional Japanese sushi roll?',
    'Who discovered penicillin?'
  ];

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
    setResponse(""); // Reset response when "Surprise me" is clicked
  };

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question!");
      return;
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await fetch('http://192.168.240.117:3000/gemini', options);
      
      // Check if the response is not successful (status other than 200)
      if (!response.ok) {
        throw new Error('Server responded with a non-OK status');
      }
      
      // Check the content type of the response
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        // If the response is JSON, parse it
        const data = await response.json();
        setResponse(data);
      } else {
        // If the response is not JSON, handle it accordingly
        const text = await response.text();
        setResponse({ message: text }); // Assuming you want to display the text message
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong! Please try again later.");
    }
  };

  return (
    <div className="app">
      <p>
        What do you want to know?
        <button className="surprise" onClick={surprise}>Surprise me</button>
      </p>
      <div className="input-container">
        <input value={value} placeholder="What's Love?" onChange={(e) => setValue(e.target.value)} />
        {!error && <button onClick={getResponse}>Ask me </button>}
        {error && <button onClick={() => setError("")}>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      {response && (
        <div className="search-result">
          <p className="answer">{response.message}</p>
        </div>
      )}
    </div>
  );
};

export default App;
