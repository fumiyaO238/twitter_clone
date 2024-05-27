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
      <div className="body">
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
        <div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Index;