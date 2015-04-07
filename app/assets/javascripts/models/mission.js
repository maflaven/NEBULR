Nebulr.Models.Mission = Backbone.Model.extend({
  urlRoot: "api/missions",

  // enlistedUsers: function () {
  //   if (!this._enlistedUsers) {
  //     this._enlistedUsers = new Nebulr.Collections.Users()
  //   }
  // },
  //
  // parse: function (response) {
  //   if (response.enlisted_users) {
  //     this.enlistedUsers().set(response.enlisted_users, { parse: true });
  //     delete response.enlisted_users();
  //   }
  //
  //   return response;
  // }
});
