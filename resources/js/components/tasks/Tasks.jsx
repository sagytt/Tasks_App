import React, { useEffect, useState } from "react";
import Tracker from "./Tracker";
import Filter from "./Filter";
import Table from "./Table";
import AddTask from "./AddTask";

const Tasks = () => {
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({
        tasks: [],
        total: 0,
        completed: 0,
    });
    const [filterQuery, setFilterQuery] = useState({
        status: "",
        date: "",
    });
    const [sortBy, setSortBy] = useState({
        field: "",
        sort: "",
    });

    const onOpen = () => {
        setIsOpen(true);
    };
    const onClose = () => {
        setIsOpen(false);
    };
    const refreshTasks = () => {
        setRefresh(true);
    };
    const onFilter = () => {
        refreshTasks();
    };
    const onSort = () => {
        refreshTasks();
    };

    useEffect(() => {
        const getTasks = async () => {
            setLoading(true);
            const { data } = await axios.get(
                `/api/task?status=${filterQuery.status}&date=${filterQuery.date}&sort=${sortBy.field}&by=${sortBy.sort}`
            );
            setData(data);
            setLoading(false);
            setRefresh(false);
        };
        getTasks();
    }, [refresh]);

    return (
        <div className="pt-5">
            <Tracker total={data.total} completed={data.completed} />
            <div>
                <div className="mb-5 flex justify-between items-end gap-1">
                    <Filter
                        filterQuery={filterQuery}
                        setFilterQuery={setFilterQuery}
                        onFilter={onFilter}
                    />
                    <button
                        className="px-8 py-[0.6rem] bg-green-500 hover:bg-green-600 rounded text-white"
                        onClick={onOpen}
                    >
                        New
                    </button>
                </div>
                <Table
                    tasks={data.tasks}
                    loading={loading}
                    refreshTasks={refreshTasks}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onSort={onSort}
                />
            </div>
            <AddTask
                isOpen={isOpen}
                onClose={onClose}
                refreshTasks={refreshTasks}
            />
        </div>
    );
};

export default Tasks;
