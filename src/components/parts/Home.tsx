import Header from '../view/Header';
import Footer from '../view/Footer';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BlogType } from './BlogList';
import { RelstionshipsType, UserType } from './UserList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Home = () => {
  const [myBlogs, setMyBlogs] = useState<BlogType[]>([]);
  const [myProfile, setMyProfile] = useState<UserType[]>([]);
  const [myUserId, setMyUserId] = useState<string>("");
  const [myName, setMyName] = useState<string>("");
  const [startedDate, setStartedDate] = useState([]);
  const [following, setFollowing] = useState<RelstionshipsType[]>([]);
  const [follower, setFollower] = useState<RelstionshipsType[]>([]);
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
      const followingRel = response.data.relFollowingResult;
      const followerRel = response.data.relFollowerResult;

      let startedDate = myProfile[0].created_at;
      startedDate = startedDate.split("T");
      startedDate = startedDate[0].split("-");

      setStartedDate(startedDate);
      setMyBlogs(myBlogs);
      setMyProfile(myProfile);
      setFollowing(followingRel);
      setFollower(followerRel);
      setMyName(myProfile[0].name);
      setMyUserId(myProfile[0].id);
    });
}, []);

  // return (
  //   <div>
  //     {!getToken ? (
  //       <div className="404">
  //         <h1>ERROR</h1>
  //         <h2>Please SignIn again</h2>
  //         <Link to={"/"}>
  //           {"Signin again"}
  //         </Link>
  //       </div>
  //     ) : (
  //       <>
  //         <div className="header">
  //           <Header />
  //         </div>
  //         <div className="bloglist">
  //           {/* タイトル */}
  //           <nav className="navbar">
  //             <h1>MyBlogs</h1>
  //             <div className="links">
  //               <a href={`/create/${myUserId}`}>New Blog</a>
  //             </div>
  //           </nav>
  //           <div className="blog-list">
  //             <div className="blogs">
  //               {myBlogs.map((blog) => (
  //                 <div className="blog-preview" key={blog.id} >
  //                   <p className="author">投稿者 : {userName}</p>
  //                   <h4>{blog.content}</h4>
  //                   <span style={{ display: "flex" }}>
  //                     {/* 絶対良くないやり方 */}
  //                     <div className="表示させない" style={{ fontSize: 0 }}>
  //                       {createdDate = blog.created_at.split("T")}
  //                       {createdTime = createdDate[1].split(".")}
  //                       {createdDate = createdDate[0].split("-")}
  //                     </div>
  //                     <p className="user-date">投稿日時 : {createdDate[0]}/{createdDate[1]}/{createdDate[2]} {createdTime[0]}</p>
  //                     <button className="button" onClick={() => deleteBlog(blog.id)}>
  //                       delete
  //                     </button>
  //                   </span>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //         <div className="header">
  //           <Footer />
  //         </div>
  //       </>
  //     )}
  //   </div>
  // )
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="bloglist">
        <nav className="user-navbar" style={{display:"flex"}}>
          <h1>{myName}</h1>
          <div className="links" style={{marginLeft: "auto"}}>
            <a href={`/create/${myUserId}`}>New Blog</a>
          </div>
        </nav>
        <div className="date">
          <h4>利用開始日:{startedDate[0]}年{startedDate[1]}月{startedDate[2]}日</h4>
        </div>
        <div className="user-info">
          <div className="flw-left">
            <h3>{follower.length}<br />Followings</h3>
            <div className="flw-container">
              <ul className="flw-list">
                {follower.map((user) => (
                  <li className="flw-list-item" key={user.id}>
                    <div className="flw-flex">
                      <AccountCircleIcon style={{ fontSize: 50, color: "gray", marginLeft: "5px" }} />
                      <Link to={`/user/${user.id}`}>
                        <h4>{user.name}</h4>
                      </Link>
                      {/* 絶対良くないやり方
                  <div className="表示させない" style={{ fontSize: 0 }}>
                    {startedDate = user.created_at.split("T")}
                    {startedDate = startedDate[0].split("-")}
                  </div>
                  <p>
                    {`${startedDate[0]}年${startedDate[1]}月から利用しています`}
                  </p>
                  {user.id !== `${myUserId}` &&
                    <button onClick={() => { handleClickFollow(user.id) }}>
                      {(() => {
                        for (let i = 0; i < rel.length; i++) {
                          if(rel[i].following_id === user.id) {
                            return "UN"
                          } else {
                            continue;
                          }
                        }
                      })()}
                      FOLLOW
                    </button>
                  } */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flw-right">
            <h3>{following.length}<br />Followers</h3>
            <div className="flw-container">
              <ul className="flw-list">
                {following.map((user) => (
                  <li className="flw-list-item" key={user.id}>
                    <div className="flw-flex">
                      <AccountCircleIcon style={{ fontSize: 50, color: "gray", marginLeft: "5px" }} />
                      <Link to={`/user/${user.id}`}>
                        <h4>{user.name}</h4>
                      </Link>
                      {/* 絶対良くないやり方
                  <div className="表示させない" style={{ fontSize: 0 }}>
                    {startedDate = user.created_at.split("T")}
                    {startedDate = startedDate[0].split("-")}
                  </div>
                  <p>
                    {`${startedDate[0]}年${startedDate[1]}月から利用しています`}
                  </p>
                  {user.id !== `${myUserId}` &&
                    <button onClick={() => { handleClickFollow(user.id) }}>
                      {(() => {
                        for (let i = 0; i < rel.length; i++) {
                          if(rel[i].following_id === user.id) {
                            return "UN"
                          } else {
                            continue;
                          }
                        }
                      })()}
                      FOLLOW
                    </button>
                  } */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="user-blog-list">
          <h3>{myBlogs.length}<br />Blogs</h3>
          <div className="user-blogs">
            {myBlogs.map((blog) => (
              <div className="user-blog-preview" key={blog.id} >
                <p className="user-author">投稿者 : {myName}</p>
                <h4>{blog.content}</h4>
                <span style={{ display: "flex" }}>
                  <div className="表示させない" style={{ fontSize: 0 }}>
                    {createdDate = myBlogs[0].created_at.split("T")}
                    {createdTime = createdDate[1].split(".")}
                    {createdDate = createdDate[0].split("-")}
                  </div>
                  <p className="user-date">投稿日時 : {createdDate[0]}/{createdDate[1]}/{createdDate[2]} {createdTime[0]}</p>
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

export default Home;