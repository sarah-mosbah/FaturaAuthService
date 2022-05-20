import mongoose from 'mongoose';

const uri = process.env.DBURI;
export async function connect() {
    try {
        await mongoose.connect(uri);
        const db = mongoose.connection;
        db.on('disconnected', (err) => {
            console.log(`MongoDB is  disconnected ${err.message}`);
        });
        console.log(`MongoDB is now connected on ${uri}`);

    } catch (err) {
        console.log(`MongoDB is  disconnected ${err.message}`);
        process.exit(-1);
    }

}