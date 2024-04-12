import React from "react";
import { CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

function CardItem({ label, value }) {
  return (
    <div>
      {/* {userProfile ? ( */}
      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">{label}</Label>
          <Input
            id="username"
            value={value}
            placeholder="Name of your project"
          />
        </div>
      </CardContent>
    </div>
  );
}

export default CardItem;
