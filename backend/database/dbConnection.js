import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "TSp-Line",
    });

    console.log("Connected to database!");

    // Wait for native driver DB object
    const db = mongoose.connection.db;
    const collName = "employeeemails"; // change only if your collection name differs

    // Make sure collection exists
    const collections = await db.listCollections({ name: collName }).toArray();
    if (collections.length === 0) {
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
      } catch (dropErr) {
        console.error(`❌ Failed to drop index "${emailIndex.name}":`, dropErr.message || dropErr);
      }
    } 

  } catch (err) {
    console.log(`Some error occurred while connecting to database: ${err.message || err}`);
  }
};
