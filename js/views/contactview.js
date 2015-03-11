var ContactView = Backbone.View.extend({
    //get the undercore template
    template: _.template($('#contactTemplate').html()),

    events: {
        'click a': 'renderContactInfo',
        'click button.editBtn': 'editContact',
        'click button.deleteBtn': 'deleteContact'
    },

    tagName: 'article', 
    className: 'col-lg-3 col-sm-6 col-xs-6 buffer',
    //always render on initialize so you don't have to later
    initialize: function() {
        this.render();
    },
    render: function() {
    	this.model.set('groupColor', this.renderContactHeader(this.model.get('group')));
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

    //must rewrite and save to localStorage for new choose new color
    renderContactHeader: function (group) {
    	switch (group){
    		case 'family':
    			return '#1E23B7';
    			break;
			case 'colleague':
    			return '#be0010';
    			break;
			case 'friend':
				return '#1c9d12';
				break
    	}
    },

    renderContactInfo: function() {
    	this.$el.removeClass('buffer');
    	var currentContact= this.$el.find('a');
        if (currentContact.hasClass('addHeight')) {
            currentContact.removeClass('addHeight');
            this.$el.find("div:nth-child(4)").toggle();
            currentContact.css('height', '90px');
            this.$el.css('margin-bottom', '140px');
            //currentContact.animate({ height: '90px', 'margin-bottom':'120px' });

        } 
        else {
            //currentContact.animate({ height: '200px', 'margin-bottom': '10px'});
            currentContact.addClass('addHeight');
            currentContact.css('height', '220px');
            this.$el.css('margin-bottom', '10px');
            this.$el.find("div:nth-child(4)").toggle();

        }
    },

    editContact: function () {
        console.log('edit');
    },

    deleteContact: function() {
        var confirmWindow =  confirm ('Please confirm whether to delete contact ' + this.model.get('name'));
        if (confirmWindow === true) {
            this.model.destroy();
            this.remove();
        }

    }

});
