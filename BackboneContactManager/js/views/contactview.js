var ContactView = Backbone.View.extend({
    //get the undercore template
    template: _.template($('#contactTemplate').html()),

    events: {
        'click a': 'renderContactInfo',
    },

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
        if (this.$el.find('a').hasClass('addHeight')) {
            this.$el.find('a').removeClass('addHeight');
            this.$el.find("div:nth-child(4)").toggle();
            this.$el.find('a').animate({ height: '90px', 'margin-bottom':'50px' });

        } 
        else {
            this.$el.find('a').animate({ height: '200px', 'margin-bottom': '0px'});
            this.$el.find('a').addClass('addHeight');
            this.$el.find("div:nth-child(4)").toggle();

        }
    }
});
