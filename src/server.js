import express from "express";
import { MongoClient } from "mongodb"; // Allows us to connect to local database
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '/build')));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
    });
    const db = client.db("pet-liberation");

    await operations(db);

    client.close();
  } catch (error) {
    res.status(500).json({message: "something went wrong", error});
  }
};

app.get('/api/articles/:name', async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;

    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    res.status(200).json(articleInfo);
  }, res);
});

app.post('/api/articles/:name/upvote', async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        '$set': {
          votes: articleInfo.votes + 1,
        },
      }
    );

    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.post("/api/articles/:name/downvote", async (req, res) => {
  const articleName = req.params.name;
  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    if (articleInfo.votes > 0) await db.collection("articles").updateOne(
        { name: articleName },
        {
          $set: {
            votes: articleInfo.votes - 1,
          },
        }
      );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.post('/api/articles/:name/add-comment', (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    res.status(200).send(updatedArticleInfo);
  }, res);
});

app.post('/api/articles/:name/remove-comment/:id', (req, res) => {
  console.log(req.params);
  const { articleName, id } = req.params;
  withDB(async (db) => {
    const articleInfo = await db.collection("articles").findOne({ name: articleName });
    await db.collection("articles").updateOne(
      {name: articleName},
      {
        $set: {
          comments: articleInfo.comments.filter((comment) => comment.id)
        }
      }
    )    
  })
})

app.post('/api/articles/:name/reset-comments', (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: [],
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    res.status(200).send(updatedArticleInfo);  
  }, res);
});

app.get('/api/articles/:name/comments', (req, res) => {
  const articleName = req.params.name;
  const comments = articlesInfo[articleName].comments;
  res.send(articlesInfo[articleName]);
})

// app.get('/hello', (req, res) => res.send('Hello'));
// app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`));
// app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!`));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(8000, ()=> console.log('Listening on port 8000'));