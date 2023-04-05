import './App.css';
import Header from './views/Header';
import Navbar from './views/navbar';
import Musees from './services/Musees';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <div>
        <Musees />
      </div>
    </div>
  );
}

export default App;
