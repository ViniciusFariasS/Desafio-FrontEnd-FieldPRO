import './styles/App.css';
import { BrowserRouter } from "react-router-dom";
import { Router } from './routes/Route';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
