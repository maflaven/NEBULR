Nebulr.Views.ModalLogin = Backbone.View.extend({
  template: JST['modal/login'],
  className: 'modal',
  tagname: 'section',
  id: 'modal',

  events: {
    'click .modal-close': 'close',
    'click .guest-login': 'loginGuest',
    'submit form': 'loginUser'
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  },

  close: function () {
    this.$el.removeClass('is-active');
    this.$('form').find('#username').val("");
    this.$('form').find('#password').val("");
    this.$('#login-btn').prop('disabled', false);
    this.$('.guest-login').prop('disabled', false);
    this.$('.modal-close').prop('disabled', false);
  },

  loginGuest: function (event) {
    this.credentials = {'username': 'jlpicard', 'password': 'password'};
    this.loginUser(event);
  },

  loginUser: function (event) {
    event.preventDefault();
    this.$('#login-btn').prop('disabled', true);
    this.$('.guest-login').prop('disabled', true);
    this.$('.modal-close').prop('disabled', true);


    if (!this.credentials) {
      this.credentials = this.$('form').serializeJSON();
    }

    var data = {'user': this.credentials};

    var that = this;
    $.ajax({
      url: 'session',
      method: 'POST',
      data: data,
      success: function (response) {
        that.close();
        that.credentials.id = response;
        that.model.set(that.credentials);
      }
    });

  }
});
