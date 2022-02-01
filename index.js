const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;

// middleWare

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rdy9l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database = client.db('carMeachanic');
        const servicesCollection = database.collection('services');
        // GET API
        app.get('/services', async(req, res) =>{
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
        // GET SINGLE SERVICES
        app.get('/services/:id', async(req, res)=>{
            const id = req.params.id;
            console.log('Geting specific service', id);
            const query = {_id: ObjectId(id)};
            const service = await servicesCollection.findOne(query);
            res.json(service);
        });

        // POST API

        app.post('/services', async(req, res) =>{
            const service = req.body;
            console.log('Hit the post api', service);
           
            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result);
        });
        // DELETE API
        app.delete('/services/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await servicesCollection.deleteOne(query);
        })
    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir);


app.get('/', (req, res)=> {
    res.send('Running Genious Server');
});
app.get('/hello', (req, res) =>{
    res.send('hello updated here')
})

app.listen(port, ()=>{
    console.log('Running Genious Server on port', port);
})

/*
one time :
1. heroku account open
2.heroku software install
3.

Every projects
1.git init 
2. .gitignore(node_module, .env)
3.push everythig to git
4. make sure you  have this script :m
5. make sure put process.env.PORT IN FONT OF YOUR PORT NUMBER 
6.heroku login
7.heroku create(only time for a projects)
8. commend : git push heroku main

update:
1.save evrything
2. git add, git commit-m", git push
3.git push heroku main

*/