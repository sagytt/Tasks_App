import React from "react";
import { Toaster } from "react-hot-toast";
import Tasks from "./tasks/Tasks";

const App = () => {
    return (
        <>
            <div className="w-full h-screen bg-slate-200 px-5">
                <div className="max-w-7xl bg-red m-auto h-screen">
                    <Tasks />
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default App;
