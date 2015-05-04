Nebulr.Views.ModalHelp = Backbone.View.extend({
  template: JST['modal/help'],
  className: 'modal help-modal',
  tagname: 'section',
  id: 'modal',

  initialize: function (options) {
    ga('send', 'pageview', '/landing#help');
  },

  events: {
    'click .modal-close': 'close'
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  close: function (event) {
    this.$('.modal-screen').fadeOut("slow");
    this.$el.fadeOut("fast");
  }
});
