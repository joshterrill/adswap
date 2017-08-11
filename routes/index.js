const Router = require('express').Router
const mongodb = require('mongodb');

module.exports = (db) => {
	const api = Router();

	api.get('/', (req, res) => {  
	    res.render('home');
	});

	api.post('/monitor/:url', (req, res) => {
		const url = req.params.url;
		const info = req.body.info;
		db.collection('analytics').findOne({'site': url}, (error, doc) => {
			if (error) res.json({error});
			if (!doc) {
				db.collection('analytics').insertOne({'site': url, 'visitorInfo': [info], 'hits': 1}, (error, inserted) => {
					if (error) res.json({error});
					res.json({'status': 'insert', 'success': true});				
				});
			} else {
				const visitorInfo = doc.visitorInfo
				const hits = doc.hits + 1;
				visitorInfo.push(info);
				db.collection('analytics').updateOne({'_id': new mongodb.ObjectID(doc._id)}, 
					{
						$set: {
							hits,
							visitorInfo
						}
					}, (error, result) => {
						if (error) res.json({error});
						res.json({'status': 'update', success: true});
				});
			}
		});
	});

	api.get('/list', (req, res) => {
		db.collection('analytics').find().toArray((e,data) => {
			res.json({data})
		});
	});

	api.get('/list/:url', (req, res) => {
		const url = req.params.url;
		db.collection('analytics').find({'site': url}).toArray((error, data) => {
			if (error) res.json({error});
			res.json({data});
		});
	});

	return api;
}