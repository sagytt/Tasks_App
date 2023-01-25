import React, { useState } from "react";
import format from "date-fns/format";
import DatePicker from "react-datepicker";
import { HiOutlineXMark } from "react-icons/hi2";

const Filter = ({ setFilterQuery, onFilter, filterQuery }) => {
    return (
        <div className="w-4/5">
            <h3 className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Filter by Date or Status
            </h3>
            <form
                className="flex gap-3"
                onSubmit={(e) => {
                    e.preventDefault();
                    onFilter();
                }}
            >
                <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[45%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={filterQuery.status}
                    onChange={(e) =>
                        setFilterQuery((prev) => {
                            return { ...prev, status: e.target.value };
                        })
                    }
                >
                    <option disabled value="">
                        Choose Status
                    </option>
                    <option value="">All</option>
                    <option value="1">Completed</option>
                    <option value="0">In progress</option>
                </select>
                <div className="w-[45%] relative">
                    <DatePicker
                        selected={
                            filterQuery.date
                                ? new Date(filterQuery.date)
                                : false
                        }
                        onChange={(date) => {
                            setFilterQuery((prev) => {
                                return {
                                    ...prev,
                                    date: format(date, "yyyy/MM/dd"),
                                };
                            });
                        }}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Click to select a date"
                    />

                    {filterQuery.date && (
                        <HiOutlineXMark
                            className="absolute top-[10px] w-6 h-6 right-[7px] cursor-pointer hover:text-red-500"
                            onClick={() => {
                                setFilterQuery((prev) => {
                                    return {
                                        ...prev,
                                        date: "",
                                    };
                                });
                            }}
                        />
                    )}
                </div>
                <button className="px-8 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
                    Filter
                </button>
            </form>
        </div>
    );
};

export default Filter;
