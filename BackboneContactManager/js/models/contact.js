var Contact = Backbone.Model.extend({
	defaults: {
		photo: 'assets/img/placeholder.png'
	},
	initialize: function (firstName, lastName, address, phone, email){
		this.set ({
			firstName: firstName,
			lastName: lastName,
			address: address, 
			phone: phone,
			email: email
		});
	}
});