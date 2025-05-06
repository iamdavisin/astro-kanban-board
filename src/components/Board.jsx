import { useState } from "react";
import Card from "./Card";

export default function Board() {
  
    const [columns] = useState(["To do", "In Progress", "Done"]);

    return (
        <div className="flex gap-4 p-4 overflow-x-auto">
            
            {columns.map((title, index) =>(

                <Card key={index} title={title} />

            ))}
        </div>
    );

};

