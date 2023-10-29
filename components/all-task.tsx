import Loading from '@/app/loading';
import { fetchTodo } from '@/redux/action/todoActions';
import { useAppDispatch } from '@/redux/hooks';
import { InitialStateProps } from '@/redux/slice/todoSlice';
import axios from 'axios';
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loader from './loader';

interface AllTaskProps {
    task: InitialStateProps["tasks"];
    loading: boolean,
    error?: string;
    location: string,
    userid: string | undefined
    reFetch: () => void

}

const AllTask = ({ task, loading, location, userid, reFetch }: AllTaskProps) => {

    const [allTasks, setAllTasks] = useState<InitialStateProps["tasks"]>([]);
    const [reload, setReload] = useState(false)
    const [currentTask, setCurrentTask] = useState<string | null>(null);
    const dispatch = useAppDispatch()
    const [error, setError] = useState(false)


    useLayoutEffect(() => {
        if (task.length) {
            setAllTasks(task);
            setCurrentTask(null);
        }
        setReload(false)
    }, [reload, task])


    // check task (update check status)
    const handleChange = async ({ id, check }: { id: string, check: boolean }) => {
        setCurrentTask(id);
        try {
             await axios.patch(`/api/task/${id}/${userid}`, {
                checked: !check,
            });
            setReload(true);
            reFetch()
            if (!reload) toast.success("Task Updated");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setCurrentTask(null);
        }
    };


    // delete task
    const handleDelete = async (id: string) => {
        const checkTask = task.find(({ _id }) => _id === id)
        if (!checkTask?.checked) return toast.error("Task Not Completed")
        setCurrentTask(id);
        try {
            await axios.delete(`/api/task/${id}/${userid}`);
            setReload(true);
            reFetch()
            if (!reload) toast.success("Task Deleted");
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            setCurrentTask(null);
        }
    };

    // handle search
    const [searchInp, setSearchInp] = useState("");
    const handleSearch = (e: string) => {
        let regexp = new RegExp(e, "i");
        let searcht = task?.filter((t) => {
            return regexp.test(t?.title!) || regexp.test(t?.description!);
        });
        setAllTasks(searcht);
    };
    useEffect(() => {
        setTimeout(() => {
            handleSearch(searchInp);
        }, 1500)
    }, [searchInp]);

    return (
        <>
            <div className="pb-10 flex justify-center ">
                <input
                    type="text"
                    value={searchInp}
                    onChange={(e) => {
                        setSearchInp(e.target.value);
                    }}
                    className="px-4 py-1 rounded-lg outline-none "
                    placeholder="Search Task.."
                />
            </div>
            {allTasks.length ? (
                <>
                    <div className="bg flex gap-5 sm:gap-[40px] justify-center items-center flex-wrap py-1">
                        {allTasks?.map((t) => {
                            return (
                                <div className="homeTaskBox bg-slate-700 text-white relative" key={t?._id}>
                                    <div className="flex justify-center gap-5 px-5">
                                        <div>
                                            <h2 className=" font-semibold text-[20px] capitalize text-center">
                                                {t.title}
                                            </h2>
                                            <p className="">{t.description}</p>
                                        </div>
                                    </div>

                                    {/* task update and delete buttons */}
                                    <div className="absolute bottom-10 flex gap-4">
                                        <Link
                                            href={`/edittask/${t._id}`}
                                            className="bg-blue-600 text-white edbtn"
                                        >
                                            Edit
                                        </Link>
                                        {currentTask === t._id ? (
                                            <Loader />
                                        ) : (
                                            <input
                                                type="checkbox"
                                                className=" w-[30px] h-[30px] cursor-pointer"
                                                checked={t.checked}
                                                onChange={(e) => {
                                                    handleChange({ id: t._id, check: t.checked });
                                                }}
                                            />
                                        )}
                                        <button
                                            onClick={() => {
                                                handleDelete(t._id);
                                            }}
                                            className="bg-red-600 text-white edbtn"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    {/* task created date */}
                                    <div className="absolute bottom-2">
                                        <p className="text-[16px]">
                                            <span className="font-bold">Created Date:</span>{" "}
                                            {new Date(t?.createdAt).toDateString()}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="flex justify-center">
                    <p className=" capitalize">
                        {error ? <> {error} </> : <> {location} Task Not Available </>}
                    </p>
                </div>
            )}
        </>
    )
}

export default AllTask
