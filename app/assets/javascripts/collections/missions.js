Nebulr.Collections.Missions = Backbone.Collection.extend({
  url: "api/missions",
  model: Nebulr.Models.Mission,

  getOrFetch: function (id) {
    var mission = this.get(id);
    if (!mission) {
      mission = new Nebulr.Models.Mission({ id: id });
    }
    mission.fetch();

    return mission;
  }
});
