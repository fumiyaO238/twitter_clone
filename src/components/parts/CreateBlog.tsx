import { useEffect, useState } from "react"
import Footer from "../view/Footer"
import Header from "../view/Header"
import "../styles/stylecreateBlog.css"
import axios from "axios"
import { UserType } from "./UserList"

const CreateBlog = () => {
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [myUserId, setMyUserId] = useState<string>("");
  const [myProfile, setMyProfile] = useState<UserType[]>([]);

  // user情報取得
  useEffect(() => {
    const token = localStorage.getItem("keyToken")
    axios.get("http://localhost:3333/my-blogs",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((response) => {
      const myProfile = response.data.userResult;
      setMyProfile(myProfile);
      setMyUserId(myProfile[0].id);
      setAuthor(myProfile[0].name);
    });
}, []);

  // ブログ追加
  const handleSubmit = () => {
    axios.post("http://localhost:3333/add",
      {
        userId: myUserId,
        content: content
      }
    )
    .then((response) => {
      const newBlog = response.data.newBlog;
      console.log(newBlog)
    })
    .catch((error) => {
      console.log("ログイン失敗")
      alert(error.response.data.message);
    })
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
          <input type="text" value={author} readOnly />
          <button>Add Blog</button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default CreateBlog;