import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/styleUserList.css";
import { Link } from "react-router-dom";
import Header from "../view/Header";
import Footer from "../view/Footer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export type UserType = {
  id: string;
  name: string;
  email?: string;
  password?: string;
  created_at?: any;
  updated_at?: any;
};

type RelstionshipsType = {
  id: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  follower_id?: string;
  followeing_id?: string;
}

const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [rel, setRel] = useState<RelstionshipsType[]>([]);
  const [myUserId, setMyUserId] = useState("");
  const [isPending, setIsPending] = useState(true);
  // const [isFollowing, setIsFollowing] = useState(false);
  let startedDate = [];

  // getリクエスト
  useEffect(() => {
    const token = localStorage.getItem("keyToken")
    setTimeout(() => {
      axios.get("http://localhost:3333/userlist",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data)
          setIsPending(false)
          const getMyUserID = response.data.user_id;
          const resUsers = response.data.usersResult;
          const getRel = response.data.relResult;
          setMyUserId(getMyUserID);
          setUsers(resUsers);
          setRel(getRel);
        });
    }, 300);
  }, []);

  // フォロー処理
  const handleClickFollow = (followedId: string) => {
    // setIsFollowing(!isFollowing)

    axios.post("http://localhost:3333/user-follow",
      {
        myUserId: myUserId,
        followedId: followedId
      })
      .then((response) => {
        setIsPending(false)
        const result = response.data.result
        // console.log(result)
      });

  }

  return (
    <div>
      <Header />
      <div className="user-list">
        <h1>UserList</h1>
        <div>
          {isPending && <h3 style={{ margin: 30 }}>Now Loading...</h3>}
        </div>
        <div className="container">
          <ul className="list">
            {users.map((user) => (
              <li className="list-item" key={user.id}>
                <div className="flex">
                  <AccountCircleIcon style={{ fontSize: 50, color: "gray", marginLeft: "5px" }} />
                  <Link to={user.id}>
                    <h4>{user.name}</h4>
                  </Link>
                  {/* 絶対良くないやり方 */}
                  <div className="表示させない" style={{ fontSize: 0 }}>
                    {startedDate = user.created_at.split("T")}
                    {startedDate = startedDate[0].split("-")}
                  </div>
                  <p>
                    {`${startedDate[0]}年${startedDate[1]}月から利用しています`}
                  </p>
                  {/* <p>2024年04月から利用しています</p> */}
                  {user.id !== `${myUserId}` &&
                    <button onClick={() => { handleClickFollow(user.id) }}>
                      {/* {myUserId === rel.follower_id ? "Follow" : "UnFollow"} */}
                      follow
                    </button>
                  }
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserList;