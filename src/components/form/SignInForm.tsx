"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInFormSchema } from "@/lib/validation/signInFormValidation";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    try {
      setIsLoading(true);
      //test
      const userData = {
        email: values.email,
        password: values.password,
      };
      //!console.log("Sent data ", userData);
      const response = await axios.post("/api/users/signin", userData);
      //!console.log("Sign Up success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log(
        "(SignUp error)this error happened inside onSubmit of sign IN: ",
        error.message
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <div className="flex items-center ">
            <div className="mx-auto p-4 text-2xl">
              {isLoading ? "Loading" : "Sign In form"}
            </div>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-6 w-full">
          Sign In
        </Button>
      </form>
      <div
        className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 
      before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block
      after:h-px after:flex-grow after:bg-stone-400"
      >
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, Please&nbsp;
        <Link className="text-blue-700 hover:underline" href={"/signup"}>
          Sign Up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
