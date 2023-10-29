"use client"
import Loading from '@/app/loading'
import { useSession } from 'next-auth/react'
import React from 'react'


const Home = () => {
  const { data, status } = useSession()

  if (status === "loading") return <Loading />

  return (
    <div>
      home
    </div>
  )
}

export default Home

