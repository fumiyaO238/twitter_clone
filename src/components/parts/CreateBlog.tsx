import { useState } from "react"
import Footer from "../view/Footer"
import Header from "../view/Header"
import "../styles/stylecreateBlog.css"

const CreateBlog = () => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const blog = { content, author }
  }

  return (
    <div>
      <Header />
      <div className="create">
        <nav className="user-navbar">
          <h1>Add a New Blog</h1>
        </nav>
        <form onSubmit={handleSubmit}>
          <label>Content:</label>
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} />
          <label>YourName:</label>
          <input type="text" required value="Author" />
          <button>Add Blog</button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default CreateBlog;