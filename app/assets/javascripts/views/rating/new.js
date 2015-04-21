Nebulr.Views.RatingNew = Backbone.View.extend({
  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.initialSet = true;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var that = this;
    if (this.currentUser.id && this.model.get('completed') && this.model.get('is_enlisted')) {
      this.setRatingModel();
      this.$el.rateYo({
        ratedFill: "#E74C3C",
        rating: this.ratingModel.get('value'),
        fullStar: true,
        onSet: that.setRating.bind(that)
      });
    }

    return this;
  },

  setRating: function (rating) {

    if (!this.initialSet) {
      var that = this;

      var oldValue = this.ratingModel.get('value');
      this.ratingModel.set({
        value: rating
      });
      this.ratingModel.save({}, {
        success: function () {
          that.updateRatings(oldValue, rating);
          that.isNewRating = false;
        }
      });
    }

    if (this.initialSet) {this.initialSet = false;}
  },

  updateRatings: function (oldValue, newValue) {
    if (this.isNewRating) {
      this.model.set({
        ratings_count: this.model.get('ratings_count') + 1,
        ratings_total: this.model.get('ratings_total') + newValue
      });
    } else {
      this.model.set({
        ratings_total: this.model.get('ratings_total') + newValue - oldValue
      });
    }
  },

  setRatingModel: function () {
    if (this.currentUser.id) {
      this.ratingModel = this.model.ratings().findWhere({
        user_id: this.currentUser.id.toString()
      });
    }

    if (!this.ratingModel) {
      this.ratingModel = new Nebulr.Models.Rating({
        mission_id: this.model.id
      });
      this.isNewRating = true;
      this.initialValue = 0;
    } else {
      this.initialValue = this.ratingModel.get('value');
      this.isNewRating = false;
    }
  }
});
