var ContactView = Backbone.View.extend({
    //get the undercore template
    template: _.template($('#contactTemplate').html()),

    events: {
        'click a': 'renderContactInfo',
    },

    tagName: 'article', 
    //always render on initialize so you don't have to later
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        /*
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
		*/
        return this;
    },

    renderContactInfo: function() {
    	var currentContact= this.$el.find('a');
        if (currentContact.hasClass('addHeight')) {
            currentContact.removeClass('addHeight');
            this.$el.find("div:nth-child(4)").toggle();
            currentContact.animate({ height: '90px', 'margin-bottom':'120px' });

        } 
        else {
            currentContact.animate({ height: '200px', 'margin-bottom': '0px'});
            currentContact.addClass('addHeight');
            this.$el.find("div:nth-child(4)").toggle();

        }
    }
});
