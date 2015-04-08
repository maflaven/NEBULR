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

    this.model.save(attrs, {
      success: function () {
        Backbone.history.navigate('missions/' + this.model.id, { trigger: true });
      }.bind(this),

      error: function (model, response, options) {
        var errors = response.responseJSON;
        errors.forEach( function (error) {
          this._processError(error);
          // this.$el.prepend('<p>' + error + '<p>');
        }.bind(this));
      }.bind(this)
    });
  },

  _processError: function (error) {
    var errorId = error.split(' ')[0].toLowerCase();
    var $field = this.$("#" + errorId);
    $field.addClass('ui-state-highlight');

  }
});
