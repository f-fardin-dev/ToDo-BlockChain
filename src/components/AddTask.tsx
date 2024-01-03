"use client";

import { addTask } from "@app/services/connection";
import { useRef, useState } from "react";

export const AddTask = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!inputRef || !inputRef.current?.value) {
      return;
    }
    try {
      setLoading(true);
      await addTask(inputRef.current?.value);
      inputRef.current.value = "";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row gap-4 p-2 w-full md:max-w-3xl ">
      <input
        ref={inputRef}
        className="text-black p-2 rounded-md grow"
        placeholder="Task Title"
        readOnly={loading}
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 rounded-md p-2 flex items-center hover:scale-105 active:scale-100 
        disabled:scale-100 disabled:bg-blue-300 disabled:shadow-none"
        disabled={loading}
      >
        {loading && (
          <svg
            className="animate-spin mr-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        Add Task
      </button>
    </div>
  );
};
