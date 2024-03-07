import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Header from "./components/Header";
import { useEffect, useState } from "react";
const pattern = /[^a-zA-Z]/g;
// Debounce function
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}

function App() {
  const [queryList, setQueryList] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 1500);

  function handleChange(e: any) {
    setQuery(e.target.value.replace(pattern, ""));
  }

  useEffect(() => {
    if (debouncedQuery.trim() != "" && debouncedQuery.length >= 3) {
      setQueryList((prevItems) =>
        [...prevItems, debouncedQuery].filter(
          (word, index, self) => self.indexOf(word) === index
        )
      );
    }
  }, [debouncedQuery]);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              queryList={queryList}
              query={query}
              setQuery={setQuery}
              handleChange={handleChange}
            />
          }
        />
        <Route path="history" element={<History queryList={queryList} />} />
      </Routes>
    </>
  );
}

export default App;
