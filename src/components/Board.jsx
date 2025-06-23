import { useEffect, useState } from "react";
import Card from "./Card";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";




export default function Board() {

    const initialColumns = {

        todo: [],
        inProgress: [],
        done: [],
    
    };

    const getStoredColumns = () => {

        if(typeof window === "undefined") return initialColumns;
        const stored = localStorage.getItem("kanbanColumns");
        return stored ? JSON.parse(stored) : initialColumns;
    };



    const [columns, setColumns] = useState(getStoredColumns);
    const [activeTask, setActiveTask] = useState(null);
    const [invisibleTask, setInvisibleTask] = useState(null);

    useEffect(() => {
        if(typeof window !== "undefined"){
            localStorage.setItem("kanbanColumns", JSON.stringify(columns));
        }
        
    }, [columns]);

    const handleDragStart = ({active}) => {
        if(active.data?.current){
            setActiveTask(active.data.current.task);
            setInvisibleTask(active.id);
        }}


    const handleDragEnd = ({active, over}) => {
        setActiveTask(null);
        setInvisibleTask(null);
        if(!over || !active.data?.current) return;

        const from = active.data.current.column;
        const to = over.id;
        if(from === to) return;

        const task = columns[from][active.data.current.index];
        if(!task) return;

        const updatedFrom = columns[from].filter((_, index) => index !== active.data.current.index);
        const updatedTo = [...columns[to], task];

        setColumns({
            ...columns,
            [from]: updatedFrom,
            [to]: updatedTo,
        });

    }

    return (
        
        <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex gap-4 p-4 overflow-x-auto">
                <Card id="todo" title="To Do" tasks={columns.todo}  setColumns={setColumns} invisibleTask={invisibleTask}/>
                <Card id="inProgress" title="In Progress" tasks={columns.inProgress} setColumns={setColumns} invisibleTask={invisibleTask}/>
                <Card id="done" title="Done" tasks={columns.done} setColumns={setColumns} invisibleTask={invisibleTask}/>
            </div>

            <DragOverlay>
                {activeTask ? (
                    <li className="bg-gray-100 p-2 rounded-md shadow-sm list-none text-center dark:bg-gray-700 dark:text-white">
                        <span>{activeTask}</span>
                        <button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm float-right">X</button>
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded-md text-sm float-right cursor-move">☰</button>
                    </li>
                ) : null}
            </DragOverlay>

        </DndContext>
    );

};

