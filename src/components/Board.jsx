import { useState } from "react";
import Card from "./Card";
import { DndContext, closestCenter } from "@dnd-kit/core";
export default function Board() {
  
    const [columns, setColumns] = useState({
        todo: [],
        inProgress: [],
        done: [],
    });

    const handleDragEvent = ({active, over}) => {
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
        
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEvent}>
            <div className="flex gap-4 p-4 overflow-x-auto">
                <Card id="todo" title="To Do" tasks={columns.todo}  setColumns={setColumns}/>
                <Card id="inProgress" title="In Progress" tasks={columns.inProgress} setColumns={setColumns}/>
                <Card id="done" title="Done" tasks={columns.done} setColumns={setColumns}/>
            </div>
        </DndContext>
    );

};

