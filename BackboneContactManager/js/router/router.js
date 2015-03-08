// router will go here

    var ContactsRouter = Backbone.Router.extend({
        routes: {
            "filter/:group": "urlFilter"
        },

        urlFilter: function (group) {
            directoryView.filterGroup= group;
            directoryView.trigger("change:filterGroup");
        }
    });

    //create router instance
    var contactsRouter = new ContactsRouter();

    //start history service
    Backbone.history.start();