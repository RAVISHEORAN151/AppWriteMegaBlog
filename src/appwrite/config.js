import conf from '../conf/conf.js';
import {Client, ID, Databases, Storage, Query, Account} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
          this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
            this.account = new Account(this.client);  
    }
     async createAccount({ email, password, name }) {
        return await this.account.create(ID.unique(), email, password, name);
    }

    async login({ email, password }) {
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.log("LOGIN ERROR MESSAGE:", error.message);
        console.log("LOGIN ERROR CODE:", error.code);
        throw error;
    }
}

    async getCurrentUser() {
        return await this.account.get(); 
    }

    async logout() {
        return await this.account.deleteSession("current");
    }

    async createPost({title, slug, content, featureImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf. appwriteDatabaseId,
                conf. appwriteCollectionId,
                slug,
                { // object
                    title,
                    content,
                    featureImage,
                    status,
                    userId,
                }
            );

        } catch (error){
            console.log("Appwrite service :: createPost :: error", error);
        }

    }

    async updatePost(slug, {title, content, featureImage, status, userId}){
        try{
            return await this.databases.updateDocument(
                conf. appwriteDatabaseId,
                conf. appwriteCollectionId,
                slug,
                { // object
                    title,
                    content,
                    featureImage,
                    status,
                    userId,
                }
            );

        } catch (error){
            console.log("Appwrite service :: updatePost :: error", error);
        }

    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf. appwriteDatabaseId,
                conf. appwriteCollectionId,
                slug
            )
            return true

        } catch (error){
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }

    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf. appwriteDatabaseId,
                conf. appwriteCollectionId,
                slug
            )
            
        } catch (error) {
             console.log("Appwrite service :: getPost :: error", error);
            return false
            
        }

    }

    async getPosts(Queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf. appwriteDatabaseId,
                conf. appwriteCollectionId,
                Queries,
                // use can write here  [Query.equal("status","active")]

            )
            
        } catch (error) {
             console.log("Appwrite service :: getPosts :: error", error);
            return false
            
        }

    }


    // file upload service
    // not only give name of file give blob
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
            
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
            
        }
    }

   getFileView(fileId){
    const url = this.bucket.getFileView(
        conf.appwriteBucketId,
        fileId
    )

    console.log("FILE ID:", fileId)
    console.log("FILE URL:", url.toString())

    return url
}



}

const service  = new Service()
export default service