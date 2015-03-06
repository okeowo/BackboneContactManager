var DirectoryView = Backbone.View.extend({
    el: $("#directory"),

    initialize: function(options) {
        this.collection = options;
        this.render();
    },

    render: function() {
        _.each(this.collection, function (item){
            this.renderContact(item);
        }, this);
    },

    renderContact: function(item) {
        var contactView = new ContactView({
            model: item
        });
        this.$el.append(contactView.$el);
    }
});

// use this to populate collection

var contacts = [{
    name: "Contact 1",
    address: "1, a street, a town, a city, AB12 3CD",
    phone: "0123456789",
    email: "anemail@me.com",
    group: "family"
}, {
    name: "Contact 2",
    address: "1, a street, a town, a city, AB12 3CD",
    phone: "0123456789",
    email: "anemail@me.com",
    group: "family"
}, {
    name: "Contact 3",
    address: "1, a street, a town, a city, AB12 3CD",
    phone: "0123456789",
    email: "anemail@me.com",
    group: "friend"
}, {
    name: "Contact 4",
    address: "1, a street, a town, a city, AB12 3CD",
    phone: "0123456789",
    email: "anemail@me.com",
    group: "colleague"
}, {
    name: "Contact 5",
    address: "1, a street, a town, a city, AB12 3CD",
    phone: "0123456789",
    email: "anemail@me.com",
    group: "family"
}, {
    name: "Contact 6",
    address: "1, a street, a town, a city, AB12 3CD",
    phone: "0123456789",
    email: "anemail@me.com",
    group: "colleague"
}, {
    name: "Contact 7",
    address: "1, a street, a town, a city, AB12 3CD",
    phone: "0123456789",
    email: "anemail@me.com",
    group: "friend"
}, {
    name: "Contact 8",
    address: "1, a street, a town, a city, AB12 3CD",
    phone: "0123456789",
    email: "anemail@me.com",
    group: "family"
}];

var directoryView = new DirectoryView(contacts);
