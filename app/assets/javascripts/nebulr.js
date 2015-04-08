window.Nebulr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    new Nebulr.Routers.Router({
      $rootEl: $('#main'),
      currentUserId: options.currentUserId
    });
    Backbone.history.start();
  }
};
