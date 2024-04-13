import "./App.css";
import BuyOrderCard from "./components/custom_components/BuyOrderCard";
import DisplayPrices from "./components/custom_components/DisplayPrices";
import RealtimePrice from "./components/custom_components/RealtimePrice";
import UserHoldingsCard from "./components/custom_components/UserHoldingsCard";

function App() {
  return (
    <>
      <UserHoldingsCard />
      <BuyOrderCard />
      {/* <DisplayPrices /> */}
      <RealtimePrice />
    </>
  );
}

export default App;
