const Words = new Mongo.Collection('words');
export default Words;




/*
// On Client and Server
const Players = new Mongo.Collection('players'),
  PlayersIndex = new EasySearch.Index({
    collection: Players,
    fields: ['name'],
    engine: new EasySearch.Minimongo()
});
export default Players
*/
