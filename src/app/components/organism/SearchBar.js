"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchSuggestions,
  setSearchTerm,
} from "../../redux/slice/photographerSlice";
import { debounce } from "@/utils/debounce";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const suggestions = useSelector((state) =>
    selectSearchSuggestions(state, inputValue)
  );
  const searchRef = useRef(null);

  const debouncedSearch = debounce((term) => {
    dispatch(setSearchTerm(term));
  }, 300);

  useEffect(() => {
    debouncedSearch(inputValue);
    return () => debouncedSearch.cancel();
  }, [inputValue, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.name);
    dispatch(setSearchTerm(suggestion.name));
    setShowSuggestions(false);
  };

  return (
    <div
    ref={searchRef}
    className="w-full max-w-xl mx-auto relative bg-white/70 dark:bg-teal-800/40 rounded-md shadow-sm px-3 py-2 sm:px-4 sm:py-2.5"
  >
      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search photographers..."
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition"
        />
        {inputValue && (
          <button
            onClick={() => {
              setInputValue("");
              dispatch(setSearchTerm(""));
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-white text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-20 w-full mt-2 bg-white dark:bg-teal-800 rounded-md shadow-md border border-gray-200 dark:border-teal-700 max-h-52 overflow-y-auto text-sm">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer border-b last:border-none border-gray-100 dark:border-slate-600 transition-colors"
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {suggestion.name}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded">
                  {suggestion.location}
                </span>
                {suggestion.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
