import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';
import cmd from 'node-cmd';

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  db.dropCollection("abilities", (err, result) => {
    db.createCollection(
      "abilities",
      {
        validator: {
          $and: [
            { ability_id: { $type: "int" } },
            { ability_name: { $type: "string" } },
            { description: { $type: "string" } }
          ]
        }
      },
      (err, result) => {
        cmd.run('mongoimport --db pokemonParty --collection abilities --type csv --headerline --file data/abilitydata.csv');
      }
    );
  });

  db.dropCollection("pokemon", (err, result) => {
    db.createCollection(
      "pokemon",
      {
        validator: {
          $and: [
            { id: { $type: "int" } },
            { name: { $type: "string" } },
            { ability: { $type: "string" } },
            { Evolve: { $type: "string" } }
          ]
        }
      },
      (err, result) => {
        cmd.run('mongoimport --db pokemonParty --collection pokemon --type csv --headerline --file data/pokemondata.csv');
      }
    );
  });

  db.dropCollection("parties", (err, result) => {
    db.createCollection("parties");
  });

  db.close();
});
