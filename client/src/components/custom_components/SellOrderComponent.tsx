import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

function SellOrderComponent() {
  const [mssg, setMssg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      market: "TRXBTC",
      pricePerUnit_toSell: "0.00000035",
      totalQuantity_toSell: 200,
    },
  });
  const handleSubmit = async (formDataJson) => {
    console.log(formDataJson);
    setIsLoading(true);
    const response = await fetch(
      "http://localhost:3127/api/v1/Sell/sellOrder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataJson),
      }
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    const parsedResponse = await response.json();
    setMssg(parsedResponse.message);
    // console.log(parsedResponse);
  };
  return (
    <Form {...form}>
      <form
        className="container w-[550px] border-2 border-violet-300 rounded-lg flex-1"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <CardHeader className="my-2 rounded-lg bg-violet-100">
          <CardTitle>Sell your Holdings</CardTitle>
          <CardDescription>
            Here you can place a bid for holdings
          </CardDescription>
        </CardHeader>
        <FormField
          control={form.control}
          name="market"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Market</FormLabel> */}
              <FormControl>
                {/* <Input placeholder="shadcn" {...field} /> */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Market</Label>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <Select {...field}>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="TRXBTC">TRXBTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricePerUnit_toSell"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Per Unit</FormLabel>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalQuantity_toSell"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Quantity</FormLabel>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormControl>
                <Input placeholder="200" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="bg-violet-50 rounded-lg h-[30px] py-5 my-2 pl-2 flex place-content-center items-center">
          {isLoading ? (
            "Loading..."
          ) : mssg ? (
            mssg
          ) : (
            <span className="text-gray-400">*Statement*</span>
          )}
        </div>
        <div className="my-2 flex place-content-center">
          <Button type="submit">Sell</Button>
        </div>
      </form>
    </Form>
  );
}

export default SellOrderComponent;
