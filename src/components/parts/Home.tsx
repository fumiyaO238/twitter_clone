import { useState } from 'react'
import Header from '../view/Header';
import Footer from '../view/Footer';

const Home = (isExist: any) => {
  const [inUser, setInUser] = useState(isExist);
  console.log(inUser);
  
  return (
    <div>
      <Header />
      <h3>Home画面</h3>
      <Footer />
    </div>
  )
}

export default Home