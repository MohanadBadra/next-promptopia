'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  
  const filterPrompts = (search)=> {
    const filtered = allPosts.filter(
      (e) => e.prompt.toLowerCase().includes(search.toLowerCase())
      || e.creator.username.toLowerCase().includes(search.toLowerCase())
      || e.creator.email.toLowerCase().includes(search.toLowerCase())
      || e.tag.toLowerCase().includes(search.toLowerCase())
      )

    setPosts(filtered);
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)

    filterPrompts(searchText)
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);

    filterPrompts(searchText);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className="relative w-full flex-center" action='#'>
        <input type="text"
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        onClick={handleSearchChange}
        handleTagClick={handleTagClick}
        required
        className='search_input peer'
        />
      </form>
      
      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed
