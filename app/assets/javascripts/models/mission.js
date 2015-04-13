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

  enlists: function () {
    if (!this._enlists) {
      this._enlists = new Nebulr.Collections.Enlists();
    }
    return this._enlists;
  },

  follows: function () {
    if (!this._follows) {
      this._follows = new Nebulr.Collections.Follows();
    }
    return this._follows;
  },

  images: function () {
    if (!this._images) {
      this._images = new Nebulr.Collections.Images();
    }
    return this._images;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new Nebulr.Collections.Comments();
    }
    return this._comments;
  },

  parse: function (response) {
    if (response.leader_id) {
      this.leader().set('id', response.leader_id);
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
    if (response.enlists) {
      this.enlists().set(response.enlists);
      delete response.enlists;
    }
    if (response.follows) {
      this.follows().set(response.follows);
      delete response.follows;
    }
    if (response.images) {
      this.images().set(response.images);
      delete response.images;
    }
    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    return response;
  }
});
