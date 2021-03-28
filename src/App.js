import "./App.css";

import { Home } from "./component/Home";
import { Footer } from "./component/Footer";

function App() {
  return (
    <div className="App">
      <Home />
      <Footer footer={"footer"} />
    </div>
  );
}

export default App;
