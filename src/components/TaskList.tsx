"use client";

import { getAllTask, getContract } from "@app/services/connection";
import { Task } from "@app/types/task-interface";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { DeleteIcon } from "./Icons";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleDeleteTask = (taskId: number) => {
    console.log({ taskId });
  };

  useEffect(() => {
    let taskContract: ethers.Contract;
    const fetchTasks = async () => {
      const allTasks = await getAllTask();
      if (allTasks.length) {
        setTasks([...allTasks]);
      }
    };
    const fetchContract = async () => {
      const contract = await getContract();
      if (!contract) return;
      taskContract = contract;
      taskContract.on("taskAdded", () => {
        fetchTasks();
      });
      taskContract.on("taskDeleted", () => {
        fetchTasks();
      });
    };
    fetchTasks();
    fetchContract();

    return () => {
      taskContract?.removeAllListeners("taskAdded");
      taskContract?.removeAllListeners("taskDeleted");
    };
  }, []);

  return (
    <div
      className="h-[calc(100vh-10.4rem)] p-8 mt-3 rounded-md bg-slate-500 w-full overflow-y-auto
    flex flex-col gap-2
    "
    >
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-violet-500 p-4 rounded-md flex justify-between relative"
        >
          {task.title.at(0)?.toUpperCase() + task.title.slice(1)}
          <span onClick={() => handleDeleteTask(task.id)}>
            <DeleteIcon />
          </span>
          {false && (
            <div className="linear-loader bg-violet-500 rounded absolute right-2 left-2 bottom-[2px]"></div>
          )}
        </div>
      ))}
    </div>
  );
};
