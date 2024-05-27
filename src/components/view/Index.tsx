import Header from './Header';
import Footer from './Footer';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const Index = () => {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="body" style={{height: 680}}>
        <div>
          <h1>Index.tsx</h1>
          【以下コンポーネントの取り纏めを行う】
        </div>
        <div>
          <LeftSide />
        </div>
        <div>
          <RightSide />
        </div>
      </div>
      <div className="footer">
          <Footer />
      </div>
    </div>
  )
}

export default Index;