import React, { useEffect, useState } from 'react';
import HtmlRenderer from '../../components/Comps/HtmlRenderer';


export default function index({ postId }) {
    const [post, setPost] = useState(null);
    useEffect(() => {
        // Fetch blog post data from the API route
        fetch(`/api/posts/${postId}`)
          .then(response => response.json())
          .then(data => setPost(data))
          .catch(error => console.error('Error fetching blog post:', error));
      }, [postId]);
    
      if (!post) {
        return <div>Loading...</div>;
      }
  return (
    <div className="blog-post">
    <h1>{post.title}</h1>
    <HtmlRenderer htmlContent={post.content} />
  </div>
  )
}
