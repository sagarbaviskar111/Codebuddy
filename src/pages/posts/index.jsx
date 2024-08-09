import { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://codebuddy.review/posts');
        if (response) {
          const data = await response.json();
          setPosts(data.data);
        } else {
          console.error('Failed to fetch posts:', response.status);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts)

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={post.avatar}
                  alt={`${post.firstName} ${post.lastName}`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">{post.firstName} {post.lastName}</h3>
                </div>
              </div>
              <div className="mb-4">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <p className="text-gray-700">{post.writeup}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;


