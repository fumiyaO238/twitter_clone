import Header from '../view/Header';
import Footer from '../view/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  const getToken = localStorage.getItem("keyToken");
  console.log(getToken);

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
          <Header />
          <h3>Home画面</h3>
          <Footer />
        </>
      )}
    </div>
  )
}

export default Home;