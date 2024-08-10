const PORT = 8000
const express = require("express")
const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const uri = 'mongodb+srv://kazimhussain2003:overWRITE_77@cluster0.zirmm28.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Hello to my')
})

app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    console.log(req.body)
    const { email, password } = req.body

    const generateuserID = uuidv4()
    const hashedpassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            return res.status(409).send('User already exists')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generateuserID,
            email: sanitizedEmail,
            hashedpassword: hashedpassword
        }

        const insertedUser = await users.insertOne(data)

        res.status(201).json({ userId: generateuserID, email: sanitizedEmail })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    } finally {
        await client.close()
    }
})

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    console.log(req.body)
    const { email, password } = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne({ email })

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.hashedpassword)

            if (passwordMatch) {
                return res.status(200).json({ userId: user.user_id, email: user.email })
            } else {
                return res.status(401).send('Invalid password')
            }
        } else {
            return res.status(404).send('User not found')
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    } finally {
        await client.close()
    }
})

app.post('/confessions', async (req, res) => {
    const client = new MongoClient(uri);
    console.log(req.body);
    const { confession } = req.body;

    try {
        await client.connect();
        const database = client.db('app-data');
        const confessions = database.collection('confessions');

        const data = {
            Confession_Statement: confession,
        };

        const result = await confessions.insertOne(data);

        res.status(201).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.get('/carousel', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('app-data');
        const confessions = database.collection('confessions');

        // Use projection to return only the Confession_Statement field
        const returnedConfessions = await confessions.find({}, { projection: { Confession_Statement: 1, _id: 0 } }).toArray();
        
        res.send(returnedConfessions);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    } finally {
        await client.close()
    }
})

app.listen(PORT, () => console.log('Server running on PORT ' + PORT))
