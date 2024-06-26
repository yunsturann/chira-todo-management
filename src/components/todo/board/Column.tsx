"use client";

// ** React Imports

// ** Types
import { ITodo } from "@/types/model.types";

// ** Icons
import { LuDot } from "react-icons/lu";

// ** Third Party Imports
import { Droppable } from "@hello-pangea/dnd";

// ** Custom Components
import TodoItem from "./TodoItem";

interface ColumnProps {
  title: string;
  tasks: ITodo[];
  droppableId: string;
}

const Column = (props: ColumnProps) => {
  const { title, tasks, droppableId } = props;

  return (
    <div>
      {/* Header */}
      <header className="flex gap-1 mb-4">
        <h2 className="text-base uppercase font-semibold">{title}</h2>
        <LuDot />
      </header>
      {/* Column Body */}
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-6 space-y-3 shadow-md"
          >
            {tasks?.map((task, index) => (
              <TodoItem key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
