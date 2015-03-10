var storeVar = localStorage.getItem('contact-directory');

var Directory = Backbone.Collection.extend({
	model: Contact,
	localStorage: new Store("contact-directory")
});