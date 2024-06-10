import { useLocation } from "react-router-dom"

const User = () => {
  const location = useLocation();
  const pn = location.pathname;
  const prm = pn.split("/");
  const userId = prm[2]

  return (
    <div>
      <h3>ユーザーID:{userId}</h3>
    </div>
  )
}

export default User