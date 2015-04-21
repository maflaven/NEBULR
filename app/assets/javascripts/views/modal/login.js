Nebulr.Views.ModalLogin = Backbone.View.extend({
  template: JST['modal/login'],
  className: 'modal',
  tagname: 'section',
  id: 'modal',

  initialize: function (options) {
    this.navHistory = options.navHistory;
  },

  events: {
    'click .modal-close': 'close',
    'click .guest-login': 'loginGuest',
    'submit form': 'loginUser',
    'click .signup': 'signupUser'
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  },

  close: function () {
    this.$('.modal-screen').fadeOut("slow");
    this.$el.fadeOut("fast");
    this.$('form').find('#username').val("");
    this.$('form').find('#password').val("");
    this.toggleBtns("enable");
  },

  loginGuest: function (event) {
    this.credentials = {'username': 'jlpicard', 'password': 'password'};
    this.loginUser(event);
  },

  loginUser: function (event) {
    event.preventDefault();
    this.toggleBtns("disable");

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
        that.credentials = {};

        if (that.navHistory[that.navHistory.length - 3] === "missions/new") {
          Backbone.history.navigate('#missions/new', { trigger: true });
        }
      },
      error: function (response) {
        that.credentials = {};
        that.toggleBtns("enable");
      }
    });

  },

  signupUser: function (event) {
    event.preventDefault();
    this.toggleBtns("disable");

    this.credentials = this.$('form').serializeJSON();
    var data = {'user': this.credentials};

    var that = this;
    $.ajax({
      url: 'users',
      method: 'POST',
      data: data,
      success: function (response) {
        that.close();
        that.credentials.id = response;
        that.model.set(that.credentials);
        that.credentials = {};

        if (that.navHistory[that.navHistory.length - 3] === "missions/new") {
          Backbone.history.navigate('#missions/new', { trigger: true });
        }
      },
      error: function (response) {
        that.credentials = {};
        that.toggleBtns("enable");
      }
    });
  },

  toggleBtns: function (toggle) {
    if (toggle === "enable") {
      this.$('#login-btn').prop('disabled', false);
      this.$('.signup').prop('disabled', false);
      this.$('.guest-login').prop('disabled', false);
      this.$('.modal-close').prop('disabled', false);
    } else {
      this.$('#login-btn').prop('disabled', true);
      this.$('.signup').prop('disabled', true);
      this.$('.guest-login').prop('disabled', true);
      this.$('.modal-close').prop('disabled', true);
    }
  }
});
