Nebulr.Collections.Users = Backbone.Collection.extend({
  url: 'users',
  model: Nebulr.Models.User,

  getOrFetch: function (id) {
    var user = this.get(id);
    if (!user) {
      user = new Nebulr.Models.User({ id: id });
    }
    user.fetch();

    return user;
  }
});
