Nebulr.Views.RatingAverage = Backbone.View.extend({
  initialize: function (options) {
    this.calcAvg();
    this.$el.rateYo({
      ratedFill: "#E74C3C",
      readOnly: true
    });
    this.listenTo(this.model, "sync change:ratings_count", this.render);
  },

  render: function () {
    this.calcAvg();

    this.$el.rateYo('option', 'rating', this.avgRating);

    return this;
  },

  calcAvg: function () {
    this.totalRating = this.model.get('ratings_total');
    this.countRating = this.model.get('ratings_count');
    this.avgRating = this.model.get('ratings_avg');

    if (this.countRating > 0) {
      this.avgRating = this.totalRating / this.countRating;
    }
  }
});
