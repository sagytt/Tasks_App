import React from "react";

const Tracker = ({ total, completed }) => {
    return (
        <div className="sm:flex sm:justify-between space-y-3 sm:space-y-0 mb-10">
            <div className="flex justify-between sm:w-1/4 bg rounded shadow-md bg-slate-100">
                <div className="w-4/5 py-3 pl-3">Total Tasks</div>
                <div className="w-1/5 py-3 text-white font-bold bg-slate-700 rounded-r text-center">
                    {total}
                </div>
            </div>
            <div className="flex justify-between sm:w-1/4 bg rounded shadow-md bg-slate-100">
                <div className="w-4/5 py-3 pl-3">Tasks Completed</div>
                <div className="w-1/5 py-3 text-white font-bold bg-slate-700 rounded-r text-center">
                    {completed}
                </div>
            </div>
            <div className="flex justify-between sm:w-1/4 bg rounded shadow-md bg-slate-100">
                <div className="w-4/5 py-3 pl-3">Tasks Remaining</div>
                <div className="w-1/5 py-3 text-white font-bold bg-slate-700 rounded-r text-center">
                    {total - completed}
                </div>
            </div>
        </div>
    );
};

export default Tracker;
