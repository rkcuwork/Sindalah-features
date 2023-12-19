import {
    // useQuery,
    useMutation,
    // useQueryClient,
    // useInfiniteQuery,
} from '@tanstack/react-query';
import { createUserAccount, signInAccount, sendEmailVerificationLink, isEmailVerified, updateEmail, sendForgotPasswordLink, updatePassword } from '../Appwrite/api';
import { INewUser } from '@/types';

export const useCreateUserAccount= () =>{
    return useMutation({
        mutationFn: (user: INewUser)=>createUserAccount(user)
    })
}

export const useSignInAccount= () =>{
    return useMutation({
        mutationFn: (user: {
            email:string; 
            password:string;
        })=>signInAccount(user)
    })
}

export const useSendVerificationEmailLink = () =>{
    return useMutation({
        mutationFn:() => sendEmailVerificationLink()
    })
}


export const useIsEmailVerified = () =>{
    return useMutation({
        mutationFn:() => isEmailVerified()
    })
}

export const useUpdateEmail = () =>{
    return useMutation({
        mutationFn: ({ newEmail, password }: { newEmail: string; password: string }) => updateEmail({ newEmail, password })
    })
}

export const useSendForgotPasswordLink = () =>{
    return useMutation({
        mutationFn:(email:string) => sendForgotPasswordLink(email)
    })
}

export const useUpatePassword = () =>{
    return useMutation({
        mutationFn:({userId,secret,newPassword} : {userId:string,secret:string,newPassword:string}) => updatePassword({userId,secret,newPassword})
    })
}



