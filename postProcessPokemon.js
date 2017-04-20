db.pokemon.find({}).forEach(function(pokemon) {
     pokemon.types = [pokemon.TypeI, pokemon.TypeII];
     db.pokemon.save(pokemon);
});