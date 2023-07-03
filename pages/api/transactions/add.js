import clientPromise from "../../../lib/mongodb"
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DBNAME);
    const { user } = await getSession(req, res);

    switch (req.method) {
        case "POST":
            let bodyObject = req.body;
            console.log('bodyObject without jsonParser', bodyObject)
            bodyObject.user = user.email
            let myPost = await db.collection("transactions").insertOne(bodyObject);
            res.json(myPost);

            break;
        // case "GET":
        //     const transactions = await db.collection("transactions").find({}).toArray();
        //     res.status(200).json({ transactions: transactions });
        //     break;
    }
}
)