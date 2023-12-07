import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.uri = `mongodb://${this.host}:${this.port}/${this.database}`;
    this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect();
    this.makeRef = this.client.db();
  }

  isAlive() {
    try {
      const connected = this.client.isConnected();
      return connected;
    } catch (err) {
      console.error(`Connection failed: ${err}`);
      return false;
    }
  }

  async nbUsers() {
    if (!this.makeRef) {
      throw new Error('No reference made to the database');
    }
    try {
      const collection = await this.makeRef.collection('users');
      const countAllUser = await collection.countDocuments();
      return countAllUser;
    } catch (err) {
      //console.error(`This Error occurred while counting users doc: ${err}`);
      throw err;
    }
  }

  async nbFiles() {
    if (!this.makeRef) {
      throw new Error('No reference made to database');
    }
    try {
      const collection = await this.makeRef.collection('files');
      const countAllFile = await collection.countDocuments();
      return countAllFile;
    } catch (err) {
     // console.error(`This Error occurred while counting files doc: ${err}`);
      throw err;
    }
  }
}
const dbClient = new DBClient();
module.exports = dbClient;
