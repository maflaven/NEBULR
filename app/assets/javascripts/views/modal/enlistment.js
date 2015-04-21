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
    this.$el.slideUp("fast");
    $('.backdrop > .modal-screen').fadeOut("fast");
  },

  triggerEnlist: function () {
    this.close();
    this.$('.modal-content').animate({ backgroundColor: "#2a9fd6" }, 500);
    $('.navbar').animate({ backgroundColor: "#2a9fd6" }, 500);
    $('.navbar').animate({ backgroundColor: "#222222" }, 700);
    this.model.set({ triggerEnlist: true });
    this.model.set({ triggerEnlist: false }, { silent: true });
  }
});
