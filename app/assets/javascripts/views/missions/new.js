Nebulr.Views.MissionForm = Backbone.View.extend({
  template: JST['mission/form'],
  tagName: 'form',

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click .submit-mission-form': 'submitForm'
  },

  render: function () {
    this.$el.html(this.template({ mission: this.model }));
    return this;
  },

  submitForm: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    attrs.latitude = parseFloat(attrs.latitude);
    attrs.longitude = parseFloat(attrs.longitude);
    debugger
    this.model.save(attrs, {
      success: function () {
        Backbone.history.navigate('missions/' + this.model.id, { trigger: true });
      }.bind(this)
    });
  }
});
