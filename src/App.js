import "./App.css";
import GistsList from "./components/gistsList/GistsList";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <GistsList />
    </div>
  );
}

export default App;
