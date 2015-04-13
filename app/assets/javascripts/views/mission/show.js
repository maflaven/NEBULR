Nebulr.Views.MissionShow = Backbone.CompositeView.extend({
  template: JST['mission/show'],

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click #enlist-btn': 'enlist',
    'click #follow-btn': 'follow',
    'click #cancel-btn': 'destroy'
  },

  render: function () {
    var isLeader = false;
    if (this.currentUser.id == this.model.leader().id) {
      isLeader = true;
    }

    this.$el.html(this.template({
      mission: this.model,
      isLeader: isLeader,
      enlistBtnValue: this._enlistButtonValue(),
      followBtnValue: this._followButtonValue()
    }));

    if (this.model.images().length > 0) {
      var imageCarousel = JST['mission/carousel']({
        images: this.model.images()
      });
      this.$el.prepend(imageCarousel);
    }

    var leaderItemView = new Nebulr.Views.UserIndexItem({
      model: this.model.leader()
    });
    this.addSubview('.mission-leader', leaderItemView);

    var enlistedUsersIndexView = new Nebulr.Views.UserIndex({
      collection: this.model.enlistedUsers()
    });
    this.addSubview('.enlisted-users-index', enlistedUsersIndexView);

    var followingUsersIndexView = new Nebulr.Views.UserIndex({
      collection: this.model.followingUsers()
    });
    this.addSubview('.following-users-index', followingUsersIndexView);

    var commentNewModel = new Nebulr.Models.Comment();
    var commentNewView = new Nebulr.Views.CommentNew({
      missionId: this.model.id,
      collection: this.model.comments(),
      model: commentNewModel,
      currentUser: this.currentUser
    });
    this.addSubview('.comments-index', commentNewView);

    var commentsIndexView = new Nebulr.Views.CommentIndex({
      collection: this.model.comments(),
      currentUserId: this.currentUser.id,
      leaderId: this.model.leader().id
    });
    this.addSubview('.comments-index', commentsIndexView);

    return this;
  },

  enlist: function (event) {
    $btn = $(event.currentTarget);
    $btn.prop("disabled", true);
    var that = this;

    if (that.enlist.isNew()) {
      that.enlist.save({}, {
        success: function () {
          var userModel = new Nebulr.Models.User({ id: that.currentUser.id });
          userModel.fetch().then( function () {
            that.model.enlistedUsers().add(userModel);
          });

          that._toggleButtonValue($btn);
          $btn.prop("disabled", false);
        }
      });
    } else {
      that.enlist.destroy({
        success: function () {
          var userModel = that.model.enlistedUsers().findWhere({
            id: that.currentUser.id
          });
          that.model.enlistedUsers().remove(userModel);

          that._toggleButtonValue($btn);
          $btn.prop("disabled", false);
          that.enlist = new Nebulr.Models.Enlist({
            user_id: that.currentUser.id,
            mission_id: that.model.id
          });
        }
      });
    }
  },

  follow: function (event) {
    $btn = $(event.currentTarget);
    $btn.prop("disabled", true);
    var that = this;

    if (that.follow.isNew()) {
      that.follow.save({}, {
        success: function () {
          var userModel = new Nebulr.Models.User({ id: that.currentUser.id });
          userModel.fetch().then( function () {
            that.model.followingUsers().add(userModel);
          });

          that._toggleButtonValue($btn);
          $btn.prop("disabled", false);
        }.bind(that)
      });
    } else {
      that.follow.destroy({
        success: function () {
          var userModel = that.model.followingUsers().findWhere({
            id: that.currentUser.id
          });

          that.model.followingUsers().remove(userModel);
          that._toggleButtonValue($btn);
          $btn.prop("disabled", false);
          that.follow = new Nebulr.Models.Follow({
            user_id: that.currentUser.id,
            mission_id: that.model.id
          });
        }.bind(that)
      });
    }
  },

  _toggleButtonValue: function ($btn) {
    if ($btn.attr('value').slice(0, 2) === "UN") {
      $btn.attr('value', $btn.attr('value').slice(2));
    } else {
      $btn.attr('value', "UN" + $btn.attr('value'));
    }
  },

  _enlistButtonValue: function () {
    this.enlist = this.model.enlists().findWhere({
      user_id: this.currentUser.id
    });

    if (!this.enlist) {
      this.enlist = new Nebulr.Models.Enlist({
        user_id: this.currentUser.id,
        mission_id: this.model.id
      });
    }

    return (this.enlist.isNew()) ? "ENLIST" : "UNENLIST";
  },

  _followButtonValue: function () {
    this.follow = this.model.follows().findWhere({
      user_id: this.currentUser.id
    });

    if (!this.follow) {
      this.follow = new Nebulr.Models.Follow({
        user_id: this.currentUser.id,
        mission_id: this.model.id
      });
    }

    return (this.follow.isNew()) ? "FOLLOW" : "UNFOLLOW";
  },

  destroy: function () {
    this.model.destroy();
    Backbone.history.navigate('', { trigger: true });
  }
});
