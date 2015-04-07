window.Nebulr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Nebulr.Routers.Router({ $rootEl: $('#main') });
    Backbone.history.start();
  }
};
