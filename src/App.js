import React, { useState, useEffect } from "react";

function App() {
  const [issues, setIssues] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function fetchIssues() {
      const response = await fetch(`https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`);
      const data = await response.json();
      setIssues(data.map((issue) => issue.title));
    }
    fetchIssues();
  }, [pageNumber]);

  function handleNextClick() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function handlePrevClick() {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  }

  return (
    <div>
      <h2>Page number {pageNumber}</h2>
      <ol>
        {issues.map((issue, index) => (
          <li key={index}>{issue}</li>
        ))}
      </ol>
      <button id="load_prev" onClick={handlePrevClick}>
        Previous
      </button>
      <button id="load_next" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
}

export default App;
