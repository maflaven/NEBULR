Nebulr.Views.UserNav = Backbone.CompositeView.extend({
  template: JST['user/nav'],

  initialize: function (options) {
    this.$el = $('.backdrop');
    this.$nav = $('.user-nav');
    this.modalLoginView = new Nebulr.Views.ModalLogin({ model: this.model });
    this.addSubview('#session-modals #login', this.modalLoginView);
    // this.modalSignupView = new Nebulr.Views.ModalSignup({ model: this.model });
    // this.attachSubview('#session-modals #signup', this.modalSignupView);
    this.listenTo(this.model, "change", this.refreshPage);
  },

  render: function () {
    this.$nav.html(this.template());

    if (this.model.id) {
      this.attachUserBtns();
    } else {
      this.attachNewSessionBtns();
    }

    this.bindEvents();
    this.attachSubviews();
    return this;
  },

  bindEvents: function () {
    this.$nav.find('#loginBtn').on('click', this.attachLoginModal.bind(this));
    // this.$nav.find('#signupBtn').on('click', this.attachSingupModal.bind(this));
    this.$nav.find('#logoutBtn').on('click', this.logoutUser.bind(this));
  },

  attachUserBtns: function () {
    var $username = $('<a id="userShow">');
    $username.prop('href', '#users/' + this.model.id);
    $username.html(this.model.escape('username'));
    var $logout = $('<button class="btn btn-danger navbar-btn" id="logoutBtn">LOGOUT</button>');
    this.$nav.find('#username').html($username);
    this.$nav.find('#logout').html($logout);
  },

  attachNewSessionBtns: function () {
    var $login = $('<button class="btn btn-default navbar-btn" id="loginBtn">LOGIN</button>');
    var $signup = $('<button class="btn btn-default navbar-btn" id="signupBtn">SIGNUP</button>');
    this.$nav.find('#login').html($login);
    this.$nav.find('#signup').html($signup);
  },

  attachLoginModal: function () {

    this.modalLoginView.$el.addClass('is-active');
  },

  attachSignupModal: function () {
    this.modalSignupView.$el.addClass('is-active');
  },

  logoutUser: function () {
    this.$nav.find('#logoutBtn').prop('disabled', true);

    $.ajax({
      url: 'session',
      method: 'DELETE'
    });

    this.model.clear();
  },

  refreshPage: function () {
    var newFragment = Backbone.history.getFragment($(this).attr('href'));
    if (Backbone.history.fragment == newFragment) {
        // need to null out Backbone.history.fragement because
        // navigate method will ignore when it is the same as newFragment
        Backbone.history.fragment = null;
        Backbone.history.navigate(newFragment, true);
    }
  }
});
