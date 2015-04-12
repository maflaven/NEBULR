Nebulr.Views.MissionForm = Backbone.View.extend({
  template: JST['mission/form'],
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
    var button = $(event.currentTarget);
    button.prop('disabled', true);

    var attrs = this.$('form').serializeJSON();
    var that = this;

    this.model.save(attrs, {
      success: function (response) {
        Backbone.history.navigate('missions/' + that.model.id, { trigger: true });
        that.images.each( function (image) {
          image.save({ mission_id: that.model.id });
        });
        button.prop('disabled', false);
      },

      error: function (model, response, options) {
        var errors = response.responseJSON;
        errors.forEach( function (error) {
          that._processError(error);
          // this.$el.prepend('<p>' + error + '<p>');
        });
        button.prop('disabled', false);
      }
    });
  },

  uploadPics: function () {
    var that = this;
    filepicker.pickMultiple({maxFiles: 3, maxSize: 3*1024*1024}, function (blobs) {
      blobs.forEach( function (blob) {
        var newImage = new Nebulr.Models.Image({
          filepicker_url: blob.url
        });
        that.images.add(newImage);
      });
      var imageIndexView = new Nebulr.Views.ImageIndex({ collection: that.images });
      that.$el.append(imageIndexView.render().$el);
    });
  },

  _processError: function (error) {
    var errorId = error.split(' ')[0].toLowerCase();
    var $field = this.$("#" + errorId);
    $field.addClass('ui-state-highlight');
  }
});
