// pages/api/posts/[postId].js

export default function handler(req, res) {
    // Fetch blog post data based on postId from your data source (e.g., database)
    const post = {
      title: "Sample Blog Post",
      content: "<p style='color: blue;'>This is a sample blog post with <b style='font-style: italic'>formatted</b> text.</p>"
    };
    res.status(200).json(post);
  }