import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePosts from './pages/CreatePosts';
import EditPosts from './pages/EditPosts';
import { Link } from 'react-router-dom';
import { supabase } from './client';

const App = () => {
  const [posts, setPosts] =  useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from('RecipePosts').select();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  

  let element = useRoutes([
    {
      path: '/',
      element: <ReadPosts data={posts} />
    },
    {
      path: '/edit/:id',
      element: <EditPosts data={posts} />
    },
    {
      path: '/new',
      element: <CreatePosts />
    }
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>Create recipes to share with the world and view other recipes!</h1>
        <Link to="/">
          <button className="headerBtn"> View Recipes Made </button>
        </Link>
        <Link to="/new">
          <button className="headerBtn"> Create New Recipe </button>
        </Link>
      </div>
      {element}
    </div>
  );
}

export default App;
