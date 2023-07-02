import "./App.css";
import Chart from "./components/Chart";

const config = {
  primary: {
    min: true,
    max: true,
    avg: true,
  },
  secondary: {
    min: true,
    max: true,
    avg: true,
  },
};
function App() {
  return (
    <div className="App">
      <Chart config={config} />
    </div>
  );
}

export default App;
