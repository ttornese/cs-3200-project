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

router.get('/party', (req, res) => {
  let parties = {};
  mdb.collection('party').find({})
    .each((err, party) => {
      assert.equal(null, err);

      if (!party) { // processed all
        res.send({ parties });
        return;
      }

      parties[party.party_id] = party;
    });
});

router.get('/party/:partyId', (req, res) => {
  console.log(req.params.partyId);
  mdb.collection('party')
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

export default router;
