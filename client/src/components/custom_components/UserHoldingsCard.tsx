import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { userInfo } from "os";
import CardItem from "./CardItem";

function UserHoldingsCard() {
  const [userProfile, setUserProfile] = useState("");
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:3127/api/v1/UserInfo/get",
        {
          method: "GET",
        }
      );
      const parsedResponse = await response.json();
      const userInfo = parsedResponse.userInfo;
      console.log(userInfo);
      setTimeout(() => {
        setUserProfile(userInfo);
      }, 2000);
    })();
  }, []);
  return (
    <Card className="my-2 ml-2 border-2 border-purple-300 container w-[550px]">
      <CardHeader className="my-2 rounded-lg bg-purple-200">
        <CardTitle>User Holdings</CardTitle>
        <CardDescription>User Info and Current Holdings</CardDescription>
      </CardHeader>
      <div id="userInfo" className="border-2 border-purple-100 rounded-lg py-2">
        {/* //coindcx_id */}
        <div>
          {userProfile ? (
            <CardItem
              label={"CoinDCX ID"}
              value={userProfile.userName.coindcx_id}
            />
          ) : (
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </div>
            </CardContent>
          )}
        </div>
        {/* //name */}
        <div className="flex">
          {userProfile ? (
            <CardItem
              label={"First Name"}
              value={userProfile.userName.first_name}
            />
          ) : (
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </div>
            </CardContent>
          )}

          {userProfile ? (
            <CardItem
              label={"Last Name"}
              value={userProfile.userName.last_name}
            />
          ) : (
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </div>
            </CardContent>
          )}
        </div>

        <div>
          {userProfile ? (
            <CardItem label={"Email"} value={userProfile.userName.email} />
          ) : (
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </div>
            </CardContent>
          )}
        </div>
        <div>
          {userProfile ? (
            <CardItem
              label={"Mobile No."}
              value={userProfile.userName.mobile_number}
            />
          ) : (
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </div>
            </CardContent>
          )}
        </div>
      </div>

      <div id="userHoldings" className="my-2 py-2 border-2 border-purple-100">
        <div id="currency-balance" className="flex">
          {userProfile ? (
            <CardItem
              label={"Currency"}
              value={userProfile.userHoldings.currency}
            />
          ) : (
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </div>
            </CardContent>
          )}

          {userProfile ? (
            <CardItem
              label={"Balance"}
              value={userProfile.userHoldings.balance}
            />
          ) : (
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </div>
            </CardContent>
          )}
        </div>

        <div>
          {userProfile ? (
            <CardItem
              label={"Locked Balance"}
              value={userProfile.userHoldings.locked_balance}
            />
          ) : (
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </div>
            </CardContent>
          )}
        </div>
      </div>
    </Card>
  );
}

export default UserHoldingsCard;
