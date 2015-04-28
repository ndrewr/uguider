// server.js
// pubs
Meteor.publish('links', function (limit) {
	return Links.find({}, { limit: limit });
});

var isUniqueResult = function (result, source) {
	switch (source) {
		case 'Reddit':
			//Links.findOne({id: result.id});
			return Links.find({reddit_id: result.id}, {limit: 1}).count() == 0;

		case 'Quora':
			// quora result objects only have a title and url
			return Links.find({title: result.text}, {limit: 1}).count() ==0;

		default:
			// User-submitted posts...can only check url
			return Links.find({url: result.url}, {limit: 1}).count() == 0;
	}
}

var getReddit = function (limit) {
	// query udacity nano* ... better than *degree or nano
	// no diff btwn degree and *degree
	// if I join the udacity query with Mooc query using an OR, I lose results
	// so....two seperate queries?
	var url = 'http://www.reddit.com/search.json?q=udacity+nano*&restrict_sr=off&sort=new&t=all&limit=10';

	if(limit) {
		url = url.replace(/\d{2}/, limit); // if limit specified splice it in
	}

	HTTP.get(url, function(error, reddit_things) {
		if(!error) {
			var reddit_results = reddit_things.data.data.children;

			reddit_results.forEach(function (result) {
				// check if result is already in db
				var reddit_thing = result.data;
				if(isUniqueResult(reddit_thing, 'Reddit')) {
					Links.insert({
						title: reddit_thing.title,
						url: reddit_thing.url,
						source: 'Reddit',
						reddit_id: reddit_thing.id,
//						date_added: moment(1000 * reddit_thing.created).format('MMMM Do YYYY, h:mm:ss a'),
						date_added: (1000 * reddit_thing.created), // reddit stores abbrev date; must multiply
						created_by: 'U-Guider',
						clicks: 0,
						hp: 2,
						lastUpdatedBy: 'Admin'
					});
				}
			});
		}
	});
}

// currently scrapes Quora with Kimono...can set url on kimono api to check for 'time=day' updates
// udacity nanodegree ... better results than udacity+nano
// udacity degree
// udacity certificate
var getQuora = function () {
	//use kimono api
	var url = 'https://www.kimonolabs.com/api/8in7xz24?apikey=NItZalq5HdOgu1YN5C4AkAWFe7OMGzn0';
	HTTP.get(url, function (error, quora_topics) {
		if(!error) {
			// result is in unparsed json
			var questions = JSON.parse(quora_topics.content).results.questions;

			questions.forEach(function (quora_result) {
				if(isUniqueResult(quora_result.question, 'Quora')) {
					Links.insert({
						title: quora_result.question.text,
						url: quora_result.question.href,
						source: 'Quora',
//						date_added: moment().format('MMMM Do YYYY, h:mm:ss a'),
						date_added: Date.parse(new Date()),
						created_by: 'U-Guider',
						clicks: 0,
						hp: 2,
						lastUpdatedBy: 'Admin'
					});
				}
			});
		}
	});

// scrape google using npm module
//	var query_string = 'site:quora.com udacity "nano*" OR degree OR mooc-degree';
//	var searchAPI = Meteor.npmRequire('google');
//	searchAPI.resultsPerPage = 25;
//	searchAPI(query_string, function (err, next, links){
//		if (err) console.error('Uh-oh...got bad news: %s', err);
//
////		links.forEach(function(link) {
////			console.log('here is the link structure itself: %O', link);
////			console.log(link.title + ' - ' + link.link); // link.href is an alias for link.link
////			console.log(link.description + "\n");
////		});
//	});

};

// check every hr for new posts
Meteor.setInterval(function () {
	getReddit();
	getQuora();
}, 360 * 1000);
									 
Meteor.startup(function () {
	// code to run on server at startup
	if (Links.find().count() === 0) {
		// test results
//		Links.insert({
//			title: 'Udacity Home',
//			url: 'http://udacity.com',
//			source: 'Other',
//			date_added: moment().format('MMMM Do YYYY, h:mm:ss a'),
//			created_by: 'Andrew R',
//			clicks: 0,
//			hp:3
//		}),
//
//			Links.insert({
//			title: 'Reddit Search | Udacity Degree',
//			url: 'http://www.reddit.com/search?q=udacity+degree&restrict_sr=off&sort=new&t=all&limit=20',
//			source: 'Reddit',
//			date_added: moment().format('MMMM Do YYYY, h:mm:ss a'),
//			created_by: 'Andrew R',
//			clicks: 0
//		});
	}

	getReddit(20);
	getQuora();

});
