Nebulr.Views.MissionIndex = Backbone.View.extend({
  template: JST['mission/index'],
  className: 'mission-index row',

  initialize: function (options) {
    this.listenTo(this.collection, "sync remove", this.render);
    this.itemSize = options.itemSize;
  },

  render: function () {
    this.$el.html(this.template());
    this.collection.each( function (mission) {
      var thumbnail = "https://www.filepicker.io/api/file/UuGSt7rqR4aVqjX5K54S";
      if (mission.images().length > 0) {
        thumbnail = mission.images().first().get('filepicker_url');
      }

      var $li = $("<li class='mission-index-li'>");
      $li.addClass('col-md-' + this.itemSize);
      $li.data('mission-id', mission.id);
      $li.html(JST['mission/index_item']({
        mission: mission,
        thumbnail: thumbnail
      }));
      this.$('ul').append($li);
    }.bind(this));
    return this;
  }
});
