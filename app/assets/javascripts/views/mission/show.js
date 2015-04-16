Nebulr.Views.MissionShow = Backbone.CompositeView.extend({
  template: JST['mission/show'],
  className: 'mission-show',

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
      mission: this.model
    });
    this.addSubview('.comments-index', this.commentsIndexView);

    this.missionMapView = new Nebulr.Views.EventMapMissionShow({
      model: this.model,
    });
    this.mapRendered = false;

    this.modalCancellationView = new Nebulr.Views.ModalCancellation({
      model: this.model
    });
    this.addSubview('#modal-cancellation', this.modalCancellationView);

    this.modalCompletionView = new Nebulr.Views.ModalCompletion({
      model: this.model
    });
    this.addSubview('#modal-completion', this.modalCompletionView);
  },

  events: {
    'click #cancel-btn': 'destroyModal',
    'click #complete-btn': 'completeModal'
  },

  render: function () {
    this.$el.html(this.template({
      mission: this.model,
      spotsLeft: this.spotsLeft()
    }));

    this.attachSubviews();

    if (this.model.get('latitude')) {
      this.renderMap();
    }

    return this;
  },

  renderMap: function () {
    this.$('.mission-location').html(this.missionMapView.$el);
    if (!this.mapRendered) {
      this.mapRendered = true;
      this.missionMapView.render();
    }
  },

  spotsLeft: function () {
    if (this.model.enlistedUsers().length) {
      return this.model.get('user_limit') - this.model.enlistedUsers().length;
    }
  },

  destroyModal: function () {
    this.modalCancellationView.$el.addClass('is-active');
  },

  completeModal: function () {
    this.modalCompletionView.$el.addClass('is-active');
  }
});
