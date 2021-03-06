Nebulr.Views.SearchLanding = Backbone.CompositeView.extend({
  template: JST['search/landing'],
  className: 'search-landing',

  initialize: function (options) {
    this.filterData = options.filterData;
    this.ssObjects = {
      'sun': [82, 0, 0], 'mercury': [64, 0, 5], 'venus': [60.4, 0, 5],
      'earth': [55.67, 0, 5], 'moon': [55.67, -7.33, 5], 'mars': [51, 0, 5],
      'jupiter': [15.1, 0, 2], 'saturn': [-43.7, 0, 2], 'uranus': [-67.2, 0, 3],
      'neptune': [-75.6, 0, 3]
    };
    this.helpModalView = new Nebulr.Views.ModalHelp();
    this.addSubview('.help-modal', this.helpModalView);
  },

  events: {
    'click #search-btn': 'search',
    'click .planet-label': 'search',
    'click #help-btn': 'attachHelpModal'
  },

  render: function () {
    this.$el.html(this.template());
    this.$('#start-date').datepicker({
      showAnim: 'fadeIn',
      dateFormat: 'yy-mm-dd'
    });
    this.$('#end-date').datepicker({
      showAnim: 'fadeIn',
      dateFormat: 'yy-mm-dd'
    });
    this.addDateEventHandlers();
    this.attachSubviews();
    return this;
  },

  search: function (event) {
    event.preventDefault();
    $link = $(event.currentTarget);
    var data = {};

    if ($link.hasClass('planet-label')) {
      data['ss-object'] = $link.prop('id');
    } else {
      data = this.$('.mission-search-form').serializeJSON();
    }

    if (data['ss-object']) {
      var object = data['ss-object'];
      data['center_lat'] = this.ssObjects[object][0];
      data['center_lng'] = this.ssObjects[object][1];
      data['zoom'] = this.ssObjects[object][2];
      delete data['ss-object'];
    }
    this.filterData = $.extend(this.filterData, data);

    if (!this.filterData['min_date'] || !this.filterData['max_date']) {
      delete this.filterData['min_date']; delete this.filterData['max_date'];
    }

    Backbone.history.navigate('#missions/search', { trigger: true });
  },

  attachHelpModal: function (event) {
    ga('send', 'pageview', '/landing#help');
    this.helpModalView.$('.modal-screen').fadeIn("fast");
    this.helpModalView.$el.fadeIn("fast");
  },

  addDateEventHandlers: function () {
    this.$('#start-date').on('change', function () {
      this.setStartDate();
      this.restrictDateRange();
    }.bind(this));
    this.$('#end-date').on('change', function () {
      this.setEndDate();
      this.restrictDateRange();
    }.bind(this));
  },

  setStartDate: function () {
    this.startDate = this.$('#start-date').datepicker('getDate');
  },

  setEndDate: function () {
    this.endDate = this.$('#end-date').datepicker('getDate');
  },

  restrictDateRange: function () {
    if (this.startDate) {
      this.$('#end-date').datepicker('option', 'minDate', this.startDate);
    }
    if (this.endDate) {
      this.$('#start-date').datepicker('option', 'maxDate', this.endDate);
    }
  }
});
