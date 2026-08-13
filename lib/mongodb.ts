import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI || "";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
   
  var mongooseCache: MongooseCache | undefined;
}

const getCache = (): MongooseCache => {
  if (!global.mongooseCache) {
    global.mongooseCache = { conn: null, promise: null };
  }
  return global.mongooseCache;
};

export async function connectToDatabase(): Promise<typeof mongoose> {
  const cache = getCache();

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    const opts = {
      bufferCommands: false,
      // Atlas free tier needs more time on cold starts — 1500ms was too aggressive
      serverSelectionTimeoutMS: 5000,
      // Keep a pool of 2–10 connections so warm instances reuse sockets immediately
      maxPoolSize: 10,
      minPoolSize: 2,
      // Ping Atlas every 10s to prevent idle connection drops between serverless invocations
      heartbeatFrequencyMS: 10000,
      socketTimeoutMS: 20000,
    };

    cache.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => mongooseInstance)
      .catch((err) => {
        cache.promise = null;
        return mongoose;
      });
  }

  try {
    cache.conn = await cache.promise;
  } catch {
    cache.promise = null;
  }

  return mongoose;
}
