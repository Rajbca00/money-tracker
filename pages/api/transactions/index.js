import clientPromise from "../../../lib/mongodb"
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { ObjectId } from 'mongodb';


export default withApiAuthRequired(async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DBNAME);
    const { user } = await getSession(req, res);
    
    switch (req.method) {
        // case "POST":
        //     let bodyObject = JSON.parse(req.body);
        //     let myPost = await db.collection("posts").insertOne(bodyObject);
        //     res.json(myPost.ops[0]);
        //     break;
        case "GET":
            const transactions = await db.collection("transactions").find({}).toArray();
            const transformedData = transactions.map(item => ({
                ...item,
                _id: item._id.toString(),
              }));
            res.status(200).json({ transactions: transformedData });
            break;
    }
}
)