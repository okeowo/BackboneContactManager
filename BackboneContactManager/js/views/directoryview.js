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
            'change #filter select': 'setFilter',
            'click #saveContactBtn': 'addContact'
        },

            initialize: function() {
                this.filterGroup = '';
                this.collection = new Directory(contacts);
                this.render();
                // create the select to filter by
                this.$el.find('#filter').append(this.createSelect());
                this.listenTo(this,'change:filterGroup', this.filterByGroup);
                this.listenTo(this.collection, 'reset', this.render);

                this.form = this.$el.find('#contactForm');

                this.listenTo(this.collection, 'add', this.renderContact)
            },
 
            render: function() {
                this.$el.find('article').remove();
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

            getGroups: function() {
                return _.uniq(this.collection.pluck('group'), false, function(group) {
                    return group.toLowerCase();
                });
            },

            createSelect: function() {
                var select = $('<select/>', {
                    class: 'form-control',
                    id: 'filterSelect',
                    html: '<option>All</option>'
                });

                _.each(this.getGroups(), function(item) {
                    var option = $('<option/>', {
                        value: item.toLowerCase(),
                        html: item.toLowerCase(),
                    }).appendTo(select);
                });

                return select;
            },

            //Set filter property and fire change event
            setFilter: function(e) {
                this.filterGroup= e.currentTarget.value.toLowerCase();
                this.trigger('change:filterGroup');
            },

            //filter the view
            filterByGroup: function() {
                if (this.filterGroup === 'all') {
                    this.collection.reset(contacts);
                    contactsRouter.navigate('filter/all', { trigger: true });
                } else {
                    this.collection.reset(contacts, { silent: true });

                    var filterGroup = this.filterGroup;
                    var filtered = _.filter(this.collection.models, function(item) {
                            return item.get('group') === filterGroup;
                        });
                    this.collection.reset(filtered);

                    contactsRouter.navigate('filter/' + filterGroup, { trigger: true});
                }
            },

            addContact: function () {
                var contact= new Contact(_.object(_.map(this.form.serializeArray(), _.values))); 
                if(this.form.find('#photo').val() !== ''){
                    contact.set('photo', this.form.find('#photo').val());
                }
                
                contacts.push(contact);

                this.collection.add(contact);

                if (_.indexOf(this.getGroups, contact.group) === -1){
                    this.$el.find('#filter').find('select').remove().end().append(this.createSelect());
                }
            }
        });

        var directoryView = new DirectoryView();