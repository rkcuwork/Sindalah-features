import * as z from 'zod'

import { ResetPasswordValidation } from "@/lib/Validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useUpatePassword } from '@/lib/React-Query/QueriesAndMutatiions'
import { Form } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { paths } from '@/lib/HelperFunctions/Path'
import { crossImageUrl } from '../Verifications/EmailVerification/Images'
import { useToast } from '@/components/ui/use-toast'
import Spinner from '@/components/MyConponents/Spinner'


const ForgotPasswordReset = () => {
    const {mutateAsync:updatePassword,isPending:isUpdatingPassword} = useUpatePassword();
    const {toast} = useToast();
    const navigate = useNavigate();
    const [isLoading,setisLoading] = useState(true);
    const [secret,setSecret] = useState("");
    const [userId,setUserId] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("cookieFallback") || !localStorage.getItem("forgot_password")){
            return navigate(paths.main);
        }

        const urlParams = new URLSearchParams(window.location.search);
        const s = urlParams.get('secret');
        const u = urlParams.get('userId');
        if(s && u){
            setSecret(s);
            setUserId(u);
        }
        setisLoading(false);
    },[])

    const form = useForm<z.infer<typeof ResetPasswordValidation>>({
        resolver: zodResolver(ResetPasswordValidation),
        defaultValues: {
          password:"",
          confirmPassword:"",
        },
      })

      const onResetPasswordSubmit = async (values: z.infer<typeof ResetPasswordValidation>) =>{
        if(userId && secret){
            const newPassword = values.password;
            const result = await updatePassword({userId,secret,newPassword});
            if(result.success){
                localStorage.removeItem("forgot_password");
                return navigate(paths.forgotpassword_updated);
            }
            else{
                toast({
                    title: result.message,
                    description: "Please Try Again",
                  })
            }
        }
      }

      const handleTryAgainBtnClick = ()=>{
        localStorage.removeItem("forgot_password");
        return navigate(paths.forgotpassword);
      }

    
      if(isLoading){
        return (
            <div className="flex items-center justify-center flex-col m-auto h-screen">
                <Spinner w={16} h={16}></Spinner>
            </div>
        )
      }
      else if(!secret || !userId){
        return (
            <div className="flex items-center justify-center flex-col m-auto h-screen">
                <img src={crossImageUrl} alt="Email Icon" className="w-16 h-16 rounded-full mb-4" />
                <h1 className="text-4xl font-bold mb-4">
                    {/* {if(cookie.EmailVerification)} */}
                    Link is not valid</h1>
                <p className="text-lg mb-4">
                Please try again.
                </p>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700 hover:shadow-md transition-all duration-300" onClick={()=> handleTryAgainBtnClick()}>
                    Try Again
                </button>
            </div>
        )
    }

  return (
    <div className="flex items-center justify-center flex-col m-auto h-screen w-1/3">
        <h2 className="h2-bold  p-1 ">Reset Password</h2>
        <p className=" text-purple-300 small-medium md:base-regular m-2">Enter your new password</p>
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onResetPasswordSubmit)} className="flex flex-col gap-5 w-full mt-4">

                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type='password' className="shad-input" placeholder="Enter Password" {...field} />
                    </FormControl>
                    <FormMessage className='text-red' />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type='password' className="shad-input" placeholder="Enter Password" {...field} />
                    </FormControl>
                    <FormMessage className='text-red' />
                    </FormItem>
                )}
                />


                



                <Button type="submit" className="shad-button_primary w-1/2 m-auto mt-3">
                {isUpdatingPassword?
                (<div className="flex-center gap-2">
                    <Loader/> Reseting...
                </div>):
                ("Reset Password")}
                </Button>

            </form>
        </Form>
    </div>
  )
}

export default ForgotPasswordReset