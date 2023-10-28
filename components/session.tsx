"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const session = () => {
    const {data,status} = useSession()
  return  {
    data,status
  }
}

export default session
