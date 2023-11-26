import { Client, Databases, ID, Query } from "appwrite";
import { environments } from "../constants/environments";
import { TalentSubmissionForm, userModal } from "../utils/types";

export const appwriteClient = new Client();

const { 
  APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_ENDPOINT,
} = environments;
 
 class AppwriteService {
  databases: Databases;

  constructor(){
    appwriteClient
      .setEndpoint(APPWRITE_PROJECT_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID)
      
    this.databases = new Databases(appwriteClient);
  }

  async getDBData(databaseID:string, collectionID:string) {
    try {
      return (await this.databases.listDocuments(databaseID, collectionID,[Query.limit(100), Query.offset(0)])).documents
    } catch (error:any) {
      console.log('getDBData -- ', error.message);
    }
  }
   
  async storeDBdata(databaseID: string, collectionID: string, data:userModal | TalentSubmissionForm) {
    try {
      return this.databases.createDocument(databaseID, collectionID, ID.unique(),data)
    } catch (error:any) {
      console.log('storeDBdata -- appwrite class -- ', error.message)
    }
  }
}

const DatabaseService = new AppwriteService();
export default DatabaseService