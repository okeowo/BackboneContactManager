// models/contact.js

var Contact = Backbone.Model.extend({
	defaults: {
		photo: 'assets/img/placeholder.png'
	}
});


// models/collections.js

var Directory = Backbone.Collection.extend({
	model: Contact,
	localStorage: new Backbone.LocalStorage('contact-directory')
});


// views/contactview.js

var ContactView = Backbone.View.extend({
	//get the undercore template
	template: _.template($('#contactTemplate').html()),

	//always render on initialize so you don't have to later
	initialize: function (){
		this.render();
	},
	render: function (){
		this.$el.html(this.template(this.model.toJSON()));

		//set popover
		var contactInfoTemplate = _.template($('#contactInfoTemplate').html());
		var popoverTemplate = contactInfoTemplate(this.model.toJSON());
		this.$el.find('a').popover({
			container:'body',
			html: true,
			content: function () {
				return $.parseHTML(popoverTemplate);
			}
		});
		return this;
	}
});


// views/directoryview.js

// contact repo for testing
// should be removed later
var contacts = [{
    name: 'Contact 1',
    address: '1, a street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'family'
}, {
    name: 'Contact 2',
    address: '1, a street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'family'
}, {
    name: 'Contact 3',
    address: '1, a street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'friend'
}, {
    name: 'Contact 4',
    address: '1, a street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'colleague'
}, {
    name: 'Contact 5',
    address: '1, a street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'family'
}, {
    name: 'Contact 6',
    address: '1, a street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'colleague'
}, {
    name: 'Contact 7',
    address: '1, a street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'friend'
}, {
    name: 'Contact 8',
    address: '1, a street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'family'
}];


var DirectoryView = Backbone.View.extend({
    el: $('#directory'),

    initialize: function ()  {
        this.collection = new Directory(contacts);
        this.render();
    },

    render: function ()  {
        _.each(this.collection.models, function (item) {
            this.renderContact(item);          
        }, this);
    },

    renderContact: function (item) {
        var contactView = new ContactView({ model: item });
        this.$el.append(contactView.$el);
    }

});

var directoryView = new DirectoryView();
