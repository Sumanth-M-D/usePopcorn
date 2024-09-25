import { useEffect, useRef, useCallback, useState } from "react";
import { debounce } from "../tools_&_cutom_hooks/debounce";
import { useKey } from "../tools_&_cutom_hooks/useKey";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  const [search, setSearch] = useState("");

  //? debouncing query updation
  /*
    This function is called by the useEffect every time the "search" state is updated.
    so to reduce the query updation & APi request, it is debounced to 500 seconds.
   */
  const handleSearch = useCallback(
    debounce((value) => {
      setQuery(value);
    }, 500),
    [setQuery] // Ensure debounce is only created once
  );

  //?  Focus on search when user presses Enter
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  //? Focus on search when the page loads
  useEffect(function () {
    inputEl.current.focus();
  }, []);

  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
}
