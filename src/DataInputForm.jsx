
import React, { useState } from "react";

const DataInputForm = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const isValidJson = JSON.parse(input);
      const res = await fetch("https://bajaj-nslb.onrender.com/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: input,
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.log(error);
      alert("Invalid JSON or Backend Error");
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  return (
    <div>
      <h1>JSON Input</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <h2>Select Response Data</h2>
      <select multiple={true} onChange={handleOptionChange}>
        <option value="alphabets">Alphabets</option>
        <option value="numbers">Numbers</option>
        <option value="highest_lowercase_alphabet">
          Highest Lowercase Alphabet
        </option>
      </select>
      {response && (
        <div>
          <h3>Response</h3>
          <pre>
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(response).filter(([key]) =>
                  selectedOptions.includes(key)
                )
              ),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DataInputForm;
