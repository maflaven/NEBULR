Nebulr.Views.MissionForm = Backbone.View.extend({
  template: JST['mission/form'],
  tagName: 'form',
  className: 'mission-form center-block',

  initialize: function (options) {
    this.currentUserId = options.currentUserId;
    this.listenTo(this.model, "sync", this.render);
    this.images = new Nebulr.Collections.Images();
  },

  events: {
    'click #filepicker': 'uploadPics',
    'click .submit-mission-form': 'submitForm'
  },

  render: function () {
    this.$el.html(this.template({ mission: this.model }));
    return this;
  },

  submitForm: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this;

    this.model.save(attrs, {
      success: function (response) {
        Backbone.history.navigate('missions/' + that.model.id, { trigger: true });
        that.images.each( function (image) {
          image.save({ mission_id: that.model.id });
        });
      },

      error: function (model, response, options) {
        var errors = response.responseJSON;
        errors.forEach( function (error) {
          this._processError(error);
          // this.$el.prepend('<p>' + error + '<p>');
        }.bind(this));
      }.bind(this)
    });
  },

  uploadPics: function () {
    var that = this;
    filepicker.pickMultiple({maxFiles: 3, maxSize: 3*1024*1024}, function(blobs) {
      blobs.forEach( function (blob) {
        var newImage = new Nebulr.Models.Image({
          filepicker_url: blob.url
        });
        that.images.add(newImage);
      });
    });
  },

  _processError: function (error) {
    var errorId = error.split(' ')[0].toLowerCase();
    var $field = this.$("#" + errorId);
    $field.addClass('ui-state-highlight');
  }
});
