var ContactView = Backbone.View.extend({
	template: _.template($("#contactTemplate").html()),

	initialize: function (){
		this.render();
	},
	render: function (){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
