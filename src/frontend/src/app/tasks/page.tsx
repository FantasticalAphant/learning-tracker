"use client"

import Shell from "@/components/Shell";
import {useEffect, useState} from "react";
import {API_URL} from "@/utils/api";
import {Task} from "@/types";

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskContent, setTaskContent] = useState("");

    const fetchTasks = async () => {
        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({content: taskContent}),
            });

            fetchTasks();
            await response.json();
        } catch (error) {
            console.error(error);
        }

        setTaskContent("");
    }

    const handleCheckboxChange = async (taskId: number, completed: boolean) => {
        try {
            await fetch(`${API_URL}/tasks/${taskId}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({completed: !completed})
            });

            // TODO: use optimistic updates for the checkbox

            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (taskId: number) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${taskId}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            })

            if (!response.ok) {
                throw Error("DELETE failed");
            }

            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    }

    const currentTasks: Task[] = tasks.filter(task => !task.completed)
    const completedTasks: Task[] = tasks.filter(task => task.completed)

    return (
        <div>
            <Shell highlightedTab={"Tasks"}>
                <p className="text-4xl text-center">Tasks</p>
                <div>
                    <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                        Add new task
                    </label>
                    <div className="mt-2 flex rounded-md shadow-sm">
                        <input
                            id="text"
                            name="text"
                            type="text"
                            value={taskContent}
                            onChange={event => setTaskContent(event.target.value)}
                            onKeyDown={event => {
                                if (event.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                            placeholder="Task content"
                            className="block w-3/6 rounded-none rounded-l-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <button
                            type="submit" onClick={handleSubmit}
                            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="my-4">
                    <span className="text-xl text-blue-500">Current:</span>
                    {currentTasks.map(task => (
                        <div key={task["id"]} className="flex justify-between w-2/12">
                            <div>
                                <input
                                    type={"checkbox"}
                                    className={"mr-2"}
                                    checked={task["completed"]}
                                    onChange={() => handleCheckboxChange(task.id, task.completed)}
                                />
                                {task["content"]}
                            </div>

                            <button
                                type="button"
                                onClick={() => handleDelete(task.id)}
                                className="text-red-300">
                                X
                            </button>
                        </div>
                    ))}
                </div>

                <div>
                    <span className="text-xl text-yellow-500">Completed:</span>
                    {completedTasks.map(task => (
                        <div key={task["id"]} className="flex justify-between w-2/12">
                            <div>
                                <input
                                    type={"checkbox"}
                                    className={"mr-2"}
                                    checked={task["completed"]}
                                    onChange={() => handleCheckboxChange(task.id, task.completed)}
                                />
                                <span className="line-through text-gray-500">{task["content"]}</span>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleDelete(task.id)}
                                className="text-red-300">
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </Shell>
        </div>
    );
}