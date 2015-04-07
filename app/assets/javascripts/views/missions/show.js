Nebulr.Views.MissionShow = Backbone.CompositeView.extend({
  template: JST['mission/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ mission: this.model }));
    return this;
  }
});
