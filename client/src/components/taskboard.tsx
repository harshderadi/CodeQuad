import { useState } from "react";
import {
    DndContext,
    closestCorners,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const initialTasks = [
    { id: "1", title: "Setup project", status: "To Do", priority: "Medium" },
    { id: "2", title: "Implement authentication", status: "In Progress", priority: "High" },
    { id: "3", title: "Fix styling issues", status: "In Progress", priority: "Low" },
    { id: "4", title: "Deploy to production", status: "Done", priority: "High" },
];

const statuses = ["To Do", "In Progress", "Done"];
const priorities = ["Low", "Medium", "High"];

const TaskBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskPriority, setNewTaskPriority] = useState("Medium");

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === active.id ? { ...task, status: over.id } : task
            )
        );
    };

    const addTask = () => {
        if (!newTaskTitle.trim()) return;
        const newTask = {
            id: String(tasks.length + 1),
            title: newTaskTitle,
            status: "To Do",
            priority: newTaskPriority,
        };
        setTasks([...tasks, newTask]);
        setNewTaskTitle("");
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Task Management Board
                </h1>

                {/* Add Task Section */}
                <div className="flex gap-4 mb-6 bg-gray-800 p-4 rounded-lg shadow-lg">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="New task title"
                        className="p-2 w-64 border-none rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <select
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                        className="p-2 border-none rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        {priorities.map((priority) => (
                            <option key={priority} value={priority}>
                                {priority}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={addTask}
                        className="p-2 px-4 bg-purple-500 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 shadow-lg"
                    >
                        + Add Task
                    </button>
                </div>

                {/* Task Columns */}
                <div className="flex justify-around w-full max-w-5xl">
                    {statuses.map((status) => (
                        <SortableContext
                            key={status}
                            items={tasks.filter((t) => t.status === status)}
                            strategy={verticalListSortingStrategy}
                        >
                            <TaskColumn key={status} status={status} tasks={tasks.filter(task => task.status === status)} deleteTask={deleteTask} />
                        </SortableContext>
                    ))}
                </div>
            </div>
        </DndContext>
    );
};

const TaskColumn = ({ status, tasks, deleteTask }: { status: string; tasks: { id: string; title: string; status: string; priority: string }[], deleteTask: (id: string) => void }) => {
    const { setNodeRef } = useDroppable({ id: status });

    return (
        <div
            ref={setNodeRef}
            className="w-1/3 p-4 bg-gray-900 bg-opacity-60 shadow-xl rounded-xl backdrop-blur-md border border-gray-700"
        >
            <h2 className="text-xl font-semibold mb-4 text-center text-purple-400">
                {status}
            </h2>
            {tasks.length === 0 ? (
                <p className="text-gray-500 text-center">No tasks</p>
            ) : (
                tasks.map((task) => <TaskCard key={task.id} task={task} deleteTask={deleteTask} />)
            )}
        </div>
    );
};

const TaskCard = ({ task, deleteTask }: { task: { id: string; title: string; status: string; priority: string }, deleteTask: (id: string) => void }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="p-4 mb-3 bg-gray-800 border border-gray-700 shadow-lg rounded-lg cursor-grab transition-transform duration-200 hover:scale-105"
        >
            <div className="flex justify-between items-center">
                <div>
                    <strong className="text-white">{task.title}</strong>
                    <p className="text-sm mt-1 text-gray-400">
                        Priority:{" "}
                        <span
                            className={`px-2 py-1 rounded-md text-sm ${
                                task.priority === "High"
                                    ? "bg-red-500 text-white"
                                    : task.priority === "Medium"
                                    ? "bg-yellow-500 text-gray-900"
                                    : "bg-green-500 text-gray-900"
                            }`}
                        >
                            {task.priority}
                        </span>
                    </p>
                </div>
                <button
                    onClick={() => deleteTask(task.id)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-all duration-150"
                >
                    ✖
                </button>
            </div>
        </div>
    );
};

export default TaskBoard;
