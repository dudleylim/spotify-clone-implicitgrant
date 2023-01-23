import { BrowserRouter } from 'react-router-dom';
import { ContextApi } from './components/ContextApi';
import { ContextApiPomo } from './components/ContextApiPomo';
import Main from './components/Main';
import Header from './components/Header';
import Player from './components/Player';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <ContextApi>
        <ContextApiPomo>
          <Header />
          <Sidebar />
          <Main />
          <Player />
        </ContextApiPomo>
      </ContextApi>
    </BrowserRouter>
  );
}

export default App;
