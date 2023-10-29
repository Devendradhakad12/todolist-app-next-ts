"use client"
import Loading from '@/app/loading'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'


const Home = async () => {
  const { data, status } = useSession()

  if (status === "loading") return <Loading />

/*   useEffect(() => {
    async function getTask() {
      const res = await axios.get(`/api/task/all/${data?.user?.id}`)
      console.log(res)
    }
   if(data?.user)  getTask()
  }, []) */

  return (
    <div>
      home
    </div>
  )
}

export default Home

