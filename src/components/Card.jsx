import { useState } from "react";

export default function Card({title}) {

    const [tasks, setTask] = useState([]);
    const [input, setInput] = useState("");


    const addTask = () => {

        console.log("Adding task: ", input);
        if(input.trim() === "") return;
        setTask([...tasks, input]);
        setInput("");
    
    }

    const deleteTask = (index) => {
        console.log("Deleting task: ", index);
        setTask(tasks.filter((_, i) => i !== index));
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-720 flex flex-col text-center">
            <h2 className="font-bold mb-4">{title}</h2>

            <div className="flex mb-2">
                
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Task"
                />

                <button className="bg-blue-500 text-white px-3 py-1 rounded-xlñ text-sm" onClick={addTask}>+</button>

            </div>
            
            <ul className="space-y-2">
                {tasks.map((task, index) => (
                    <li 
                        key={index} 
                        className="bg-gray-100 p-2 rounded-md shadow-sm">
                        {task}
                        <button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm float-right" onClick={()=> deleteTask(index)}>X</button>
                    </li>
                    
                ))}
            </ul>

        </div>
    );

};

