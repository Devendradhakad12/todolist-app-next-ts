'use client'

import Loading from "@/app/loading";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const AddTaskPage = () => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { data, status } = useSession();
    const router = useRouter()

    if (status === "loading") return <Loading />

    const hnadleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`/api/task/new`, {
                title,
                description,
                user: data?.user
            });
            console.log(res)
            toast.success("Task created")
            setTitle("")
            setDescription("")
            return router.push("/task/all")

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        } finally {
            setLoading(false);


        }
    };

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
    );
};

export default AddTaskPage;
