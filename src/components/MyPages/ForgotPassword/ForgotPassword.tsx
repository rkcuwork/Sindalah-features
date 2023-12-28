import  { useEffect } from 'react';
import * as z from "zod";
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { ForgotPasswordValidation } from '@/lib/Validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { paths } from '@/lib/HelperFunctions/Path';
import { useSendForgotPasswordLink } from '@/lib/React-Query/QueriesAndMutatiions';
import Loader from '@/components/Shared/Loader';
import { useToast } from '@/components/ui/use-toast';


const ForgotPassword = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const {mutateAsync: sendForgotPasswordLink, isPending:isSendingLink} = useSendForgotPasswordLink();


    useEffect(()=>{
        if(localStorage.getItem("cookieFallback")){
            return navigate(paths.main);
        }
        else if(localStorage.getItem("forgot_password")){
            return navigate(paths.forgotpassword_emailsent);
        }
    },[])




    const form = useForm<z.infer<typeof ForgotPasswordValidation>>({
        resolver: zodResolver(ForgotPasswordValidation),
        defaultValues: {
          email:"",
        },
      })

    const handleSubmit = async (values: z.infer<typeof ForgotPasswordValidation>) =>{
        const result = await sendForgotPasswordLink(values.email)
        if(result.success){
            localStorage.setItem("forgot_password","true");
            return navigate(paths.forgotpassword_emailsent);
        }
        else{
            return  toast({
                title: result.message,
              })
        }
    }
  return (
    <Form {...form}>
        <div className="flex w-full justify-center items-center">
      
            <div className="hidden xl:block flex-1 p-8 ">
                <img src="assets/MyImages/forgot_password.png" alt="Forgot Password Image" className='object-cover bg-no-repeat' />
            </div>

            
            <div className="flex-1  p-8 flex-col max-xl:text-center ">
                <h1 className="text-3xl font-bold mb-3 ">Forgot Password</h1>
                <p className='mb-8'>Enter your email and we'll send you a link to reset your password.</p>

         
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-col gap-5 mt-4 ">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex-col max-xl:flex-center">
                            <FormLabel>Email</FormLabel>
                            <FormControl >
                                <Input type='email' className="shad-input w-2/3 max-xl:text-center max-xl:w-1/2 " placeholder="Enter Your Email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className=" bg-blue-700 mt-4 hover:bg-blue-900">
                        {isSendingLink?
                            (<div className="flex-center gap-2">
                            <Loader/> Sending Link...
                            </div>):
                            ("Submit")}
                    </Button>
                    

                    <p className="mt-4"> Remember your password?{' '}
                        <Link to={paths.signin} className="text-blue-500 hover:underline">Sign in here.</Link>
                    </p>
                </form>
            </div>
        </div>
    </Form>
  )
}

export default ForgotPassword