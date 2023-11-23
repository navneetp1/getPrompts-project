"use client"

import Profile from "@components/Profile";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function UserProfile( { params } ){

  const searchParams = useSearchParams()
  const username = searchParams.get('name')
  console.log(params)

  const [userPost, setUserPost] = useState([])

  useEffect(() => {
    const fetchPosts = async() => {

      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()

      setUserPost(data)
    }

    if(params?.id) fetchPosts()
  }, [params.id])


  return (

    <Profile 
      name={username}
      desc={`Welcome to ${username}'s profile. Explore ${username}'s wonderful prompts and be inspired to create your own prompts`}
      data={userPost}
    />

  )
}