import { Client, Databases, ID, Query, Account } from "appwrite";
import { FeedbackObject, NotificationType, OpportunitiesFormType, TalentSubmissionForm, userModal } from "../utils/types";
import { APPWRITE_DATABASE_ID, APPWRITE_PROJECT_ID, APPWRITE_PROJECT_ENDPOINT, APPWRITE_NOTIFICATION_TOKEN_COLLECTION_ID } from "@env";

export const appwriteClient = new Client()
  .setEndpoint(APPWRITE_PROJECT_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
 
class AppwriteService {
  databases: Databases;
  account: Account;

  constructor(){
    this.databases = new Databases(appwriteClient);
    this.account = new Account(appwriteClient);
  }
  // Account
  async createAccountWithEmail(email:string, password:string) {
    try {
      const accountResponse = await this.account.create(ID.unique(),email,password)
      return accountResponse
    } catch (error) {
    }
  }

  async createAccountWithAuth2() {
    try {
    } catch (error) {
      
    }
  }
  async loginWithEmailAndPassword(email:string, password: string) {
    try {
      const loginResponse = await this.account.createEmailSession(email, password)
      return loginResponse
    } catch (error) {
      
    }
  }

  async logOut() {
    try {
      await this.account.deleteSession('current')
    } catch (error) {
      
    }
  }
  // Data functions, fetch and store
  async getDBData(collectionID:string) {
    try {
      return (await this.databases.listDocuments(APPWRITE_DATABASE_ID, collectionID,[Query.limit(100), Query.offset(0)])).documents
    } catch (error:any) {
      console.log('getDBData -- ', error.message);
    }
  }
  async getDocument(collectionID:string, documentId:string) {
    try {
      return (await this.databases.getDocument(APPWRITE_DATABASE_ID, collectionID,documentId)).documents
    } catch (error:any) {
      console.log('getDBData -- ', error.message);
    }
  }
   
  async storeDBdata(collectionID: string, data:userModal | TalentSubmissionForm | FeedbackObject | OpportunitiesFormType | NotificationType) {
    try {
      return this.databases.createDocument(APPWRITE_DATABASE_ID,collectionID, ID.unique(),data)
    } catch (error:any) {
      console.log('storeDBdata -- appwrite class -- ', error.message)
    }
  }

  async checkDuplicateToken(expoToken:string){
    try {
      const { total } =
        await this.databases.listDocuments(
          APPWRITE_DATABASE_ID,
          APPWRITE_NOTIFICATION_TOKEN_COLLECTION_ID,
          [
            Query.equal('tokenValue', expoToken),
          ])
          .then(response => response)
      
      return total > 0
    } catch (error) {
      console.error('checkDuplicateToken Error -- ')
    }
  }

}

const DatabaseService = new AppwriteService();
export default DatabaseService