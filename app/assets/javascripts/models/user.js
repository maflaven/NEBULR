Nebulr.Models.User = Backbone.Model.extend({
  urlRoot: 'users',

  enlistedMissions: function () {
    if (!this._enlistedMissions) {
      this._enlistedMissions = new Nebulr.Collections.Missions();
    }
    return this._enlistedMissions;
  },

  followedMissions: function () {
    if (!this._followedMissions) {
      this._followedMissions = new Nebulr.Collections.Missions();
    }
    return this._followedMissions;
  },

  parse: function (response) {
    if (response.enlisted_missions) {
      this.enlistedMissions().set(response.enlisted_missions);
      delete response.enlisted_missions;
    }
    if (response.followed_missions) {
      this.followedMissions().set(response.followed_missions);
      delete response.followed_missions;
    }

    return response;
  }
});
