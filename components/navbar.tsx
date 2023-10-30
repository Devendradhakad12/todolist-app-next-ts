'use client'

import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import toast from "react-hot-toast";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { ClientSafeProvider, LiteralUnion, getProviders, signIn, signOut, useSession } from "next-auth/react";
import { BuiltInProviderType, BuiltInProviders } from "next-auth/providers/index";
import Loading from "@/app/loading";
import Image from "next/image";
const Nav = () => {
    const { data} = useSession()
    const email = data?.user?.email
    const username = data?.user?.name
    const userimage = data?.user?.image
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null>(null);
 
    useEffect(() => {
        const setUpOfProvider = async () => {
            const res = await getProviders()
            setProviders(res)
        }
        setUpOfProvider();
    }, [])

    const handleLogout = () => {
        signOut()
        toast.success("You LoggedOut");
        return redirect("/")
    };
    const [toggle, setToggle] = useState(false);


    return (
        <div className=" bg-slate-900 text-white flex justify-between">
            <div className="px-5 py-3 flex gap-4 sm:ml-[30px]">
                <div>
                    <Image
                        src={userimage ? userimage : "https://i.pinimg.com/736x/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg"}
                        alt="img"
                        className=" w-[50px] h-[50px] object-cover rounded-full "
                    />
                </div>
                <div className="flex justify-center items-center">
                    <h2 className="text-[25px] font-bold capitalize leading-5 gap-7">
                        {username ? username : "Login First"}
                    </h2>
                </div>
            </div>

            <div className="px-10 py-3 flex justify-center items-center">
                <div className="gap-10 sm:flex hidden mr-[50px] font-semibold text-[18px]">
                    <Link href="/">Home </Link>
                    <Link href="/addtask">Add Task </Link>
                    {email ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <button onClick={() => signIn(providers?.google.id)}>Login</button>
                        </>
                    )}
                </div>

                {/* navigation for small devices */}
                <div className="sm:hidden flex mr-[5px] ">
                    {toggle ? (
                        <button className=" text-[28px]" onClick={() => setToggle(!toggle)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    ) : (
                        <button onClick={() => setToggle(!toggle)} className=" text-[28px]">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    )}

                    <div
                        className={`${toggle ? "flex" : "hidden"
                            } absolute top-[74px] right-[2px]`}
                    >
                        <ul className="flex flex-col bg-slate-800 py-10 pr-10 pl-5 text-white rounded-xl  border-2  border-orange-300">
                            <li className=" mx-3 text-lg leading-9">
                                <Link
                                    href={"/"}
                                    className=" cursor-pointer"
                                    onClick={() => {
                                        setToggle(!toggle);
                                    }}
                                >
                                    Home
                                </Link>
                            </li>


                            <li className=" mx-3 text-lg leading-9">
                                <Link
                                    href={"/addtask"}
                                    className=" cursor-pointer"
                                    onClick={() => {
                                        setToggle(!toggle);
                                    }}
                                >
                                    Add Task
                                </Link>
                            </li>
                            {!email ? (
                                <li className=" mx-3 text-lg leading-9">
                                    <button
                                        className=" cursor-pointer"
                                        onClick={() => {
                                            setToggle(!toggle);
                                            signIn(providers?.google.id)
                                        }}
                                    >
                                        Login
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li className="mx-3 text-lg leading-9">
                                        <Link href="/tasks/all">All Task</Link>
                                    </li>
                                    <li className="mx-3 text-lg leading-9">
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nav;
