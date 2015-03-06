var ContactView = Backbone.View.extend({
	template: $("#contactTemplate").html(),

/*
	initialize: function (){
		//this.model = options.model;
		this.render();
		console.log(this.template);
	},
	*/
	render: function (){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.toJSON()));
		return this;
	}
});