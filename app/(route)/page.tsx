'use client'
import { fetchTodo } from '@/redux/action/todoActions'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loading from '../loading'
import { UserDataProps } from './tasks/all/page'
 



const HomePageLayout = () => {
  const { data, status } = useSession()
  const [userData, setUserData] = useState<UserDataProps>()
  const { taskCompletion, tasks, fetching } = useAppSelector((state) => state.todo)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setUserData(data?.user)
    if (userData?.id) fetchTodo({userid:userData?.id,dispatch})
  }, [data,dispatch,userData?.id])

 /*  if (status === "loading") return <Loading /> */
  return (

    <>
      <div className="h-full bg">
        {/* Heading Div */}
        <div className="md:pl-10 pl-[56px] pt-7 pb-6">
          <h1 className=" font-bold text-[50px] md:w-[40%]  m-auto">
            Your <br /> Projects ({tasks?.length > 0 ? tasks?.length : 0})
          </h1>
        </div>

        {/* Add task button */}
        <div className="flex justify-center items-center">
          <Link href="/addtask" className="btn">
            Add Task
          </Link>
        </div>

        {/* progress bar */}
        <div className="pt-10 md:w-[60%] w-[80%] flex justify-center m-auto">
          <div className="progressBarOutside flex relative">
            <div
              className={`progressBarInside bg-green-700 text-slate-900 `}
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


        {/* Task completed and pending box */}

        <div className="flex gap-4 md:gap-[100px] justify-center items-center flex-wrap py-12">
          {/* All Task box */}
          <div className="homeTaskCompletedBox text-white bg-slate-900">
            <div>
              <Link
                href="/tasks/all"
                className=" font-bold text-[35px] cursor-pointer"
              >
                All
                <br /> Task <FontAwesomeIcon icon={faArrowRightLong} />
              </Link>
            </div>
          </div>

          {/* Task Pending box */}
          <div className="homeTaskCompletedBox bg-slate-600 text-white">
            <div>
              <Link
                href="/tasks/pending"
                className=" font-bold text-[35px] cursor-pointer"
              >
                Task <br /> Pending <FontAwesomeIcon icon={faArrowRightLong} />
              </Link>
            </div>
          </div>

          {/* Task pending Box */}
          <div className="homeTaskCompletedBox bg-sky-900 text-white">
            <div>
              <Link
                href="/tasks/completed"
                className=" font-bold text-[35px] cursor-pointer"
              >
                Task <br /> Completed{"  "}
                <FontAwesomeIcon icon={faArrowRightLong} />
              </Link>
            </div>
          </div>

        </div>



      </div>
    </>

  )
}

export default HomePageLayout
