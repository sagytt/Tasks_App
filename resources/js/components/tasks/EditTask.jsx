import axios from "axios";
import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const EditTask = ({ onClose, isOpen, refreshTasks, taskId }) => {
    const [loading, setLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [name, setName] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const getTask = async () => {
            setLoading(true);
            const { data } = await axios.get(`/api/task/${taskId}`);
            setName(data.name);
            setStartDate(new Date(data.date));
            setCompleted(!!data.status);
            setLoading(false);
        };
        getTask();
    }, [taskId]);

    const closeWhenClickedOutside = (e) => {
        if (e.target.id === "chat_modal") {
            onClose();
        }
    };

    const handleEditTask = async (e) => {
        e.preventDefault();

        setEditLoading(true);

        const { data, status } = await axios.put(`/api/task/${taskId}`, {
            name: name,
            date: format(startDate, "yyyy/MM/dd"),
            status: completed,
        });

        setEditLoading(false);
        onClose();
        if (status === 200) toast.success(data.message);
        else toast.error(data.message);
        refreshTasks();
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
                            Edit Task
                        </h3>
                    </div>

                    <div className="p-6">
                        {!loading && (
                            <form
                                className=" space-y-4"
                                onSubmit={handleEditTask}
                            >
                                <input
                                    type="text"
                                    className="w-full py-2 px-2 rounded border border-gray-400 text-black"
                                    placeholder="Task"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    placeholder="Enter date"
                                />
                                <div className="flex items-center mb-4">
                                    <input
                                        id="default-checkbox"
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={(e) =>
                                            setCompleted(e.target.checked)
                                        }
                                    />
                                    <label
                                        htmlFor="default-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Completed
                                    </label>
                                </div>
                                <button className="w-full py-2 bg-slate-700 mt-2 rounded text-white">
                                    {loading ? "Loading..." : "Edit"}
                                </button>
                            </form>
                        )}
                        {loading && <div className="">...Loading</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTask;
