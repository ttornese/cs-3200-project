import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  mdb = db;
});

const router = express.Router();

router.get('/parties', (req, res) => {
  let parties = {};
  mdb.collection('parties').find({})
    .each((err, party) => {
      assert.equal(null, err);

      if (!party) { // processed all
        res.send({ parties });
        return;
      }

      parties[party.party_id] = party;
    });
});

router.get('/parties/:partyId', (req, res) => {
  mdb.collection('parties')
    .findOne({ party_id: Number(req.params.partyId) })
    .then(party => res.send(party))
    .catch(console.error)
});

router.get('/pokemon', (req, res) => {
  let pokemon = {};
  mdb.collection('pokemon').find({})
    .each((err, monster) => {
      assert.equal(null, err);

      if (!monster) { // processed all
        res.send({ pokemon });
        return;
      }

      pokemon[monster.id] = monster;
    });
});

router.get('/pokemon/:pokemonId', (req, res) => {
  mdb.collection('pokemon')
    .findOne({ id: Number(req.params.pokemonId) })
    .then(pokemon => res.send(pokemon))
    .catch(console.error)
});


router.get('/ability/:abilityName', (req, res) => {
  mdb.collection('abilities')
    .findOne({ ability_name: req.params.abilityName })
    .then(ability => res.send(ability))
    .catch(console.error)
});

router.post('/parties', (req, res) => {
  const party_id = req.body.partyId;
  mdb.collection('parties').insertOne({ party_id })
    .then(result =>{
      res.send({party: {party_id}})
    });
});

router.post('/parties/:partyId', (req, res) => {
  const partyId = req.body.partyId;

  if (Object.keys(req.body).length == 2) {
    const pokemonName = req.body.pokemonName;

    mdb.collection('parties').updateOne(
      { party_id: partyId },
      { $push: { pokemon: pokemonName } }
    ).then(result => {
      mdb.collection('parties').findOne({party_id: partyId}).then(doc => {
        res.send({party_id: partyId, pokemon: doc.pokemon});
      });
    });
  } else {
    mdb.collection('parties').deleteOne(
      { party_id: partyId }
    ).then(result => {
      mdb.collection('parties').find({}).toArray((err, results) => {
        let resultObj = {};
        for (let i = 0; i < results.length; i++) {
          resultObj[results[i].party_id] = results[i];
        }

        res.send(resultObj);
      });
    });
  }
});

export default router;
