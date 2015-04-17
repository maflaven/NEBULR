Nebulr.Views.UserIndex = Backbone.View.extend({
  template: JST['user/index'],
  className: 'user-index row',

  initialize: function () {
    this.listenTo(this.collection, "add remove change sync", this.render);
  },

  render: function () {
    this.$el.html(this.template());

    this.collection.each( function (user) {
      var thumbnail = "https://www.filepicker.io/api/file/PNXcJrvgR82BzwR5rfeO";
      if (user.get('filepicker_url')) {
        thumbnail = user.get('filepicker_url');
      }

      var $li = $("<li class='user-index-item col-md-2'>");
      $li.html(JST['user/index_item']({
        user: user,
        thumbnail: thumbnail
      }));
      this.$('ul').append($li);
    }.bind(this));

    var $users = $(
      '<p>ENLISTED: ' + this.collection.length + '</p>'
    );
    this.$('h5').html($users);

    return this;
  }
});
