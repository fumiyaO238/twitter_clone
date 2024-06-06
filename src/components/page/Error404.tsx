import { Link } from "react-router-dom"
import "../styles/styleError404.css";

const Error404 = () => {
  return (
    <div className="404">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to={"/home"}>
        {"Back to Home"}
      </Link>
    </div>
  )
}

export default Error404