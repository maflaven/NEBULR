Nebulr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = new Nebulr.Models.User({ id: options.currentUserId });
    this.currentUser.fetch();
    this.missions = new Nebulr.Collections.Missions();
    this.users = new Nebulr.Collections.Users();
  },

  routes: {
    '': 'missionIndex',
    'missions/new': 'missionNew',
    'missions/search': 'missionSearch',
    'missions/:id': 'missionShow',
    'users/:id': 'userShow'
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

  missionIndex: function () {
    this.missions.fetch();
    var view = new Nebulr.Views.MissionIndex({
      collection: this.missions,
      itemSize: 4
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
    // this.missions.fetch();
    var view = new Nebulr.Views.MissionSearchShow({
      collection: this.missions
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
