Nebulr.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/show'],
  className: 'user-show',

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});
