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

        // create the select to filter by
        $('#filter').append(this.createSelect());

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
    },

    getTypes: function ()  {
        return _.uniq(this.collection.pluck('group'), false, function (group){
           return group.toLowerCase();
        });
    },

    createSelect: function ()  {
        var select = $('<select/>', {
            class: 'form-control',
            id: "filterSelect",
            html: '<option>All</option>'
        });

        _.each(this.getTypes(), function (item){
            var option = $('<option/>',{
                value: item.toLowerCase(),
                html: item.toLowerCase(),
            }).appendTo(select);
        });

        return select;
    }
});

var directoryView = new DirectoryView();

