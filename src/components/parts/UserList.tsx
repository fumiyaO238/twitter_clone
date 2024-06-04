import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/styleUserList.css";
import { Link } from "react-router-dom";
import Header from "../view/Header";
import Footer from "../view/Footer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type UserType = {
  id: string;
  name: string;
  email?: string;
  password?: string;
  created_at?: any;
  updated_at?: any;
};

const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isPending, setIsPending] = useState(true);

  // getリクエスト
  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:3333/userlist")
        .then((response) => {
          setIsPending(false)
          const resUsers = response.data.blogs;
          setUsers(resUsers);
        });
    }, 1000);
  }, []);

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
                  <AccountCircleIcon style={{fontSize:50, color:"gray", marginLeft:"5px"}} />
                  <Link to={user.id}>
                    <h4>{user.name}</h4>
                  </Link>
                  <p>2024年04月から利用しています</p>
                  <button >
                    Follow
                  </button>
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