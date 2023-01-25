import React, { useState } from "react";
import differenceInDays from "date-fns/differenceInDays";
import {
    HiOutlineArrowDownCircle,
    HiOutlineArrowUpCircle,
    HiOutlineTrash,
    HiOutlinePencilSquare,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import EditTask from "./EditTask";

const Table = ({ tasks, loading, refreshTasks, sortBy, setSortBy, onSort }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [taskId, setTaskId] = useState(null);

    const onClose = () => {
        setIsOpen(false);
    };

    const handleEditClick = async (id) => {
        console.log("=====>", id);
        setTaskId(id);
        setIsOpen(true);
    };

    const handleDeleteTask = async (id, date) => {
        const diffDay = differenceInDays(new Date(date), new Date());
        if (diffDay < 7) {
            toast.error(
                "Task should only be deleted if their due date is more than 6 days"
            );
        } else if (confirm("Do you want to delete this task?")) {
            const { data, status } = await axios.delete(`/api/task/${id}`);
            console.log(data);
            if (status === 200) toast.success(data.message);
            else toast.error(data.message);
            refreshTasks();
        }
    };
    const sorting = (field) => {
        return (
            <span>
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {sortBy.field === field && sortBy.sort === "asc" ? (
                    <HiOutlineArrowDownCircle
                        className="inline-block w-5 h-5 ml-1 cursor-pointer"
                        onClick={() => {
                            setSortBy({
                                field: field,
                                sort: "desc",
                            });
                            onSort();
                        }}
                    />
                ) : (
                    <HiOutlineArrowUpCircle
                        className="inline-block w-5 h-5 ml-1 cursor-pointer"
                        onClick={() => {
                            setSortBy({
                                field: field,
                                sort: "asc",
                            });
                            onSort();
                        }}
                    />
                )}
            </span>
        );
    };
    return (
        <div className="overflow-auto">
            <table className="w-full min-w-[700px]">
                <thead className="h-12 bg-slate-700 text-white">
                    <tr>
                        <th>#</th>
                        <th>{sorting("name")}</th>
                        <th>{sorting("status")}</th>
                        <th>{sorting("date")}</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading &&
                        tasks?.length > 0 &&
                        tasks.map((task) => (
                            <tr
                                key={task.id}
                                className="text-center h-12 shadow"
                            >
                                <td>{task.id}</td>
                                <td>{task.name}</td>
                                <td>
                                    <span
                                        className={`${
                                            task.status
                                                ? "bg-green-400"
                                                : "bg-red-400"
                                        } py-1 px-3 rounded-full`}
                                    >
                                        {task.status
                                            ? "completed"
                                            : "In progress"}
                                    </span>
                                </td>
                                <td>{task.date}</td>
                                <td>
                                    <div className="flex justify-center gap-2">
                                        <HiOutlinePencilSquare
                                            className="h-6 w-6 text-blue-600 hover:text-blue-700 cursor-pointer"
                                            onClick={() =>
                                                handleEditClick(task.id)
                                            }
                                        />
                                        <HiOutlineTrash
                                            className="h-6 w-6 text-red-600 hover:text-red-700 cursor-pointer"
                                            onClick={() => {
                                                handleDeleteTask(
                                                    task.id,
                                                    task.date
                                                );
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    {!loading && tasks?.length == 0 && (
                        <tr className="h-12">
                            <td className="text-center font-bold" colSpan={5}>
                                No Tasks Found
                            </td>
                        </tr>
                    )}
                    {loading && (
                        <tr className="h-12">
                            <td className="text-center font-bold" colSpan={5}>
                                ...Loading
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isOpen && (
                <EditTask
                    isOpen={isOpen}
                    onClose={onClose}
                    taskId={taskId}
                    refreshTasks={refreshTasks}
                />
            )}
        </div>
    );
};

export default Table;
