import { environments } from "../constants/environments";
import { Client, Databases, ID, Query, Account } from "appwrite";
import { FeedbackObject, OpportunitiesFormType, TalentSubmissionForm, userModal } from "../utils/types";

export const appwriteClient = new Client();

const { 
  APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_ENDPOINT,
} = environments;
 
class AppwriteService {
  databases: Databases;
  account: Account;

  constructor(){
    appwriteClient
      .setEndpoint(APPWRITE_PROJECT_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID)
      
    this.databases = new Databases(appwriteClient);
    this.account = new Account(appwriteClient);
  }
  // Account
  async createAccountWithEmail(email:string, password:string) {
    try {
      const accountResponse = await this.account.create(ID.unique(),email,password)
      return accountResponse;
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
  async getDBData(databaseID:string, collectionID:string) {
    try {
      return (await this.databases.listDocuments(databaseID, collectionID,[Query.limit(100), Query.offset(0)])).documents
    } catch (error:any) {
      console.log('getDBData -- ', error.message);
    }
  }
  async getDocument(databaseID:string, collectionID:string, documentId:string) {
    try {
      return (await this.databases.getDocument(databaseID, collectionID,documentId)).documents
    } catch (error:any) {
      console.log('getDBData -- ', error.message);
    }
  }
   
  async storeDBdata(databaseID: string, collectionID: string, data:userModal | TalentSubmissionForm | FeedbackObject | OpportunitiesFormType) {
    try {
      return this.databases.createDocument(databaseID, collectionID, ID.unique(),data)
    } catch (error:any) {
      console.log('storeDBdata -- appwrite class -- ', error.message)
    }
  }
}

const DatabaseService = new AppwriteService();
export default DatabaseService