import express from "express";


const app = express();
const port = 3000;
app.use(express.static("public"));



// Set EJS as the view engine
app.set('view engine', 'ejs');

// Body parser middleware to handle POST requests
app.use(express.urlencoded({ extended: false }));

// Array to store blog posts (in-memory storage for this version)
let posts = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.post('/create', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const post = posts[id];
  res.render('edit', { id, post });
});

app.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  posts[id] = { title, content };
  res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

