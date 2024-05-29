import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

// Extend the global object to include the _mongoClientPromise
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

class MongoDBSingleton {
  private static _instance: MongoDBSingleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;

  private constructor() {
    this.client = new MongoClient(uri, options);
    this.clientPromise = this.client.connect();
  }

  public static getInstance(): Promise<MongoClient> {
    if (!this._instance) {
      this._instance = new MongoDBSingleton();
    }

    if (process.env.NODE_ENV === "development") {
      global._mongoClientPromise = this._instance.clientPromise;
    }

    return this._instance.clientPromise;
  }
}

export default process.env.NODE_ENV === "development" &&
global._mongoClientPromise !== null
  ? global._mongoClientPromise
  : MongoDBSingleton.getInstance();
