import "./App.css";
import BuyOrderCard from "./components/custom_components/BuyOrderCard";
import OrderStatus from "./components/custom_components/OrderStatus";
import RealtimePrice from "./components/custom_components/RealtimePrice";
import SellOrderComponent from "./components/custom_components/SellOrderComponent";
import UserHoldingsCard from "./components/custom_components/UserHoldingsCard";

function App() {
  return (
    <>
      <div className="lg:flex h-screen gap-1">
        <UserHoldingsCard />
        <div className="flex flex-col h-full gap-1 py-2 mx-1">
          <div className="flex gap-1 ">
            <BuyOrderCard />
            <SellOrderComponent />
          </div>
          <div className="flex gap-1">
            <OrderStatus />
            <RealtimePrice />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
