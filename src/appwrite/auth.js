import conf from '../conf/conf.js';
import { Client, Account, ID} from "appwrite";

export class AuthService{
    client = new Client();
    account; // why not new Account

    constructor(){
        this.client
        .setEndpoint( conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
         
    }
    // why make inside
    // can we use promise , fetch and how  
    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                // call another method 
                return this.login({email, password});
            }else {
                return userAccount
            }

        }catch(error){
            throw error;
        }

    }
    async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
    async getCurrentUser() {
  try {
    return await this.account.get();
  } catch (error) {
    if (error.code === 401) {
      return null;
    }

    console.error("Could not get current user:", error);
    return null;
  }
}
   async logout() {
  try {
    await this.account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}

}

const authService = new AuthService();

export default authService
