const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qvrwoc0.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const Posts = client.db('socialMedia').collection('posts');
        const About = client.db('socialMedia').collection('about');
        app.post('/post', async (req, res) => {
            const post = req.body;
            // console.log(post);
            const result = await Posts.insertOne(post);
            res.send(result);
        });
        app.post('/about', async (req, res) => {
            const about = req.body;
            console.log(about);
            const result = await About.insertOne(about);
            res.send(result);
        })

        app.get('/allPosts', async (req, res) => {
            const query = {};
            const allPosts = await Posts.find(query).toArray();
            res.send(allPosts)

        });
        app.get('/allPosts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const post = await Posts.findOne(query);
            res.send(post);
        })



    }
    finally {

    }
}
run().catch(console.log)





app.get('/', (req, res) => {
    res.send('web application server is running')
});
app.listen(port, () => {
    console.log(`simple node server running on ${port}`)
})