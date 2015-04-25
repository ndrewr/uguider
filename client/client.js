// Client
var LINKS_INCREMENT = 10;
Session.setDefault('links_limit', LINKS_INCREMENT);
Deps.autorun(function () {
	Meteor.subscribe('links', Session.get('links_limit'));
});

var fetchMorePosts = function () {
	var threshold,
			target = document.getElementById('morePostsAvailable');

	// if not hidden there are more posts to fetch
	if (target) {
		threshold = window.pageYOffset + window.innerHeight - target.scrollHeight;

		// from You May Not Need jQuery
		var target_offset = target.getBoundingClientRect().top + document.body.scrollTop;

		if (target_offset < threshold) {
			console.log('hi');
			if (!target.getAttribute('data-visible')) {
//				 console.log("target became visible (inside viewable area)");
				target.setAttribute('data-visible', true);
				// moved to click handler
				// Session.set('links_limit', Session.get('links_limit') + LINKS_INCREMENT);
			} else {
				if (target.getAttribute('data-visible')) {
//					 console.log("target became invisible (below viewable arae)");
					target.setAttribute('data-visible', false);
				}
			}
		}
	}
}
window.addEventListener('scroll', fetchMorePosts);

Template.post_form.helpers({

});

Template.post_form.events({
	'submit form': function (event) {
		event.preventDefault();

		var form = event.target;

		Links.insert({
			title: form.title.value,
			url: form.url.value,
			source: form.source.value,

//			date_added: moment().format('MMMM Do YYYY, h:mm:ss a'),
			date_added: Date.parse(new Date()),

			created_by: '?',
			clicks: 0,
			hp: 2
		});

		form.url.value = '';
		form.title.value = '';
	}
});

Template.post_list.helpers({
	post: function () {

		return Links.find({}, {sort: {hp: -1, date_added: -1}});
	},

	oneClickLabel: function () {
		return this.clicks === 1;
	},

	// control visibility of 'load links' btn
	moreLinks: function () {
		return !(Links.find().count() < Session.get("links_limit"));
	},

	sourceIcon: function () {
		return this.source.toLowerCase();
	},

	getDate: function () {
		return moment(this.date_added).format('MMMM Do YYYY, h:mm:ss a');
	}

});

Template.post_list.events({
	'click .post a': function () {
		Links.update(this._id, {$inc: {clicks: 1}});
	},
	// load more results on click; uses spin.js on 1.5s delay
	'click #morePostsAvailable': function () {
		var spinner = new Spinner().spin();
		var target = document.getElementById('morePostsAvailable');
		target.querySelector('span').style.opacity = 0;
		target.appendChild(spinner.el);
		setTimeout(function () {
			Session.set('links_limit', Session.get('links_limit') + LINKS_INCREMENT);
			spinner.stop();
		}, 1500);
	}

});

Template.lifebar.helpers({
	// one helper to style each 'life unit'
	firstHeart: function () {
		return this.hp > 0;
	},
	secondHeart: function () {
		return this.hp > 1;
	},
	thirdHeart: function () {
		return this.hp > 2;
	},
	upButtonDisable: function () {
		if (this.hp > 2) return "disabled";
	},
	downButtonDisable: function () {
		if (this.hp < 1) return "disabled";
	}

});

Template.lifebar.events({
	'click .post__lifebar__control': function (event) {
		// update target post's HP value in minimongo
		var control = event.currentTarget.dataset.control;
		if(control === 'up')
			Links.update(this._id, {$inc: {hp: 1}});
		// else check if hearts at 0
		else if (this.hp - 1 === 0) {
			Links.remove(this._id);
		} else {
			Links.update(this._id, {$inc: {hp: -1}});
		}
	}
});


