Nebulr.Views.MissionIndex = Backbone.View.extend({
  template: JST['mission/index'],
  className: 'mission-index',

  initialize: function () {
    this.listenTo(this.collection, "sync add remove change", this.render);
  },

  render: function () {
    this.$el.html(this.template());
    this.collection.each( function (mission) {
      var $li = $("<li class='mission-index-item'>");
      $li.html(JST['mission/index_item']({ mission: mission }));
      this.$('ul').append($li);
    }.bind(this));
    return this;
  }
});
