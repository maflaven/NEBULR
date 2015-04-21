Nebulr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.navHistory = [];
    this.filterData = {};
    this.bind("route", this.storeRoute);
    this.currentUser = new Nebulr.Models.User({ id: options.currentUserId });
    this.currentUser.fetch();
    this.currentUserView = new Nebulr.Views.UserNav({
      model: this.currentUser,
      navHistory: this.navHistory
    });
    this.missions = new Nebulr.Collections.Missions();
    this.users = new Nebulr.Collections.Users();

  },

  routes: {
    '': 'searchLanding',
    'missions/': 'missionIndexSearch',
    'missions/new': 'missionNew',
    'missions/search': 'missionSearch',
    'missions/:id': 'missionShow',
    'users/:id': 'userShow'
  },

  storeRoute: function () {
    this.navHistory.push(Backbone.history.fragment);
  },

  searchLanding: function () {
    this.currentUserView.render();

    var view = new Nebulr.Views.SearchLanding({
      filterData: this.filterData
    });
    this._swapView(view);
  },

  missionNew: function () {
    this.currentUserView.render();

    if (!this.currentUser.id) {
      $('#login #modal').fadeIn("fast");
      $('#login .modal-screen').fadeIn("fast");
      this.storeRoute();
      Backbone.history.navigate(this.navHistory[this.navHistory.length - 2], { trigger: false });
    } else {

      var model = new Nebulr.Models.Mission();
      var view = new Nebulr.Views.MissionForm({
        model: model,
        currentUserId: this.currentUser.id
      });
      this._swapView(view);
    }
  },

  missionShow: function (id) {
    this.currentUserView.render();

    var model = this.missions.getOrFetch(id);
    var view = new Nebulr.Views.MissionShow({
      model: model,
      currentUserId: this.currentUser.id,
      currentUser: this.currentUser
    });
    this._swapView(view);
  },

  missionIndexSearch: function () {
    this.currentUserView.render();

    this.missions.fetch();
    var view = new Nebulr.Views.MissionIndexSearch({
      collection: this.missions
    });
    this._swapView(view);
  },

  userShow: function (id) {
    this.currentUserView.render();

    var model = this.users.getOrFetch(id);
    var view = new Nebulr.Views.UserShow({
      model: model,
      currentUser: this.currentUser
    });
    this._swapView(view);
  },

  missionSearch: function () {
    this.currentUserView.render();

    var view = new Nebulr.Views.MissionSearchShow({
      collection: this.missions,
      filterData: this.filterData
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
