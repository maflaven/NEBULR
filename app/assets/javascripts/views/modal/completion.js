Nebulr.Views.ModalCompletion = Backbone.View.extend({
  template: JST['modal/completion'],
  className: 'modal',
  tagName: 'section',
  id: 'modal',

  events: {
    'click .modal-close': 'close',
    'click .mission-complete': 'completeMission'
  },

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  close: function () {
    this.$el.removeClass('is-active');
  },

  completeMission: function () {
    this.close();
    this.model.save({ completed: true }, { wait: true });
  }
});
