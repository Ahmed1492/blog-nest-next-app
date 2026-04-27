import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) throw new Error('Missing MONGODB_URL in .env.local');

// Cache connection across hot-reloads in dev and serverless invocations
let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, { bufferCommands: false });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
