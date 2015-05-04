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
    this.$el.slideUp("fast");
    $('.backdrop > .modal-screen').fadeOut("fast");
  },

  completeMission: function () {
    this.close();
    this.$('.modal-content').animate({ backgroundColor: "#77b300" }, 500);
    $('.navbar').animate({ backgroundColor: "#77b300" }, 500);
    $('.navbar').animate({ backgroundColor: "#222222" }, 700);
    this.model.save({ completed: true }, { wait: true });
    ga('send', 'event', 'mission', 'mission#complete');
  }
});
