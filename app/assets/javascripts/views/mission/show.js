Nebulr.Views.MissionShow = Backbone.CompositeView.extend({
  template: JST['mission/show'],

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.listenTo(this.model, "sync", this.render);

    this.imageCarouselView = new Nebulr.Views.MissionCarousel({
      collection: this.model.images()
    });
    this.addSubview('.mission-carousel', this.imageCarouselView);

    this.enlistBtnView = new Nebulr.Views.ButtonEnlist({
      model: this.model,
      currentUser: this.currentUser
    });
    this.addSubview('.btn-enlist', this.enlistBtnView);

    this.followBtnView = new Nebulr.Views.ButtonFollow({
      model: this.model,
      currentUser: this.currentUser
    });
    this.addSubview('.btn-follow', this.followBtnView);

    this.avgRatingView = new Nebulr.Views.RatingAverage({
      model: this.model
    });
    this.addSubview('.rating-avg', this.avgRatingView);

    this.newRatingView = new Nebulr.Views.RatingNew({
      model: this.model,
      currentUser: this.currentUser
    });
    this.addSubview('.rating-new', this.newRatingView);

    this.leaderItemView = new Nebulr.Views.UserIndexItem({
      model: this.model.leader()
    });
    this.addSubview('.mission-leader', this.leaderItemView);

    this.enlistedUsersIndexView = new Nebulr.Views.UserIndex({
      collection: this.model.enlistedUsers()
    });
    this.addSubview('.enlisted-users-index', this.enlistedUsersIndexView);

    this.commentNewView = new Nebulr.Views.CommentNew({
      missionId: this.model.id,
      collection: this.model.comments(),
      model: new Nebulr.Models.Comment(),
      currentUser: this.currentUser
    });
    this.addSubview('.comments-index', this.commentNewView);

    this.commentsIndexView = new Nebulr.Views.CommentIndex({
      collection: this.model.comments(),
      currentUserId: this.currentUser.id,
      leaderId: this.model.leader().id
    });
    this.addSubview('.comments-index', this.commentsIndexView);
  },

  events: {
    'click #cancel-btn': 'destroy',
    'click #complete-btn': 'complete'
  },

  render: function () {
    this.$el.html(this.template({
      mission: this.model,
      isLeader: this.model.get('is_leader'),
      isComplete: this.model.get('completed'),
      isFull: this.isFull()
    }));

    this.attachSubviews();
    return this;
  },

  isFull: function () {
    if (this.model.enlistedUsers().length) {
      return this.model.enlistedUsers().length == this.model.get('user_limit');
    } else {
      return true;
    }
  },

  destroy: function (event) {
    $(event.currentTarget).prop('disabled', true);
    this.model.destroy();
    Backbone.history.navigate('', { trigger: true });
  },

  complete: function (event) {
    $(event.currentTarget).prop('disabled', true);
    this.model.set({ completed: true });
    this.model.save({}, {
      success: function () {
        this.render();
      }.bind(this)
    });
  }
});
