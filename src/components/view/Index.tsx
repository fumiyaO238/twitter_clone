import Header from './Header';
import Footer from './Footer';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import BlogList from '../parts/BlogList';

const Index = () => {
  return (
    <div>
      <div className="header">
        <Header />
      </div>

      <div className="body" style={{height: 699}}>
        <div className="blog-list">
          <BlogList />
        </div>
      </div>

      <div className="footer">
          <Footer />
      </div>
    </div>
  )
}

export default Index;