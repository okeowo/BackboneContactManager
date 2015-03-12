'use strict'

var ContactView = Backbone.View.extend({
    //get the undercore template
    template: _.template($('#contactTemplate').html()),
    editTemplate: _.template($("#editContactTemplate").html()),

    events: {
        'click a': 'renderContactInfo',
        'click button.editBtn': 'editContact',
        'click button.deleteBtn': 'deleteContact',
        'click button.cancel': 'cancelEdit',
        'click button.save' : 'saveEdit'
    },

    tagName: 'article', 
    className: 'col-lg-3 col-sm-6 col-xs-6 buffer',
    //always render on initialize so you don't have to later
    initialize: function() {
        this.render();
    },

    defaults: function () {
        this.preventToggle = false;
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
        if (currentContact.hasClass('addHeight') && !this.preventToggle) {
            currentContact.removeClass('addHeight');
            currentContact.css('height', '90px');
            this.$el.css('margin-bottom', '140px');
            this.$el.find("div:nth-child(4)").toggle();
            //currentContact.animate({ height: '90px', 'margin-bottom':'120px' });

        } 
        else if (!this.preventToggle) {
            //currentContact.animate({ height: '200px', 'margin-bottom': '10px'});
            currentContact.addClass('addHeight');
            currentContact.css('height', '220px');
            this.$el.css('margin-bottom', '10px');
            this.$el.find("div:nth-child(4)").toggle();

        }
    },

    editContact: function (event) {
        this.preventToggle = true;
        this.$el.append(this.editTemplate(this.model.toJSON()));
        this.$el.find('#editContactModal').modal('show');
    },

    cancelEdit: function () {
        this.$el.find('#editContactModal').remove();  
        this.preventToggle = false;      
    },

    saveEdit: function () {
        this.model.save(_.object(_.map(this.$el.find('#editForm').serializeArray(), _.values))); 
        this.$el.find('#editContactModal').remove(); 
    },

    deleteContact: function() {
        var confirmWindow =  confirm ('Please confirm whether to delete contact ' + this.model.get('name'));
        if (confirmWindow === true) {
            this.model.destroy();
            this.remove();
        }

    }

});
