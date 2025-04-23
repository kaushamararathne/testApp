import React, { useState } from "react";
import './app.css';

function App() {
  const [formData, setFormData] = useState({
    label1: "",
    label2: "",
  });

  const [response, setResponse] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: "Failed to send data" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md shadow-lg rounded-2xl bg-white p-6">
        <h1 className="text-2xl font-bold mb-4">Submit Your Data</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-5">
            <label htmlFor="label1" className="block text-sm font-medium text-gray-700 margin-500">
            Enter Your Name:
            </label>
            <input
              type="text"
              id="label1"
              name="label1"
              value={formData.label1}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="label2" className="block text-sm font-medium text-gray-700">
              Enter Your Email:
            </label>
            <input
              type="text"
              id="label2"
              name="label2"
              value={formData.label2}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>

        {response && (
          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-green-500">Response:</p>
            <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
