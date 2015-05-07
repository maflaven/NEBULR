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
    'click .modal-screen': 'close',
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
    this.$el.fadeOut("fast", function () {
      this.$('form').find('#username').val("");
      this.$('form').find('#password').val("");
      this._clearErrors();
      this.$('*').removeClass('ui-state-highlight');
      this.toggleBtns("enable");
    }.bind(this));
  },

  loginGuest: function (event) {
    var that = this;
    this.$('form #username').typed({
      strings: ["jlpicard"],
      typeSpeed: 30
    });
    this.$('form #password').typed({
      strings: ["password"],
      startDelay: 200,
      typeSpeed: 30,
      callback: function () {that.loginUser(event);}
    });
  },

  loginUser: function (event) {
    event.preventDefault();
    this._clearErrors();
    this.toggleBtns("disable");

    this.credentials = this.$('form').serializeJSON();

    var data = {'user': this.credentials};

    var that = this;
    $.ajax({
      url: 'session',
      method: 'POST',
      data: data,
      success: function (response) {
        ga('send', 'event', 'session', 'create');
        that.close();
        that.credentials.id = response;
        that.model.set(that.credentials);
        that.credentials = {};

        if (that.navHistory[that.navHistory.length - 3] === "missions/new") {
          Backbone.history.navigate('#missions/new', { trigger: true });
        }
      },
      error: function (response) {
        that._processError(response.responseText, true);
        that.credentials = {};
        that.toggleBtns("enable");
      }
    });

  },

  signupUser: function (event) {
    event.preventDefault();
    this._clearErrors();
    this.toggleBtns("disable");

    this.credentials = this.$('form').serializeJSON();
    var data = {'user': this.credentials};

    var that = this;
    $.ajax({
      url: 'users',
      method: 'POST',
      data: data,
      success: function (response) {
        ga('send', 'event', 'session', 'create');
        that.close();
        that.credentials.id = response;
        that.model.set(that.credentials);
        that.credentials = {};

        if (that.navHistory[that.navHistory.length - 3] === "missions/new") {
          Backbone.history.navigate('#missions/new', { trigger: true });
        }
      },
      error: function (response) {
        response.responseJSON.forEach( function (error) {
          that._processError(error);
        });
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
  },

  _processError: function (error, text) {
    if (text) {
      var $field = this.$('#username');
    } else {
      var errorId = error.split(' ')[0].toLowerCase();
      var $field = this.$("#" + errorId);
      $field.addClass('ui-state-highlight');
    }
    var $errorDiv = $('<div class="error-message">');
    $errorDiv.html(error.toUpperCase()).addClass('alert alert-warning').hide();
    $errorDiv.insertBefore($field);
    $errorDiv.fadeIn("fast");
  },

  _clearErrors: function () {
    this.$('.error-message').remove();
  }
});
