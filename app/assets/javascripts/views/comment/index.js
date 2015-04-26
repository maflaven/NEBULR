Nebulr.Views.CommentIndex = Backbone.CompositeView.extend({
  template: JST['comment'],
  className: 'list',

  initialize: function (options) {
    this.currentUserId = options.currentUserId;
    this.mission = options.mission;
    this.user = options.user;
    this.listenTo(this.collection, "add", this.addCommentView);
    this.collection.each(this.addCommentView.bind(this));
    this.listenTo(this.collection, "remove", this.removeCommentView);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addCommentView: function (comment) {
    var subview = new Nebulr.Views.CommentShow({
      currentUserId: this.currentUserId,
      mission: this.mission,
      user: this.user,
      model: comment
    });
    this.addSubview('ul', subview, true);
  },

  removeCommentView: function (comment) {
    this.removeModelSubview('ul', comment);
  }
});
