Nebulr.Views.UserIndex = Backbone.View.extend({
  template: JST['user/index'],
  className: 'user-index',

  initialize: function () {
    this.listenTo(this.collection, "add remove change sync", this.render);
  },

  render: function () {
    this.$el.html(this.template());

    this.collection.each( function (user) {
      var thumbnail = "/assets/q.jpg";
      if (user.get('filepicker_url')) {
        thumbnail = user.get('filepicker_url');
      }

      var $li = $("<li class='user-index-item'>");
      $li.html(JST['user/index_item']({
        user: user,
        thumbnail: thumbnail
      }));
      this.$('ul').append($li);
    }.bind(this));

    var $users = $(
      '<p>' + this.collection.length + '</p>'
    );
    this.$el.prepend($users);

    return this;
  }
});
