'use client'

import { useState, useEffect } from "react"

import {  useSearchParams, useRouter } from 'next/navigation'

import Form from '@components/Form'

export default function EditPrompt() {

  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  useEffect(()=> {
    const getPromptDetails = async() => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if(promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e) => {
      e.preventDefault();
      setSubmitting(true);

      if(!promptId) return alert('Missing Prompt ID')

      try{

        const response = await fetch(`/api/prompt/${promptId}` , {
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag
          })
        })

        //if response is successful then, go to home page

        if(response.ok){
          router.push('/')
        }


      }catch(error){
        console.log(error)
      }finally{
        setSubmitting(false)
      }
  }

  
  return (
    <Form 
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />
  )
}
