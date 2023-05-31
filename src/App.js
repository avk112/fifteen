import Header from "./components/Header";
import Footer from "./components/Footer";
import GameArea from "./components/GameArea";


function App() {
  return (
      <div className="app">
          <div className="container">
              <Header/>
              <main className="main">
                    <GameArea/>
              </main>
              <Footer/>
          </div>
      </div>
  );
}

export default App;
