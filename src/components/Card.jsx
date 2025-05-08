import { useState } from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";

export default function Card({id, title, tasks, setColumns, invisibleTask}) {

    const [input, setInput] = useState("");
    const {setNodeRef} = useDroppable({id});

    const addTask = () => {

        console.log("Adding task: ", input);
        if(input.trim() === "") return;
        
        setColumns((prev) => ({
            ...prev,
            [id]: [...prev[id], input],
        }));
        setInput("");
    
    }

    const deleteTask = (index) => {
        console.log("Deleting task: ", index);
        setColumns((prev) => ({
            ...prev,
            [id]: prev[id].filter((_, i) => i !== index),
        }));
        
    }

    return (
        <div ref={setNodeRef} className="bg-white shadow-md rounded-lg p-4 w-720 flex flex-col text-center">
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
                    
                    <DraggableTask
                        key={`${id}-${index}`}
                        id={`${id}-${index}`}
                        index={index}
                        task={task}
                        column={id}
                        onDelete={()=>deleteTask(index)}
                        invisibleTask={invisibleTask}/>
                        
                ))}
            </ul>
        </div>
    );


    function DraggableTask({id, index, task, column, onDelete, invisibleTask}) {

        const isDragging = invisibleTask === id;

        const {attributes, listeners, setNodeRef} = useDraggable({
            id,
            data: {
                index,
                column,
                task,
            },
        });

        return (
            <li ref={setNodeRef} className={`bg-gray-100 p-2 rounded-md shadow-sm ${isDragging ? "opacity-0" : ""}`}>
                <span>{task}</span>
                <button onClick={(e) => {e.stopPropagation(); e.preventDefault(); onDelete()}} className="bg-red-500 text-white px-2 py-1 rounded-md text-sm float-right">X</button>
                <button {...listeners} {...attributes} className="bg-yellow-500 text-white px-2 py-1 rounded-md text-sm float-right cursor-move">☰</button>
            </li>
        );
    }


};

