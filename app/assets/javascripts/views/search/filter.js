Nebulr.Views.SearchFilter = Backbone.View.extend({
  template: JST['search/filter'],
  className: 'search-filter',
  tagName: 'form',

  initialize: function (options) {
    this.filterData = options.filterData;
    this.collection = options.collection;

    if (this.filterData.planet) {
      this.updateMissionIndex();
    }
  },

  events: {
    'click #filter-submit': 'generateFilterData'
  },

  render: function () {
    this.$el.html(this.template({
      data: this.filterData
    }));
    this.attachCompensationSlider();
    this.attachRatingSlider();
    this.$('#min-date').datepicker({
      showAnim: 'fadeIn',
      dateFormat: 'yy-mm-dd'
    });
    this.$('#max-date').datepicker({
      showAnim: 'fadeIn',
      dateFormat: 'yy-mm-dd'
    });

    return this;
  },

  attachCompensationSlider: function () {
    var $cmpSliderDiv = this.$('#compensation-slider');
    this.min_cmp = 0;
    this.max_cmp = 100000;

    $cmpSliderDiv.slider({
      animate: "fast",
      min: 0,
      max: 100000,
      orientation: "horizontal",
      range: true,
      step: 1000,
      values: [this.min_cmp, this.max_cmp],
      slide: this.recordCompensation.bind(this)
    });

    this.$("#cmp-range").val("$" + $cmpSliderDiv.slider("values", 0) +
      " - $" + $cmpSliderDiv.slider("values", 1));
  },

  attachRatingSlider: function () {
    var $ratingSliderDiv = this.$('#rating-slider');
    this.min_rating = 0;
    this.max_rating = 5;

    $ratingSliderDiv.slider({
      animate: "fast",
      min: 0,
      max: 5,
      orientation: "horizontal",
      range: true,
      step: 0.5,
      values: [this.min_rating, this.max_rating],
      slide: this.recordRating.bind(this)
    });

    this.$("#rating-range").val($ratingSliderDiv.slider("values", 0) +
      " - " + $ratingSliderDiv.slider("values", 1));
  },

  recordCompensation: function (event, ui) {
    $("#cmp-range").val("$" + ui.values[0] + " - $" + ui.values[1]);
    this.min_cmp = ui.values[0];
    this.max_cmp = ui.values[1];
  },

  recordRating: function (event, ui) {
    $("#rating-range").val(ui.values[0] + " - " + ui.values[1]);
    this.min_rating = ui.values[0];
    this.max_rating = ui.values[1];
  },

  generateFilterData: function (event) {
    event.preventDefault();
    $(event.currentTarget).prop('disabled', true);

    var dates = this.$el.serializeJSON();

    var filterData = $.extend(
      dates, {
              'min_cmp': this.min_cmp,
              'max_cmp': this.max_cmp,
              'min_rating': this.min_rating,
              'max_rating': this.max_rating
             }
    );
    this.filterData = $.extend(this.filterData, filterData);
    this.updateMissionIndex();
  },

  updateMissionIndex: function () {
    if (!this.filterData['min_date'] || !this.filterData['max_date']) {
      delete this.filterData['min_date']; delete this.filterData['max_date'];
    }

    this.collection.fetch({
      data: { search: this.filterData },
      success: function () {
        this.$('#filter-submit').prop('disabled', false);
      }.bind(this)
    });
  }
});
