import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  db.collection('pokemon').drop();

  db.collection('pokemon').insertMany([
    {
      id: 1,
      name: 'Bulbasaur',
      types: [
        "Grass",
        "Poison"
      ],
      ability: "Overgrow",
      sprite: "http://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png",
      evolution: "Ivysaur"
    },
    {
      id: 2,
      name: 'Ivysaur',
      types: [
        "Grass",
        "Poison"
      ],
      ability: "Overgrow",
      sprite: "http://cdn.bulbagarden.net/upload/7/73/002Ivysaur.png",
      evolution: "Venusaur"
    },
    {
      id: 3,
      name: "Venusaur",
      types: [
        "Grass",
        "Poison"
      ],
      ability: "Overgrow",
      sprite: "http://cdn.bulbagarden.net/upload/a/ae/003Venusaur.png"
    }

  ]).then(response => {
      db.close();
  });
});
