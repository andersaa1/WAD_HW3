const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
// We need to include "credentials: true" to allow cookies to be represented 
// Also "credentials: 'include'" need to be added in Fetch API in the Vue.js App

app.use(express.json()); // Parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

const secret = "gdgdhdbcb770785rgdzqws"; // use a stronger secret
const maxAge = 60 * 60; //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

// is used to check whether a user is authinticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    //console.log("token " + token);
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified 
                    console.log('author is authinticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) { 
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        console.log(req.body);
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

/// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

// Create a new post
app.post('/posts', authenticateToken, async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const author = req.user.id;
        const timestamp = new Date();
        const newPost = await pool.query(
            "INSERT INTO posts (author, title, content, timestamp, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [author, title, content, timestamp, image]
        );
        res.status(201).json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// Read all posts
app.get('/posts', authenticateToken, async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM posts");
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// Read a single post by ID
app.get('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM posts WHERE postID = $1", [id]);
        if (post.rows.length === 0) return res.status(404).json({ error: "Post not found" });
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// Update a post by ID
app.put('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { author, title, content, timestamp, image } = req.body;
        const updatedPost = await pool.query(
            "UPDATE posts SET author = $1, title = $2, content = $3, timestamp = $4, image = $5 WHERE postID = $6 RETURNING *",
            [author, title, content, timestamp, image, id]
        );
        if (updatedPost.rows.length === 0) return res.status(404).json({ error: "Post not found" });
        res.json(updatedPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// Delete a post by ID
app.delete('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        // Check if the authenticated user is the author of the post
        const post = await pool.query("SELECT * FROM posts WHERE postID = $1", [id]);
        if (post.rows.length === 0) return res.status(404).json({ error: "Post not found" });
        if (post.rows[0].author !== user.id) return res.status(403).json({ error: "You are not authorized to delete this post" });

        const deletedPost = await pool.query("DELETE FROM posts WHERE postID = $1 RETURNING *", [id]);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// Delete all posts by a specific user
app.delete('/posts', authenticateToken, async (req, res) => {
    try {
        const deletedPosts = await pool.query("DELETE FROM posts WHERE author = $1 RETURNING *", [req.user.id]);
        if (deletedPosts.rows.length === 0) return res.status(404).json({ error: "No posts found for this author" });
        res.json({ message: "All posts by the author deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});