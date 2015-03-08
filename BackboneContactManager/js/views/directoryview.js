// contact repo for testing
// should be removed later
var contacts = [{
    name: 'Contact 1',
    address: '1 street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'family'
}, {
    name: 'Contact 2',
    address: '1 street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'family'
}, {
    name: 'Contact 3',
    address: '1 street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'friend'
}, {
    name: 'Contact 4',
    address: '1 street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'colleague'
}, {
    name: 'Contact 5',
    address: '1 street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'family'
}, {
    name: 'Contact 6',
    address: '1 street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'colleague'
}, {
    name: 'Contact 7',
    address: '1 street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'friend'
}, {
    name: 'Contact 8',
    address: '1 street, a town, a city, AB12 3CD',
    phone: '0123456789',
    email: 'anemail@me.com',
    group: 'family'
}];


var DirectoryView = Backbone.View.extend({
            el: $('#directory'),

        events: {
            "change #filter select": "setFilter"
        },

            initialize: function() {
                this.collection = new Directory(contacts);
                this.render();
                // create the select to filter by
                this.$el.find('#filter').append(this.createSelect());
                
                this.on("change:filterType", this.filterByType, this);
                this.collection.on("reset", this.render, this);
            },
 
            render: function() {
                this.$el.find("article").remove();
                _.each(this.collection.models, function(item) {
                    this.renderContact(item);
                }, this);
            },

            renderContact: function(item) {
                var contactView = new ContactView({
                    model: item
                });
                this.$el.append(contactView.$el);
            },

            getTypes: function() {
                return _.uniq(this.collection.pluck('group'), false, function(group) {
                    return group.toLowerCase();
                });
            },

            createSelect: function() {
                var select = $('<select/>', {
                    class: 'form-control',
                    id: "filterSelect",
                    html: '<option>All</option>'
                });

                _.each(this.getTypes(), function(item) {
                    var option = $('<option/>', {
                        value: item.toLowerCase(),
                        html: item.toLowerCase(),
                    }).appendTo(select);
                });

                return select;
            },

            //Set filter property and fire change event
            setFilter: function(e) {
                this.filterType = e.currentTarget.value;
                this.trigger("change:filterType");
            },

            //filter the view
            filterByType: function() {
                if (this.filterType.toLowerCase() === "all") {
                                        console.log(contacts);
                    this.collection.reset(contacts);
                    //contactsRouter.navigate("filter/all");
                } else {
                    this.collection.reset(contacts, { silent: true });

                    var filterType = this.filterType;
                    var filtered = _.filter(this.collection.models, function(item) {
                            return item.get("group") === filterType;
                        });
                    this.collection.reset(filtered);

                    //contactsRouter.navigate("filter/" + filterType);
                }
            }
        });

        var directoryView = new DirectoryView();
