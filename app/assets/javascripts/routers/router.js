Nebulr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.missions = new Nebulr.Collections.Missions();
  },

  routes: {
    '': 'missionIndex',
    'missions/new': 'missionNew',
    'missions/:id': 'missionShow'
  },

  missionNew: function () {
    var model = new Nebulr.Models.Mission();
    var view = new Nebulr.Views.MissionForm({ model: model });
    this._swapView(view);
  },

  missionShow: function (id) {
    var model = this.missions.getOrFetch(id);
    var view = new Nebulr.Views.MissionShow({ model: model });
    this._swapView(view);
  },

  missionIndex: function () {
    this.missions.fetch();
    var view = new Nebulr.Views.MissionIndex({ collection: this.missions });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
