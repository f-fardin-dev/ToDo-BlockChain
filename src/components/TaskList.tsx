"use client";

import { getAllTask } from "@app/services/connection";
import { Task } from "@app/types/task-interface";
import { useEffect, useState } from "react";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const allTasks = await getAllTask();
      if (allTasks.length) {
        setTasks([...allTasks]);
      }
    };
    fetchTasks();
  }, []);
  return (
    <div className="h-[calc(100vh-10.4rem)] p-2 mt-3 rounded-md bg-slate-500 w-full overflow-y-auto">
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};
