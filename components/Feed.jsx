'use client'

import {useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ( {data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'> 
    {
      data.map((post) => (
        <PromptCard 
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))
    }
    </div>
  )
}


export default function Feed() {

  const [posts, setPosts] = useState([])

  //Search bad
  const [searchText, setSearchText] = useState("")
  const [searchTimeOut, setSearchTimeOut] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  
  const fetchPosts = async() => {
    const response = await fetch('/api/prompt')
    const data = await response.json()

    setPosts(data)
  }
 

  useEffect(()=> {
      
        fetchPosts()

  }, [])

  function filteredPrompts(searchtext){
    const regEx = new RegExp(searchtext, "i") // i - means case-insesnstitive search

    return posts.filter((a) => regEx.test(a.creator.username) || regEx.test(a.tag) || regEx.test(a.prompt))
  }


  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut)
    setSearchText(e.target.value)
    
    //adding some delay during search
    setSearchTimeOut(
      setTimeout(() => {
        const searchResults = filteredPrompts(e.target.value)
        setSearchResults(searchResults)
      }, 600)
  )
}

  const handleTagClick = (tagTitle) => {
    setSearchText(tagTitle)

    const searchResults = filteredPrompts(tagTitle)
    setSearchResults(searchResults)
  }


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
         type="text"
         placeholder='search for tag/username'
         value={searchText}
         onChange={handleSearchChange}
         required
         className='search_input peer'/>
      </form>


      { searchText ? (

            <PromptCardList 
            data = {searchResults}
            handleTagClick={handleTagClick}/>
          ) :
            (
            <PromptCardList 
            data = {posts}
            handleTagClick={handleTagClick}/>
          )
      
      }
    </section>
  )
}
