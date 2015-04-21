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
    this.$el.slideUp("fast");
    $('.backdrop > .modal-screen').fadeOut("fast");
  },

  destroyMission: function () {
    this.close();
    this.model.destroy({
      success: function () {
        this.$('.modal-content').animate({ backgroundColor: "#cc0000" }, 500);
        $('.navbar').animate({ backgroundColor: "#cc0000" }, 500);
        $('.navbar').animate({ backgroundColor: "#222222" }, 1000);
        Backbone.history.navigate('', { trigger: true });
      }.bind(this)
    });
  }
});
