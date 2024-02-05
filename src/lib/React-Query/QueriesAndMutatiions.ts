import {
    // useQuery,
    useMutation, useQuery, useQueryClient,
    // useQueryClient,
    // useInfiniteQuery,
} from '@tanstack/react-query';
import { createUserAccount, signInAccount, sendEmailVerificationLink, isEmailVerified, updateEmail, sendForgotPasswordLink, updatePassword, signOutAccount, createPost, updatePost, getRecentPosts, likePost, savePost, deleteSavedPost, getCurrentUser } from '../Appwrite/api';
import { INewPost, INewUser, IUpdatePost } from '@/types';
import { QUERY_KEYS } from './QueryKeys';

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


export const useSignOutAccount= () =>{
    return useMutation({
        mutationFn: ()=>signOutAccount()
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };


  export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: IUpdatePost) => updatePost(post),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
        });
      },
    });
  };


  export const useGetRecentPosts = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
    });
  };


  export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        postId,
        likesArray,
      }: {
        postId: string;
        likesArray: string[];
      }) => likePost(postId, likesArray),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
      },
    });
  };
  
  export const useSavePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
        savePost(userId, postId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
      },
    });
  };
  
  export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
      },
    });
  };

  export const useGetCurrentUser = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      queryFn: getCurrentUser,
    });
  };
  
  



