Nebulr.Views.ModalCancellation = Backbone.View.extend({
  template: JST['modal/cancellation'],
  className: 'modal',
  tagName: 'section',
  id: 'modal',

  events: {
    'click .modal-close': 'close',
    'click .mission-destroy': 'destroyMission'
  },

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  close: function () {
    this.$el.removeClass('is-active');
  },

  destroyMission: function () {
    this.close();
    this.model.destroy({
      success: function () {
        Backbone.history.navigate('', { trigger: true });
      }
    });
  }
});
