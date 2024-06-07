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
  const [userName, setUserName] = useState<string>("");

  const getToken = localStorage.getItem("keyToken");

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
    setTimeout(() => {
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
          setUserName(myProfile[0].name);
        });
    }, 1000);
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
              <h1>MyBlogList</h1>
              <div className="links">
                <a href="/create">New Blog</a>
              </div>
            </nav>
            <div className="blog-list">
              <div className="blogs">
                {myBlogs.map((blog) => (
                  <div className="blog-preview" key={blog.id} >
                    <p className="author">投稿者 : {userName}</p>
                    <h4>{blog.content}</h4>
                    <span style={{ display: "flex" }}>
                      <p className="date">投稿日時 : {blog.created_at}</p>
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