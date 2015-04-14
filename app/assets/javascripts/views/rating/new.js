Nebulr.Views.RatingNew = Backbone.View.extend({
  initialize: function (options) {
    this.ratingModel = new Nebulr.Models.Rating({ mission_id: this.model.id });
    this.initialSet = true;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var that = this;
    if (this.model.get('completed') && this.model.get('is_enlisted')) {
      this.$el.rateYo({
        ratedFill: "#E74C3C",
        fullStar: true,
        onSet: that.setRating.bind(that)
      });
    }

    return this;
  },

  setRating: function (rating) {
    if (!this.initialSet) {
      var that = this;
      this.ratingModel.set({ value: rating });
      debugger
      this.ratingModel.save({}, {
        success: function () {
          that.model.set({
            ratings_count: that.model.get('ratings_count') + 1,
            ratings_total: that.model.get('ratings_total') + rating
          });
        }
      });
    }

    if (this.initialSet) {this.initialSet = false;}
  }
});
