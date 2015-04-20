var getReddit = function () {
	var url = 'http://www.reddit.com/search.json?q=udacity+degree&restrict_sr=off&sort=new&t=all&limit=20';

	HTTP.get(url, function(error, result) {
		if(!error) {
			console.log('Reddit data: %O', result.data.data.children);

			var reddit_results = result.data.data.children,
					num_results = 0;
//			reedit_results.forEach(function (result) {

//				// check if result is already in db
//				if(isUniqueResult()) {
//					Links.insert({
//						title: result.title,
//						url: result.url,
//						source: 'Reddit',
//						//date_added: new Date(1000 * post.created),
//						date_added: moment(1000 * result.created).format('MMMM Do YYYY, h:mm:ss a'),
//						created_by: 'Admin',
//						clicks: 0
//					});
//				}

//			})

		}
		else console.log('Uhoh, reddit problem');
	});
}();


Template.post_list.helpers({
	post: function () {

		return Links.find();
	},

	oneClickLabel: function () {
		return this.clicks === 1;
	}

});

Template.post_list.events({
	'click .post a': function () {
		Links.update(this._id, {$inc: {clicks: 1}});
	}
});


// counter starts at 0
Session.setDefault('counter', 0);


