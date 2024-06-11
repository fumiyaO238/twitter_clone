import Header from '../view/Header';
import Footer from '../view/Footer';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BlogType } from './BlogList';
import { UserType } from './UserList';

const Home = () => {
  const [myBlogs, setMyBlogs] = useState<BlogType[]>([]);
  const [myProfile, setMyProfile] = useState<UserType[]>([]);
  const [myUserId, setMyUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const getToken = localStorage.getItem("keyToken");
  let createdDate = [];
  let createdTime = [];

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
    const token = localStorage.getItem("keyToken")
    axios.get("http://localhost:3333/my-blogs",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        const myBlogs = response.data.blogResult;
        const myProfile = response.data.userResult;
        setMyBlogs(myBlogs);
        setMyProfile(myProfile)
        setMyUserId(myProfile[0].id);
        setUserName(myProfile[0].name);
      });

  }, []);

  return (
    <div>
      {!getToken ? (
        <div className="404">
          <h1>ERROR</h1>
          <h2>Please SignIn again</h2>
          <Link to={"/"}>
            {"Signin again"}
          </Link>
        </div>
      ) : (
        <>
          <div className="header">
            <Header />
          </div>
          <div className="bloglist">
            {/* タイトル */}
            <nav className="navbar">
              <h1>MyBlogs</h1>
              <div className="links">
                <a href={`/create/${myUserId}`}>New Blog</a>
              </div>
            </nav>
            <div className="blog-list">
              <div className="blogs">
                {myBlogs.map((blog) => (
                  <div className="blog-preview" key={blog.id} >
                    <p className="author">投稿者 : {userName}</p>
                    <h4>{blog.content}</h4>
                    <span style={{ display: "flex" }}>
                      {/* 絶対良くないやり方 */}
                      <div className="表示させない" style={{ fontSize: 0 }}>
                        {createdDate = blog.created_at.split("T")}
                        {createdTime = createdDate[1].split(".")}
                        {createdDate = createdDate[0].split("-")}
                      </div>
                      <p className="user-date">投稿日時 : {createdDate[0]}/{createdDate[1]}/{createdDate[2]} {createdTime[0]}</p>
                      <button className="button" onClick={() => deleteBlog(blog.id)}>
                        delete
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="header">
            <Footer />
          </div>
        </>
      )}
    </div>
  )
}

export default Home;