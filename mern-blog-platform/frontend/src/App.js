import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Optional: For styling

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch blogs on load
  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/blogs', { title, content })
      .then(res => {
        setBlogs([...blogs, res.data]);
        setTitle('');
        setContent('');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <h1>Personal Blog Platform</h1>

      {/* Blog Creation Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Publish Blog</button>
      </form>

      {/* Blog List */}
      <h2>Latest Posts</h2>
      {blogs.length === 0 ? (
        <p>No blogs yet. Be the first to post!</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} className="blog-post">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <small>{new Date(blog.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default App;