Nebulr.Views.UserIndex = Backbone.View.extend({
  template: JST['user/index'],
  className: 'user-index row',

  initialize: function () {
    this.listenTo(this.collection, "add remove change sync", this.render);
  },

  render: function () {
    this.$el.html(this.template());

    this.collection.each( function (user) {
      var thumbnail = "https://www.filepicker.io/api/file/UzhxqFdQymmheDJt0dOg";
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
    this.$('h4').html($users);

    return this;
  }
});
