Nebulr.Views.MissionIndex = Backbone.View.extend({
  template: JST['mission/index'],
  className: 'mission-index',

  initialize: function () {
    this.listenTo(this.collection, "sync add remove change", this.render);
  },

  render: function () {
    this.$el.html(this.template());
    this.collection.each( function (mission) {

      var thumbnail = "http://cdn.wonderfulengineering.com/wp-content/uploads/2014/04/space-wallpapers-13.jpg";
      if (mission.images().length > 0) {
        thumbnail = mission.images().first().get('filepicker_url');
        console.log("image!");
      }

      var $li = $("<li class='mission-index-item'>");
      $li.html(JST['mission/index_item']({
        mission: mission,
        thumbnail: thumbnail
      }));
      this.$('ul').append($li);
    }.bind(this));
    return this;
  }
});
