const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite = require('sqlite3');
const unflatten = require('flat').unflatten;

const dbFilePath = path.join(__dirname, 'dev.db');
const db = new sqlite.Database(dbFilePath, sqlite.OPEN_READWRITE);

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  })
);

const ALL_USERS_QUERY = `
SELECT * 
FROM user;
`;

app.get('/users', async (req, res, next) => {
  db.all(ALL_USERS_QUERY, (err, users) => {
    if (err) {
      next(err);
    }

    res.json(users);
  });
});

const ALL_COMMENTS_QUERY = `
SELECT c.*, u.id as 'user.id', u.name as 'user.name'
FROM comment c JOIN user u ON c.user_id = u.id
`;

app.get('/comments', async (req, res, next) => {
  db.all(ALL_COMMENTS_QUERY, (err, rows) => {
    if (err) {
      next(err);
    }

    const comments = rows.map(unflatten);
    res.json(comments);
  });
});

const INSERT_COMMENT_QUERY = `
INSERT INTO comment
  (content, user_id)
VALUES
  (?, ?);
`;

app.post('/comments', (req, res, next) => {
  const { user_id, content } = req.body;
  db.run(INSERT_COMMENT_QUERY, [content, user_id], (err) => {
    if (err) {
      next(err);
    }

    res.sendStatus(204);
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.toString() });
});

app.listen(3001, () => {
  console.log(`Server ready at http://localhost:3001`);
});

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 2001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
