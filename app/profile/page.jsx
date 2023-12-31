"use client"

import {useState, useEffect, Profiler } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'

import Profile from '@components/Profile'

export default function MyProfile() {

  const {data: session} = useSession()

  const router = useRouter()
  const [posts, setPosts] = useState([])


  useEffect(()=> {
    const fetchPosts = async() => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()

      setPosts(data)
    }

    if(session?.user.id){
      fetchPosts()
    }


    }, [])


  function handleEdit(post){
    router.push(`/update-prompt?id=${post._id}`)
  }

  async function handleDelete(post){
    const finalConfirm = confirm("Are you sure you want to delete this prompt?")

    if(finalConfirm){
      try{  
          console.log(post[0]._id)
        await fetch(`/api/prompt/${post[0]._id}`, {
          method: 'DELETE'
        })

        const filteredPosts = posts.filter((p) => p._id != post[0]._id)

        setPosts(filteredPosts)

      }catch(error){
        console.log(error)
      }
    }
  }


  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}
