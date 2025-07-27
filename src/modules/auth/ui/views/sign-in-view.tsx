/* eslint-disable @next/next/no-img-element */
"use client";

import { z } from "zod";
import { OctagonAlertIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Alert, AlertTitle} from "@/components/ui/alert";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form"; // ✅ from your UI lib (shadcn/ui)
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const formSchema = z.object({
  email: z.string()
    .min(1, { message: "Email address is required." })
    .email("Enter a valid email address."),
  password: z.string().min(1, { 
    message: "Password is required."
  }) 
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password:""
    },
  });

  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    await authClient.signIn.email (
      {
        email: data.email,
        password: data.password
      }, 
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error } ) => {
          setError(error.message);
        }
      }
    );
  }
  
  return (
    <div className = "flex flex-col gap-6">
      <Card className="overflow-hidden p-0 shadow-xl rounded-2xl border border-muted bg-white">
        <CardContent className = "grid md:grid-cols-2 p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-6 md:p-8 space-y-6">
              <div className="flex flex-col gap-6">
                <div className="text-center space-y-1">
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                    Welcome back
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control = {form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"  
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control = {form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"  
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-red-500/10 border border-red-500/20 text-red-700 rounded-lg shadow-sm p-4 flex items-start gap-4">
                    <OctagonAlertIcon className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <AlertTitle className="text-sm font-semibold tracking-wide">
                        {error}
                      </AlertTitle>
                      <p className="text-sm text-red-600 mt-1">
                        Please check your email or password and try again.
                      </p>
                    </div>
                  </Alert>
                )}

                <Button 
                  disabled={pending}
                  type="submit"
                  className="w-full"
                >
                    Sign in 
                </Button>

                <div className="relative w-full text-center text-sm text-muted-foreground">
                  <span className="relative z-10 bg-white px-4">Or continue with</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-sm transition"
                  >
                    <FaGoogle className="h-5 w-5" />
                    Google
                  </Button>

                  <Button
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-sm transition"
                  >
                    <FaGithub className="h-5 w-5" />
                    GitHub
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account? {" "}
                  <Link
                    href="/sign-up"
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
            <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-green-800 relative md:flex flex-col gap-y-4 items-center justify-center py-8">
            <img
              src="\logo.svg"
              alt="Modern AI logo"
              className="h-[96px] w-[96px] drop-shadow-[0_0_6px_rgba(0,255,200,0.4)] transition-transform duration-300 hover:scale-105"
            />
            <p className="text-3xl font-extrabold text-white tracking-wide font-[Orbitron] drop-shadow-[0_0_4px_#00ffaa]">
              Connekt.AI
            </p>
            </div>
        </CardContent>
      </Card>
      <div className="text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a
          href="#"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};