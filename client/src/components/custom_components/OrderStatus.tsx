import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

function OrderStatus() {
  const [mssg, setMssg] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      orderId: "2022.02.14-btcinr_2",
    },
  });
  const handleSubmit = async (formDataJson) => {
    console.log(formDataJson);
    setIsLoading(true);
    const response = await fetch(
      "http://localhost:3127/api/v1/commodity/orderStatus",
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
    setOrderId(parsedResponse.orderId);
    // console.log(parsedResponse);
  };
  return (
    <Form {...form}>
      <form
        className="container w-[550px] border-2 border-violet-300 mb-2  rounded-lg flex-1"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <CardHeader className="my-2 rounded-lg bg-violet-100">
          <CardTitle>Track Your Orders</CardTitle>
          <CardDescription>
            Here you can use your orderid to track your order
          </CardDescription>
        </CardHeader>

        <FormField
          control={form.control}
          name="orderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Put your order Id</FormLabel>
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

        <div className="bg-violet-50 rounded-lg h-[30px] py-5 my-2 pl-2 flex place-content-center items-center">
          {isLoading ? (
            "Loading..."
          ) : mssg ? (
            <span>
              {mssg}{" "}
              <span className="text-xs px-1 bg-pink-100">id: {orderId}</span>
            </span>
          ) : (
            <span className="text-gray-400">*Statement*</span>
          )}
        </div>
        <div className="my-2 flex place-content-center">
          <Button type="submit">Check Order Status</Button>
        </div>
      </form>
    </Form>
  );
}

export default OrderStatus;
