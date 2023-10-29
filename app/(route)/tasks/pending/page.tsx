'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { InitialStateProps } from '@/redux/slice/todoSlice'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { UserDataProps } from '../all/page'
import { fetchTodo } from '@/redux/action/todoActions'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Loader from '@/components/loader'
import TaskCard from '@/components/task-card'

const PendingTaskPage = () => {
    const { data, status } = useSession()
    const [userData, setUserData] = useState<UserDataProps>()
    const dispatch = useAppDispatch()
    const {taskCompletion,tasks,fetching} = useAppSelector((state)=>state.todo)
    const [mytask, setMytask] = useState<InitialStateProps["tasks"]>()
    const today = new Date().toDateString();

    useEffect(()=>{
        setUserData(data?.user)
        if (userData?.id) fetchTodo({ userid: userData?.id, dispatch })
    },[data])

    useEffect(()=>{
        if(tasks.length >0){
            setMytask(tasks.filter((t) => t.checked === false))
        }
    },[tasks])

  return (
    <>
   
    <div className=" h-[100vh] bg">
      {/* Heading div */}
      <div className="md:pl-10 pl-[56px] pt-7">
        <h1 className=" font-bold text-[50px] md:w-[40%]  capitalize m-auto">
          Your <br /> Projects <br /> Pending ({mytask?.length})
        </h1>
      </div>

      {/* today - Date Div */}
      <div className="md:pl-10 pl-[56px] pt-7">
        <h2 className="text-[23px] md:w-[40%]  capitalize m-auto">
          <span className="text-[25px] font-bold">Today :</span> {today}
        </h2>
      </div>

      {/* ProgressBar Div */}
      <div className="p-10 md:w-[50%] w-[100%] flex justify-center m-auto">
        <div className="progressBarOutside flex relative">
          <div
            className={`progressBarInside bg-orange-500 text-slate-900 `}
            style={{
              width: `${taskCompletion}%`,
            }} 
          ></div>
          {taskCompletion ? (
            <div className="pl-3 absolute top-1 left-[40%] font-bold text-center">
              {fetching ? " Loading...." : <>{taskCompletion}% Done </>}
            </div>
          ) : (
            <div className="pl-3 absolute top-1 left-[40%] font-bold text-center">
              {fetching ? " Loading...." : <>0% Done </>}
            </div>
          )}
        </div>
      </div>

      {/* Pednding or completed task heading div */}
      <div className=" flex md:justify-center items-center gap-10 justify-between px-10 py-3">
        <Link className="md:hidden capitalize font-bold text-[22px]" href="/">
          <FontAwesomeIcon icon={faArrowLeftLong} /> Pending Task's
        </Link>
        <Link href="/tasks/all">See All</Link>
      </div>

      {/* Tasks */}
      <div className="bg ">
        {fetching? (
          <div className="flex justify-center">
            {" "}
            <Loader />
          </div>
        ) : (
          <TaskCard
            task={mytask!}
            completionState={"pending"}
          />
         
        )}
      </div>
    </div>
  </>
  )
}

export default PendingTaskPage
