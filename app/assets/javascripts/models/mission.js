Nebulr.Models.Mission = Backbone.Model.extend({
  urlRoot: "api/missions",

  leader: function () {
    if (!this._leader) {
      this._leader = new Nebulr.Models.User();
    }
    return this._leader;
  },

  enlistedUsers: function () {
    if (!this._enlistedUsers) {
      this._enlistedUsers = new Nebulr.Collections.Users();
    }
    return this._enlistedUsers;
  },

  followingUsers: function () {
    if (!this._followingUsers) {
      this._followingUsers = new Nebulr.Collections.Users();
    }
    return this._followingUsers;
  },

  parse: function (response) {
    if (response.leader_id) {
      this.leader().set("id", response.leader_id);
      delete response.leader_id;
    }
    if (response.enlisted_users) {
      this.enlistedUsers().set(response.enlisted_users);
      delete response.enlisted_users;
    }
    if (response.following_users) {
      this.followingUsers().set(response.following_users);
      delete response.following_users;
    }

    return response;
  }
});
