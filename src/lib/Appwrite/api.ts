import { INewPost, INewUser, IUpdatePost } from "@/types";
import { account, appwriteConfig, avatars, databases, handleException, ID,storage } from "./Config";
import { Query } from "appwrite";
import { paths } from "../HelperFunctions/Path";


export async function createUserAccount(user:INewUser){
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId:newAccount.$id,
            email:newAccount.email,
            name: newAccount.name,
            username: user.username,
            imageUrl: avatarUrl,

        })

        console.log("New Account Create Successfully :: Appwrite :: api :: createUserAccount :: success");
        return newUser;
    } catch (error) {
        console.log("Appwrite :: api :: createUserAccount :: error-->",error);
    }
}

export async function saveUserToDB(user:{
    accountId:string;
    email:string;
    name:string;
    imageUrl:URL;
    username?:string;

}){

    try {
        const newUser = databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );

        return newUser;
        
    } catch (error) {
        console.log("Appwrite :: api :: saveUserToDB :: error-->",error);
    }
}

export async function signInAccount(user: {email:string; password:string;}){
    try {
        const session = await account.createEmailSession(user.email,user.password);

        return session;
        
    } catch (error) {
        console.log("Appwrite :: api :: signInAccount :: error-->",error);
    }
}

export async function getCurrentUser() {
    try {
      
        const currentAccount = await account.get();


        if(!currentAccount){
            throw Error;
        }
        
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]);

        if(!currentUser) throw Error;

        currentUser.documents[0].emailVerification = currentAccount.emailVerification;
        currentUser.documents[0].phoneVerification = currentAccount.phoneVerification;
        console.log("Appwrite :: api :: getCurrentUser :: success");
        return currentUser.documents[0];
    } catch (error) {
        console.log("Appwrite :: api :: getCurrentUser :: error-->",error);

    }
}

export async function sendEmailVerificationLink() {
    try{
        await account.createVerification(`${paths.start_url}${paths.base}/verification/verify-email`);
        console.log("Appwrite :: api :: sendEmailVerificationLink :: success");
        return true;
    }
    catch(error){
        console.log("Appwrite :: api :: sendEmailVerificationLink :: error-->",error);
        return false;
    }
    
    
}

export async function verifyEmail(userId:string,secret:string){
    try{
        await account.updateVerification(userId, secret);
        console.log("Appwrite :: api :: verifyEmail :: success");
        return true;
    }
    catch(error){
        console.log("Appwrite :: api :: verifyEmail :: error-->",error);
        return false;
    }
    
}

export async function isEmailVerified(){
    try{
        const user = await getCurrentUser();
        if(user){
            console.log("Appwrite :: api :: isEmailVerified :: success");
            return user.emailVerification;
        }
        else{
            console.log("Appwrite :: api :: isEmailVerified :: success but user not found-->",user);
            return false;
        }
    }
    catch(error){
        console.log("Appwrite :: api :: isEmailVerified :: error-->",error);
        return false;
    }
    
}


export async function updateEmail({ newEmail, password }: { newEmail: string; password: string }): Promise<boolean> {
    try {
        await account.updateEmail(newEmail, password);
        await updateUserDatabase({email:newEmail});
        console.log("Appwrite :: api :: updateEmail :: success");
        return true;
        
    } catch (error) {
        console.log("Appwrite :: api :: updateEmail :: error-->",error);
        return false;
        
    }
}

export async function updateUserDatabase(user:{username?:string,email?:string,name?:string,imageUrl?:string}){
    try {
        const current_user = await getCurrentUser();
        if(current_user){
            await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, current_user.$id,user);
            console.log("Appwrite :: api :: updateUserDatabase :: success");
            return true;
        }
        return false;
    } catch (error) {
        console.log("Appwrite :: api :: updateEmail :: error-->",error);
        return false;
    }
}

