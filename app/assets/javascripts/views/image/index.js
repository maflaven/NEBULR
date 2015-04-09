Nebulr.Views.ImageIndex = Backbone.View.extend({
  template: JST['image/index'],
  className: 'image-index',

  render: function () {
    this.$el.html(this.template());

    this.collection.each( function (image) {
      debugger
      var $li = $('<li class="image-index-item">');
      $li.html(JST['image/index_item']({ image: image }));
      this.$('.image-index > ul').append($li);
    });

    return this;
  }
});
