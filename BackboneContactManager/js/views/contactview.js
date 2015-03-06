var ContactView = Backbone.View.extend({
	template: _.template($("#contactTemplate").html()),

	initialize: function (options){
		this.model = options;
		this.render();
	},
	render: function (){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var contact = new Contact({
    name: "Contact 1",
    address: "1, a street, a town, a city, AB12 3CD",
    phone: "0123456789",
    email: "anemail@me.com",
    group: "family"
});
var contactView = new ContactView({model: contact})

$("#directory").append(contactView.$el);