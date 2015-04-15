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
      spotsLeft: this.spotsLeft(),
      enlistBtnValue: this._enlistButtonValue()
    }));

    return this;
  },

  // renderSpotsLeft: function () {
  //   this.$('h4')
  // },

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
          that.model.enlistedUsers().add(userModel);
          that.model.enlists().add(that.enlist);

          that._toggleButtonValue($btn);
          that.render();
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
          that.enlist = new Nebulr.Models.Enlist({
            user_id: that.currentUser.id,
            mission_id: that.model.id
          });
          that.render();
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
  },

  spotsLeft: function () {
    if (this.model.enlistedUsers().length) {
      return this.model.get('user_limit') - this.model.enlistedUsers().length;
    } else if (this.model.get('user_limit')) {
      return this.model.get('user_limit');
    } else {
      return "&#8734;";
    }
  }
});
