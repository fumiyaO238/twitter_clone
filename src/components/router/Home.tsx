import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/Main')
  }
  const handleSignUp = () => {
    navigate('/signup')
  }
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleHome}>Main</button>
      <br />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  )
}

export default Home