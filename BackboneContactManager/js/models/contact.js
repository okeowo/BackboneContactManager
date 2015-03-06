var Contact = Backbone.Model.extend({
	defaults: {
		photo: 'assets/img/placeholder.png'
	},
	initialize: function (name, group, address, phone, email){
		this.set ({
			name: name, 
			group: group,
			address: address, 
			phone: phone,
			email: email
		});
	}
});