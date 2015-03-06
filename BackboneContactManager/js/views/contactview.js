var ContactView = Backbone.View.extend({
	//get the undercore template
	template: _.template($("#contactTemplate").html()),

	//always render on initialize so you don't have to later
	initialize: function (){
		this.render();
	},
	render: function (){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
