"use client";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { OctagonAlert } from "lucide-react";
import { useForm } from "react-hook-form" 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

import Link from "next/link";
import {Input} from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card";
import {Button} from "@/components/ui/button"
import { authClient } from "@/lib/auth-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import{
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
    } from "@/components/ui/form"

const formSchema = z.object({
    name: z.string().min(1,{message:"Name is required"}),
    email: z.string().regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    { message: "Email is required" }
  ),
    password: z.string().min(1,{message:"Password is required"}),
    confirmPassword: z.string().min(1,{message:"Confirm Password is required"}),
}).refine((data)=> data.password === data.confirmPassword,{
    message: "Passwords do not match",
    // confirm will show error
    path: ["confirmPassword"],
})
export const SignUpView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password, 
            callbackURL:"/"
        },{
            onSuccess: () => {
                setPending(false);
                router.push("/");
            },
            onError: ({error}) => {
                setError(error.message);
            },
        })    
    }

    const onSocial = (provider :"github" | "google") => {
        setError(null);
        setPending(true);
    
        authClient.signIn.social({
            provider:provider,
            callbackURL:"/"
        },{
            onSuccess: () => {
                setPending(false);
            },
            onError: ({error}) => {
                setError(error.message);
            },
        })    
    }

    return( 
    <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Let&apos;s get started
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Create Your Account 
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField 
                                        control={form.control}
                                        name="name"
                                        render={({field})=>(
                                            <FormItem>
                                                <FormLabel>
                                                    Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="text"
                                                        placeholder="My Name" 
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
                                        control={form.control}
                                        name="email"
                                        render={({field})=>(
                                            <FormItem>
                                                <FormLabel>
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="email"
                                                        placeholder="Email" 
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
                                        control={form.control}
                                        name="password"
                                        render={({field})=>(
                                            <FormItem>
                                                <FormLabel>
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="password "
                                                        placeholder="*********" 
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
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({field})=>(
                                            <FormItem>
                                                <FormLabel>
                                                    Confirm Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="password "
                                                        placeholder="*********" 
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                {!!error && (
                                    <Alert className="bg-destructive/10 border-none">
                                        <OctagonAlert className="h-4 w-4 !text-destructive" />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}
                                <Button disabled={pending} type="submit" className="w-full">
                                    Sign up
                                </Button>
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after: items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        or continue with
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* dependends on number of social login cols-2 */}
                                    <Button
                                        disabled={pending}
                                        onClick={()=>onSocial("google")}
                                        variant="outline"
                                        type="button"
                                        className="w-full"
                                    >
                                        <FaGoogle />
                                    </Button>
                                    <Button
                                        disabled={pending}
                                        onClick={()=>onSocial("github")}
                                        variant="outline"
                                        type="button"
                                        className="w-full"
                                    >
                                        <FaGithub /> 
                                    </Button>
                                </div>
                                <div className="text-center text-sm text-muted-foreground">
                                    Already have an account <Link href="/auth/sign-in" className="underline underline-offset-4"> 
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>

                    <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <img src="/logo.svg" alt="image" className="h-[92px] w-[92px]" />
                        <p className="text-2xl font-semibold text-white">
                            AI Service
                        </p>
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4">
                    Terms of Service
                </Link>{" "}
                and acknowledge you have read our{" "}
                <Link href="/privacy" className="underline underline-offset-4">
                    Privacy Policy
                </Link>
            </div>
        </div>

)};