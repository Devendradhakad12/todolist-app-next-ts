'use client'

import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { InitialStateProps } from '@/redux/slice/todoSlice';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { tree } from 'next/dist/build/templates/app-page';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { UserDataProps } from '../../tasks/all/page';
import { fetchTodo } from '@/redux/action/todoActions';

const EditTask = ({ params }: { params: { taskid: string } }) => {
    const { data, status } = useSession()
    const router = useRouter()
    const [userData, setUserData] = useState<UserDataProps>()
    const { tasks } = useAppSelector((state) => state.todo)
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false)
    const [currentTask, setCurrentTask] = useState<InitialStateProps["tasks"]>([])
   
   // console.log(currentTask)
    useEffect(() => {
        if (!data?.user) return router.push("/")
        setUserData(data?.user)
        setCurrentTask(tasks.filter((t) => {
            return t._id === params.taskid;
        }))
        if (currentTask[0]?.title !== undefined && currentTask[0]?.title !== null){
            setTitle(currentTask[0]?.title)
            setDescription(currentTask[0]?.description!);
        }
           
    }, [data, status, router, tasks, dispatch, userData?.id,params.taskid]);

    async function reFetch() {
        setUserData(data?.user)
        if (userData?.id) {
            const bool = await fetchTodo({ userid: userData?.id, dispatch })
            if (bool) return true
        }
    }


    const hnadleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        try {
            await axios.patch(`/api/task/${currentTask[0]._id}/${userData?.id}`, {
                title, description
            });

            toast.success("Task updated")
            const bool = await reFetch()
            if (bool) return router.push("/tasks/all")

        } catch (error) {
            toast.error("Something went Wrong")
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <>

            <div className="mainDiv">
                <div className="loginDiv">
                    <h1 className="loginH1">Add Your Task</h1>
                    <form className="loginForm py-10" onSubmit={hnadleSubmit}>
                        <Input
                            type="text"
                            placeholder="Task Title"
                            className="formInput"
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            value={title}
                        />
                        <Textarea
                            rows={1}
                            placeholder="Task Description"
                            className="formInput"
                            required
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                            value={description}
                        />

                        <button type="submit" className="lsBtn">
                            {loading ? "Submit..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default EditTask
