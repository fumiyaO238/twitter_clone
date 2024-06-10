import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { UserType } from "./UserList";
import { BlogType } from "./BlogList";
import Header from "../view/Header";
import axios from "axios";
import Footer from "../view/Footer";
import "../styles/styleIndividualUserPage.css";

const User = () => {
  const [myBlogs, setMyBlogs] = useState<BlogType[]>([]);
  const [myProfile, setMyProfile] = useState<UserType[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const location = useLocation();

  const pn = location.pathname;
  const prm = pn.split("/");
  const checkUserId = prm[2]  

  // ブログの削除
  const deleteBlog = async (id: number) => {
    // console.log(id)

    await axios
      .delete("http://localhost:3333/delete", {
        data: { id }
      })
      .then((response) => {
        console.log(response);
        const newBlogs = myBlogs.filter((blog) => blog.id !== id);
        setMyBlogs(newBlogs);
      })
      .catch((e) => {
        console.log(e.message);
        setMyBlogs(myBlogs);
      })
  }

  // getリクエスト
  useEffect(() => {
    axios.get("http://localhost:3333/another_blogs",
      {
        headers: {
          Authorization : `Bearer ${checkUserId}`
        }
      }
    )
      .then((response) => {
        const myBlogs = response.data.blogResult;
        const myProfile = response.data.userResult;
        setMyBlogs(myBlogs);
        setMyProfile(myProfile)
        setUserName(myProfile[0].name);
        setUserId(myProfile[0].id);
      });
  }, []);

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="bloglist">
        {/* タイトル */}
        <nav className="user-navbar">
          <h1>{userName}</h1>
          {/* <div className="links">
            <a href={`/create/${userId}`}>New Blog</a>
          </div> */}
        </nav>
        <div className="user-blog-list">
          <div className="user-blogs">
            {myBlogs.map((blog) => (
              <div className="user-blog-preview" key={blog.id} >
                <p className="user-author">投稿者 : {userName}</p>
                <h4>{blog.content}</h4>
                <span style={{ display: "flex" }}>
                  <p className="user-date">投稿日時 : {blog.created_at}</p>
                  {/* <button className="button" onClick={() => deleteBlog(blog.id)}>
                    delete
                  </button> */}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="header">
        <Footer />
      </div>
    </div>
  )
}

export default User;