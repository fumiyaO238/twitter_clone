import { AppRoutes } from './components/router/Router';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </>
  )
}

export default App;
