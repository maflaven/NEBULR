Nebulr.Models.Update = Backbone.Model.extend({
  urlRoot: 'api/models',

  mission: function () {
    if (!this._mission) {
      this._mission = new Nebulr.Models.Mission();
    }
    return this._mission;
  },

  parse: function (response) {
    if (response.mission) {
      this.mission().set({ id: response.mission }, { parse: true });
      delete response.mission;
    }

    return response;
  }
});
