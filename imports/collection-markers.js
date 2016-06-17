const Markers = new Mongo.Collection('markers');  
    MarkersIndex = new EasySearch.Index({
    collection: Markers,
    fields: ['name'],
    allowedFields: ['name', '_id', 'lat', 'lng'],
    defaultSearchOptions: {
    	limit: 200 // could also have skip and props
    },
    engine: new EasySearch.Minimongo()
});
export default Markers;
