import { useEffect, useState } from "react";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

function RealtimePrice() {
  const [ethInfo, setEthInfo] = useState();
  const [causeUpdate, setCauseUpdate] = useState(0);
  const [lastPrice, setLastPrice] = useState();
  let intervalId;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3127/api/v1/PriceUpdates/realtime",
        {
          method: "POST",
        }
      );

      const parsedResponse = await response.json();
      console.log(parsedResponse);
      setEthInfo(parsedResponse.ETH);

      await fetch("http://localhost:3127/api/v1/PriceUpdates/disconnect", {
        method: "POST",
      });
    };

    const startInterval = () => {
      intervalId = setInterval(() => {
        fetchData();
      }, 60000);
    };

    fetchData();
    startInterval();

    return () => {
      clearInterval(intervalId);
    };
  }, [causeUpdate, setCauseUpdate]);

  const stopUpdates = () => {
    console.log("stop requested");

    return () => {
      clearInterval(intervalId);
    };
  };
  return (
    <div className="container w-[550px] border-2 border-violet-300 my-2 py-2 rounded-lg">
      <CardHeader className="my-2 rounded-lg bg-blue-100">
        <CardTitle>Realtime</CardTitle>
        <CardDescription>
          Here you will get realtime update of subscribed currency
        </CardDescription>
      </CardHeader>
      <div className="rounded-md border px-4 py-4 font-mono text-sm">
        <h2 className="text-l font-bold">ETH-USDT Trade updates:</h2>
        <p className="flex">
          Last Price:{" "}
          <span className={`${ethInfo ? "bg-yellow-50" : ""}`}>
            {ethInfo ? ethInfo.ls : <Skeleton className="h-4 w-[50px]" />}
          </span>
        </p>
        <p className="flex">
          Block Version:{" "}
          <span className={`${ethInfo ? "bg-yellow-50" : ""}`}>
            {ethInfo ? ethInfo.v : <Skeleton className="h-4 w-[50px]" />}
          </span>
        </p>
        <p className="flex">
          TimeStamp:{" "}
          <span className={`${ethInfo ? "bg-yellow-50" : ""}`}>
            {ethInfo ? ethInfo.btST : <Skeleton className="h-4 w-[50px]" />}
          </span>
        </p>
      </div>
      <div className="flex my-2">
        <Button onClick={stopUpdates}>Stop</Button>
      </div>
    </div>
  );
}

export default RealtimePrice;
