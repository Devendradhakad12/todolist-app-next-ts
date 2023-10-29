import Home from '@/components/home'
import { DefaultSession } from 'next-auth'
import React from 'react'
const HomePageLayout = ({user}:{user:DefaultSession["user"]}) => {
  console.log(user)

  return (

    <Home />

  )
}

export default HomePageLayout
