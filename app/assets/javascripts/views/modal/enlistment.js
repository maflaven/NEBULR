Nebulr.Views.ModalEnlistment = Backbone.View.extend({
  template: JST['modal/enlistment'],
  className: 'modal',
  tagName: 'section',
  id: 'modal',

  events: {
    'click .modal-close': 'close',
    'click .user-enlist': 'triggerEnlist'
  },

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  close: function () {
    this.$el.removeClass('is-active');
  },

  triggerEnlist: function () {
    this.close();
    this.model.set({ triggerEnlist: true });
    this.model.set({ triggerEnlist: false }, { silent: true });
  }
});
