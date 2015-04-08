Nebulr.Views.MissionShow = Backbone.CompositeView.extend({
  template: JST['mission/show'],

  initialize: function (options) {
    this.currentUserId = options.currentUserId;
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click #enlist-btn': 'enlist',
    'click #follow-btn': 'follow'
  },

  render: function () {
    this.$el.html(this.template({
      mission: this.model,
      enlistBtnValue: this._enlistButtonValue(),
      followBtnValue: this._followButtonValue()
    }));

    var leader = this.model.leader();
    var leaderItemView = new Nebulr.Views.UserIndexItem({
      model: leader
    });
    this.addSubview('.mission-leader', leaderItemView);

    var enlistedUsers = this.model.enlistedUsers();
    var enlistedUsersIndexView = new Nebulr.Views.UserIndex({
      collection: enlistedUsers
    });
    this.addSubview('.enlisted-users-index', enlistedUsersIndexView);

    var followingUsers = this.model.followingUsers();
    var followingUsersIndexView = new Nebulr.Views.UserIndex({
      collection: followingUsers
    });
    this.addSubview('.following-users-index', followingUsersIndexView);

    return this;
  },

  enlist: function (event) {
    $btn = $(event.currentTarget);
    $btn.prop("disabled", true);
    var that = this;

    if (that.enlist.isNew()) {
      that.enlist.save({}, {
        success: function () {
          var userModel = new Nebulr.Models.User({ id: that.currentUserId });
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
            id: that.currentUserId
          });
          that.model.enlistedUsers().remove(userModel);

          that._toggleButtonValue($btn);
          $btn.prop("disabled", false);
          that.enlist = new Nebulr.Models.Enlist({
            user_id: that.currentUserId,
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
          var userModel = new Nebulr.Models.User({ id: that.currentUserId });
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
            id: that.currentUserId
          });

          that.model.followingUsers().remove(userModel);
          that._toggleButtonValue($btn);
          $btn.prop("disabled", false);
          that.follow = new Nebulr.Models.Follow({
            user_id: that.currentUserId,
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
      user_id: this.currentUserId
    });

    if (!this.enlist) {
      this.enlist = new Nebulr.Models.Enlist({
        user_id: this.currentUserId,
        mission_id: this.model.id
      });
    }

    return (this.enlist.isNew()) ? "ENLIST" : "UNENLIST";
  },

  _followButtonValue: function () {
    this.follow = this.model.follows().findWhere({
      user_id: this.currentUserId
    });

    if (!this.follow) {
      this.follow = new Nebulr.Models.Follow({
        user_id: this.currentUserId,
        mission_id: this.model.id
      });
    }

    return (this.follow.isNew()) ? "FOLLOW" : "UNFOLLOW";
  }
});
