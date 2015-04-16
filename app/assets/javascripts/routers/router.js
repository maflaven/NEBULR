Nebulr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = new Nebulr.Models.User({ id: options.currentUserId });
    this.currentUser.fetch();
    this.missions = new Nebulr.Collections.Missions();
    this.users = new Nebulr.Collections.Users();
    this.filterData = {};
  },

  routes: {
    '': 'searchLanding',
    'missions/': 'missionIndexSearch',
    'missions/new': 'missionNew',
    'missions/search': 'missionSearch',
    'missions/:id': 'missionShow',
    'users/:id': 'userShow'
  },

  searchLanding: function () {
    var view = new Nebulr.Views.SearchLanding({
      filterData: this.filterData
    });
    this._swapView(view);
  },

  missionNew: function () {
    var model = new Nebulr.Models.Mission();
    var view = new Nebulr.Views.MissionForm({
      model: model,
      currentUserId: this.currentUser.id
    });
    this._swapView(view);
  },

  missionShow: function (id) {
    var model = this.missions.getOrFetch(id);
    var view = new Nebulr.Views.MissionShow({
      model: model,
      currentUserId: this.currentUser.id,
      currentUser: this.currentUser
    });
    this._swapView(view);
  },

  missionIndexSearch: function () {
    this.missions.fetch();
    var view = new Nebulr.Views.MissionIndexSearch({
      collection: this.missions
    });
    this._swapView(view);
  },

  userShow: function (id) {
    var model = this.users.getOrFetch(id);
    var view = new Nebulr.Views.UserShow({
      model: model,
      currentUser: this.currentUser
    });
    this._swapView(view);
  },

  missionSearch: function () {
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
