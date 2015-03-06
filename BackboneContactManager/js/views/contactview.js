var ContactView = Backbone.View.extend({
	template: _.template($("#contactTemplate").html()),

	initialize: function (options){
		this.model = options.model;
	},
	render: function (){
		this.$el.html(this.template({model: this.model}));
		return this;
	}
});