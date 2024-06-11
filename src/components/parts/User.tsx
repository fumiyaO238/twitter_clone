import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { RelstionshipsType, UserType } from "./UserList";
import { BlogType } from "./BlogList";
import Header from "../view/Header";
import axios from "axios";
import Footer from "../view/Footer";
import "../styles/styleIndividualUserPage.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const User = () => {
  const [userBlogs, setuserBlogs] = useState<BlogType[]>([]);
  const [userProfile, setuserProfile] = useState<UserType[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [startedDate, setStartedDate] = useState([]);
  const [following, setFollowing] = useState<RelstionshipsType[]>([]);
  const [follower, setFollower] = useState<RelstionshipsType[]>([]);
  const location = useLocation();
  const pn = location.pathname;
  const prm = pn.split("/");
  const checkUserId = prm[2];
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
        const newBlogs = userBlogs.filter((blog) => blog.id !== id);
        setuserBlogs(newBlogs);
      })
      .catch((e) => {
        console.log(e.message);
        setuserBlogs(userBlogs);
      })
  }

  // getリクエスト
  useEffect(() => {
    axios.get("http://localhost:3333/another_blogs",
      {
        headers: {
          Authorization: `Bearer ${checkUserId}`
        }
      }
    )
      .then((response) => {
        const userBlogs = response.data.blogResult;
        const userProfile = response.data.userResult;
        const followingRel = response.data.relFollowingResult;
        const followerRel = response.data.relFollowerResult;

        let startedDate = userProfile[0].created_at;
        startedDate = startedDate.split("T");
        startedDate = startedDate[0].split("-");

        setStartedDate(startedDate);
        setuserBlogs(userBlogs);
        setuserProfile(userProfile);
        setFollowing(followingRel);
        setFollower(followerRel);
        setUserName(userProfile[0].name);
        setUserId(userProfile[0].id);
      });
  }, [location]);

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="bloglist">
        <nav className="user-navbar">
          <h1>{userName}</h1>
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
          <h3>{userBlogs.length}<br />Blogs</h3>
          <div className="user-blogs">
            {userBlogs.map((blog) => (
              <div className="user-blog-preview" key={blog.id} >
                <p className="user-author">投稿者 : {userName}</p>
                <h4>{blog.content}</h4>
                <span style={{ display: "flex" }}>
                  <div className="表示させない" style={{ fontSize: 0 }}>
                    {createdDate = userBlogs[0].created_at.split("T")}
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

export default User;