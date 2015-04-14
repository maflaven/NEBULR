Nebulr.Views.ButtonEnlist = Backbone.View.extend({
  template: JST['button/enlist'],

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click #enlist-btn': 'enlistUser'
  },

  render: function () {
    this.$el.html(this.template({
      enlistBtnValue: this._enlistButtonValue()
    }));

    return this;
  },

  enlistUser: function (event) {
    $btn = $(event.currentTarget);
    $btn.prop("disabled", true);
    var that = this;

    if (that.enlist.isNew()) {
      that.enlist.save({}, {
        success: function () {
          var userModel = new Nebulr.Models.User({ id: that.currentUser.id });
          userModel.fetch().then( function () {
            that.model.enlistedUsers().add(userModel);
            that.model.set({ 'is_enlisted': true });
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
          that.model.set({ 'is_enlisted': false });

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
  }
});