export async function sendForgotPasswordLink(email:string){
    const result = {success:true,
    message:"Reset password link sent successfully."}
    try {
        await account.createRecovery(email,`${paths.start_url}${paths.base}/forgot-password/reset`);
        console.log("Appwrite :: api :: sendForgotPasswordLink :: success");
        return result;
    } catch (error) {
        console.log("Appwrite :: api :: sendForgotPasswordLink :: error-->",error);
        return handleException(error);
    }
}

export async function updatePassword({userId,secret,newPassword} : {userId:string,secret:string,newPassword:string}){
    const result = {success:true,
        message:"Pawword updated successfully."}
    try {
        await account.updateRecovery(userId, secret, newPassword, newPassword);
        console.log("Appwrite :: api :: updatePassword :: success");
        return result;
    } catch (error) {
        console.log("Appwrite :: api :: updatePassword :: error-->",error);
        return handleException(error);
    }
}


export async function signOutAccount(){
    const result = {success:true,
        message:"Pawword updated successfully."}
    try {
        const promise = await account.deleteSessions();
        console.log("Appwrite :: api :: signOutAccount :: success-->",promise);
        return result;
        
    } catch (error) {
        console.log("Appwrite :: api :: signOutAccount :: error-->",error);
        return handleException(error);
    }
}


export async function createPost(post: INewPost) {
    try {
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
  
      if (!uploadedFile) throw Error;
  
      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      // Create post
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
        {
          creator: post.userId,
          caption: post.caption,
          imageUrl: fileUrl,
          imageId: uploadedFile.$id,
          location: post.location,
          tags: tags,
        }
      );
  
      if (!newPost) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }

  export async function uploadFile(file: File) {
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
      );
  
      return uploadedFile;
    } catch (error) {
      console.log(error);
    }
  }

  export function getFilePreview(fileId: string) {
    try {
      const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      console.log(error);
    }
  }

  export async function deleteFile(fileId: string) {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
  
      return { status: "ok" };
    } catch (error) {
      console.log(error);
    }
  }

  export async function searchPosts(searchTerm: string) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.search("caption", searchTerm)]
      );
  
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
  

  export async function updatePost(post: IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0;
  
    try {
      let image = {
        imageUrl: post.imageUrl,
        imageId: post.imageId,
      };
  
      if (hasFileToUpdate) {
        // Upload new file to appwrite storage
        const uploadedFile = await uploadFile(post.file[0]);
        if (!uploadedFile) throw Error;
  
        // Get new file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
          await deleteFile(uploadedFile.$id);
          throw Error;
        }
  
        image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      //  Update post
      const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        post.postId,
        {
          caption: post.caption,
          imageUrl: image.imageUrl,
          imageId: image.imageId,
          location: post.location,
          tags: tags,
        }
      );
  
      // Failed to update
      if (!updatedPost) {
        // Delete new file that has been recently uploaded
        if (hasFileToUpdate) {
          await deleteFile(image.imageId);
        }
  
        // If no new file uploaded, just throw error
        throw Error;
      }
  
      // Safely delete old file after successful update
      if (hasFileToUpdate) {
        await deleteFile(post.imageId);
      }
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getRecentPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(20)]
      );
  
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error);
    }
  }


  export async function likePost(postId: string, likesArray: string[]) {
    try {
      const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId,
        {
          likes: likesArray,
        }
      );
  
      if (!updatedPost) throw Error;
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }
  

  export async function savePost(userId: string, postId: string) {
    try {
      const updatedPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.savesCollectionId,
        ID.unique(),
        {
          user: userId,
          post: postId,
        }
      );
  
      if (!updatedPost) throw Error;
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }

  export async function deleteSavedPost(savedRecordId: string) {
    try {
      const statusCode = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.savesCollectionId,
        savedRecordId
      );
  
      if (!statusCode) throw Error;
  
      return { status: "Ok" };
    } catch (error) {
      console.log(error);
    }
  }
  