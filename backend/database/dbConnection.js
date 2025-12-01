import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "TSp-Line",
    });

    console.log("✅ Connected to database successfully!");

    // Wait for native driver DB object
    const db = mongoose.connection.db;
    const collName = "employeeemails"; // change only if your collection name differs

    // Make sure collection exists
    const collections = await db.listCollections({ name: collName }).toArray();
    if (collections.length === 0) {
      console.log(`ℹ️  Collection '${collName}' does not exist yet`);
      return;
    }

    // Get current indexes
    const indexes = await db.collection(collName).indexes();

    // Find the index that enforces uniqueness on email (key could be { email: 1 } but name might vary)
    const emailIndex = indexes.find(idx => {
      // check key AND unique flag to be safe
      const isEmailKey = idx.key && idx.key.email === 1;
      const isUnique = !!idx.unique;
      return isEmailKey && isUnique;
    });

    if (emailIndex) {
      try {
        await db.collection(collName).dropIndex(emailIndex.name);
        console.log(`✅ Dropped unique email index: ${emailIndex.name}`);
      } catch (dropErr) {
        console.error(`❌ Failed to drop index "${emailIndex.name}":`, dropErr.message || dropErr);
      }
    } 

  } catch (err) {
    console.error(`❌ Database connection error: ${err.message || err}`);
    console.error("Stack trace:", err.stack);
    process.exit(1); // Exit the process if DB connection fails
  }
};
