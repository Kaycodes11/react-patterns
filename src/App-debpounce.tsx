import React, { useState, useEffect } from "react";
import { useDebounce } from "./exercise-related/useDebounce";

function searchCharacters(search) {
  const apiKey = "f9dfb1e8d466d36c27850bedd2047687";
  return fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`,
    {
      method: "GET",
    }
  ).then((r) => r.json());
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Array<any>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 2500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCharacters(debouncedSearchTerm).then((results) => {
        setIsSearching(false);
        // Filter out results with no thumbnail
        const filteredResults = results.data.results.filter(
          (result) =>
            result.thumbnail.path.indexOf("image_not_available") === -1
        );
        setResults(filteredResults);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div style={{ padding: "15px" }}>
      <div>
        <input
          style={{
            width: "100%",
            fontSize: "2rem",
            padding: "0.4rem",
            marginBottom: "10px",
          }}
          placeholder="Search The Marvel Comics"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isSearching && <div>Searching ...</div>}

      {results.map((result) => (
        <div
          key={result.id}
          style={{
            display: "inline-block",
            width: "200px",
            margin: "10px",
          }}
        >
          <h4>{result.title}</h4>
          <img
            src={`${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`}
            style={{ width: "100%" }}
          />
        </div>
      ))}
    </div>
  );
}
