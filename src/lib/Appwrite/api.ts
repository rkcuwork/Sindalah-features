import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, handleException, ID } from "./Config";
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
