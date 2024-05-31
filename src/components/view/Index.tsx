import Header from './Header';
import Footer from './Footer';
import BlogList from '../parts/BlogList';

const Index = () => {
  return (
    <div>
      <div className="header">
        <Header />
      </div>

      <div className="body">
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