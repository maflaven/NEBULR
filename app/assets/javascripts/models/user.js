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

  comments: function () {
    if (!this._comments) {
      this._comments = new Nebulr.Collections.Comments();
    }
    return this._comments;
  },

  feed: function () {
    if (!this._feed) {
      this._feed = new Nebulr.Collections.Updates();
    }
    return this._feed;
  },

  parse: function (response) {
    if (response.enlisted_missions) {
      this.enlistedMissions().set(response.enlisted_missions, { parse: true });
      delete response.enlisted_missions;
    }
    if (response.followed_missions) {
      this.followedMissions().set(response.followed_missions, { parse: true });
      delete response.followed_missions;
    }
    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }
    if (response.feed) {
      this.feed().set(response.feed, { parse: true });
      delete response.feed;
    }

    return response;
  }
});
