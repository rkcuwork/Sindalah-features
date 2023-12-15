import * as z from "zod";
import { paths } from "@/lib/HelperFunctions/Path";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SignInValidation, } from "@/lib/Validations";
import Loader from "@/components/Shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import {  useIsEmailVerified, useSignInAccount } from "@/lib/React-Query/QueriesAndMutatiions";
import { useUserContext } from "@/Context/AuthContext";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { encrypt } from "@/lib/HelperFunctions/Helper";


 

 
const SignInForm = () => {
  const { toast } = useToast();
  // const isloading = false;
  const navigate = useNavigate();
  const [cookies] = useCookies();
  
  useEffect(()=>{
    if(cookies.emailVerification && localStorage.getItem("user")){
      navigate(paths.main);
    }
  },[])

  const {checkAuthUser, isLoading:isUserLoading} = useUserContext();
  

  
  const {mutateAsync: signInAccount, isPending:isSigningIn} = useSignInAccount();
  const {mutateAsync: isEmailVerified, isPending:isEmailVerifying} = useIsEmailVerified();
  // console.log(isSigningIn);
    // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email:"",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password});

    if(!session){
      return  toast({
        title: "Sign In Failed. Please Try Again.",
        // description: "Friday, February 10, 2023 at 5:57 PM",
      })
    }

    const isLoggedIn = await checkAuthUser();
    const verifiedEmail = await isEmailVerified();
    // console.log("cookie = ",cookies.emailVerification);

    if(isLoggedIn && verifiedEmail){
      form.reset();
      // setCookie('emailVerification', true, { path: '/'});
      return navigate(paths.main);
    }
    else if(isLoggedIn){
      form.reset();
      localStorage.setItem('p', encrypt(values.password));
      navigate(paths.verification_email)
    }
    else{
      return  toast({
        title: "Sign In Failed. Please Try Again.",
        // description: "Friday, February 10, 2023 at 5:57 PM",
      })
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Welcome Back! Please enter your details</p>

      
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type='email' className="shad-input" placeholder="Enter Email" {...field} />
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
                    <Input type='password' className="shad-input" placeholder="Enter Password" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isSigningIn || isUserLoading || isEmailVerifying?
            (<div className="flex-center gap-2">
              <Loader/> Signing in...
            </div>):
            ("Sign In")}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to={paths.signup} className="text-primary-500 text-small-semibold ml-1">Sign Up</Link>
          </p>
        </form>
      </div>
    </Form>
        
  )
}

export default SignInForm