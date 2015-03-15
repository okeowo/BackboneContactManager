var directory = new Directory();
(function (){
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
    }]

    directory.fetch ({ async: false, success: function (data) {
            if (data.models.length === 0){
                _.each(contacts, function (model) {
                    var contact = new Contact(model);
                    directory.add(contact);
                    contact.save();    
                });
            }
        }
    });
})();


var DirectoryView = Backbone.View.extend({
    el: $('#directory'),

    events: {
        'change #filter select': 'setFilter',
        'click #saveContactBtn': 'addContact'
    },

    initialize: function() {
        this.collection = directory;
        this.render();
        // create the select to filter by
        this.$el.find('#filter').append(this.createSelect());
        this.listenTo(this,'change:filterGroup', this.filterByGroup);
        this.listenTo(this.collection, 'reset', this.render);

        this.addForm = this.$el.find('#addForm');

        //this.listenTo(this.collection, 'add', this.renderContact);
        //this.listenTo(this.collection, 'remove', this.removeContact);
        this.listenTo(this.collection, 'change', this.render);
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
        this.collection.fetch();
        if (this.filterGroup === 'all') {
            this.collection.reset(this.collection.models);
            contactsRouter.navigate('filter/all', { trigger: true });
        } 
        else {
            this.collection.reset(this.collection.models, { silent: true });

            var filterGroup = this.filterGroup;
            var filtered = _.filter(this.collection.models, function(item) {
                    return item.get('group') === filterGroup;
            });

            this.collection.reset(filtered);

            contactsRouter.navigate('filter/' + filterGroup, { trigger: true});
        }
    },

    addContact: function () {
        var contact= new Contact(_.object(_.map(this.addForm.serializeArray(), _.values))); 
        var photoPath = this.addForm.find('#photo').val();
        if ( photoPath !== '' ) {
            var filename = photoPath.replace(/^.*\\/, "");
            var prepend = 'assets/img/';
            var fixedPath = prepend + filename;
            contact.set('photo', fixedPath);
        }
        
        this.collection.add(contact);
        contact.save();


        if (_.indexOf(this.getGroups, contact.group) === -1){
            this.$el.find('#filter').find('select').remove().end().append(this.createSelect());
        }
        
        //toastr options and popup
        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-top-full-width",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }

        toastr["success"]("Contact " + contact.get('name') + " was successfully added to the group " + contact.get('group'));
    },

    removeContact: function (removedModel) {
        var removedGroup = removedModel.get('group');
        if (_.indexOf(this.getTypes(), removedGroup) === -1){
            this.$el.find('#filter select').children('[value="' + removedGroup +'"]').remove();
        }
    }

});


var directoryView = new DirectoryView();