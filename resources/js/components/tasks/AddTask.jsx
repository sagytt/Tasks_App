import axios from "axios";
import React, { useState } from "react";
import format from "date-fns/format";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const AddTask = ({ onClose, isOpen, refreshTasks }) => {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [task, setTask] = useState("");

    const closeWhenClickedOutside = (e) => {
        if (e.target.id === "chat_modal") {
            onClose();
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();

        setLoading(true);

        const { data } = await axios.post("/api/task", {
            name: task,
            date: format(startDate, "yyyy/MM/dd"),
        });

        setLoading(false);
        onClose();
        refreshTasks();
        toast.success("Task successfully created!");
    };

    return (
        <div
            id="chat_modal"
            className={`fixed flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-[#0000006b] ${
                !isOpen && "hidden"
            }`}
            onClick={closeWhenClickedOutside}
        >
            <div className="relative w-full h-full max-w-md md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="crypto-modal"
                        onClick={onClose}
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>

                    <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                            Create Task
                        </h3>
                    </div>

                    <div className="p-6">
                        <form
                            className=" space-y-4"
                            onSubmit={handleCreateTask}
                        >
                            <input
                                type="text"
                                className="w-full py-2 px-2 rounded border border-gray-400 text-black"
                                placeholder="Task"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                            />
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy/MM/dd"
                                placeholder="Enter date"
                            />
                            <button className="w-full py-2 bg-slate-700 mt-2 rounded text-white">
                                {loading ? "Loading..." : "Create"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
