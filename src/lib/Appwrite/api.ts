import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, ID } from "./Config";
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
        // console.log("session is ==> ",session);
        return session;
        
    } catch (error) {
        console.log("Appwrite :: api :: signInAccount :: error-->",error);
    }
}

export async function getCurrentUser() {
    try {
      
        const currentAccount = await account.get();
        // console.log('currentAccount --> ', currentAccount)

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
        console.log("Appwrite :: api :: getCurrentUser :: success-->",currentUser);
        return currentUser.documents[0];
    } catch (error) {
        console.log("Appwrite :: api :: getCurrentUser :: error-->",error);

    }
}

export async function sendEmailVerificationLink() {
    try{
        const email = await account.createVerification(`http://localhost:5173${paths.base}/verification/verify-email`);
        console.log("Appwrite :: api :: sendEmailVerificationLink :: success --> ",email);
        return true;
    }
    catch(error){
        console.log("Appwrite :: api :: sendEmailVerificationLink :: error-->",error);
        return false;
    }
    
    
}

export async function verifyEmail(userId:string,secret:string){
    try{
        const promise = await account.updateVerification(userId, secret);
        console.log("Appwrite :: api :: verifyEmail :: success-->",promise);
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
            console.log("Appwrite :: api :: isEmailVerified :: success-->",user);
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
        const promise = await account.updateEmail(newEmail, password);
        await updateUserDatabase({email:newEmail});
        console.log("Appwrite :: api :: updateEmail :: success-->",promise);
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
            const promise = await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, current_user.$id,user);
            console.log("Appwrite :: api :: updateUserDatabase :: success-->",promise);
            return true;
        }
        return false;
    } catch (error) {
        console.log("Appwrite :: api :: updateEmail :: error-->",error);
        return false;
    }
}