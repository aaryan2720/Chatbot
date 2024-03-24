import { useState } from "react";
const App = () =>{
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  
  const surpriseOptions =[
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
]
  const surprise = ()=>{
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    setValue(randomValue) 
  }

  const getResponse = async ()=>{
    if(!value){
      setError("Error! Please ask a question!")
      return
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        'Content-type': 'application/json'
      }
      
      const response = await fetch('http://localhost:3000/', options)
      const data = await response.text()
      console.log(data)


    } catch (error) {
      console.error(error)
      setError("Something went wrong! 😶🙁")
    }
  }
  
  return (
    <div className="app">
      <p>
        What do you want to know ?
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise me</button>
      </p>
      <div className="input-container">
        <input value={value} placeholder="What's Love?" onChange={(e) =>setValue(e.target.value)} />
        {!error && <button>Ask me </button>}
        {error && <button>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="search-result">
        <div key={""}>
          <p className="answer"></p>
        </div>
      </div>
    </div>
  );
};

export default App;
