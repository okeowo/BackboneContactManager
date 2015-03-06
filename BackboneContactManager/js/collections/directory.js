var Directory = Backbone.Collection.extend({
	model: Contact,
	localStorage: new Backbone.LocalStorage("contact-directory")
});