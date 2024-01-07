"use client";

import { addTask } from "@app/services/connection";
import { useRef, useState } from "react";
import { Loader } from "./Icons";

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
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <input
        ref={inputRef}
        className="text-black p-2 rounded-md grow"
        placeholder="Task Title"
        readOnly={loading}
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 rounded-md p-2 flex items-center hover:bg-blue-600 active:bg-blue-500
        disabled:bg-blue-300 disabled:shadow-none justify-center transition-colors"
        disabled={loading}
      >
        {loading && <Loader />}
        Add Task
      </button>
    </div>
  );
};
