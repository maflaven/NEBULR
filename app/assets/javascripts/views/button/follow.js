Nebulr.Views.ButtonFollow = Backbone.View.extend({
  template: JST['button/follow'],

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click #follow-btn': 'followMission',
  },

  render: function () {
    this.$el.html(this.template({
      followBtnValue: this._followButtonValue()
    }));

    return this;
  },

  followMission: function (event) {
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
});
