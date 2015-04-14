Nebulr.Views.ImageIndex = Backbone.View.extend({
  tagName: 'ul',

  initialize: function () {
    this.listenTo(this.collection, "add", this.render);
  },

  render: function () {
    this.$el.empty();
    this.collection.each( function (image) {
      var $li = $('<li class="image-index-item">');
      $li.html(JST['image/index_item']({ image: image }));
      this.$el.append($li);
    }.bind(this));

    return this;
  }
});
