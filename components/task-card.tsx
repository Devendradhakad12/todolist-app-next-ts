import { InitialStateProps } from '@/redux/slice/todoSlice'
import React from 'react'


interface TaskCardProps {
    task:InitialStateProps["tasks"];
    completionState:"pending" | "completed";
}

const TaskCard = ({task,completionState}:TaskCardProps) => {
   
  return (
    <>

{task?.length ? (
        <div className="bg flex gap-4 sm:gap-[40px] justify-center items-center flex-wrap py-5">
          {task?.map((t) => {
            return (
              <div className="homeTaskBox bg-slate-800 text-white relative" key={t._id}>
                <div className="flex flex-col justify-center gap-5 px-3">
                  <div>
                   <h1 className=" capitalize text-[24px] font-semibold text-center">{completionState === "pending" ? <>❎</>: <>✅</>}</h1>
                  </div>{" "}
                  <div className=' text-center'>
                    <h2 className=" font-semibold text-[20px] capitalize">{t.title}</h2>
                    <p>{t.description}</p>
                  </div>
                </div>
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
      ) : (
        <div className="flex justify-center">
             <p className=" capitalize">  <>  Task Not Available  </>   </p>
        </div>
      )}
      
    </>
  )
}

export default TaskCard
