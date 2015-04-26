Nebulr.Views.MissionForm = Backbone.View.extend({
  template: JST['mission/new'],
  className: 'mission-new row clearfix',

  initialize: function (options) {
    this.currentUserId = options.currentUserId;

    this.missionLocationView = new Nebulr.Views.MissionLocationShow({
      model: this.model
    });

    this.images = new Nebulr.Collections.Images();
    this.missionImagesView = new Nebulr.Views.ImageIndex({
      collection: this.images
    });

    this.listenTo(this.model, "sync change:latitude", this.renderForm);
  },

  events: {
    'click #filepicker': 'uploadPics',
    'click .submit-mission-form': 'submitForm'
  },

  render: function () {
    this.$el.html(this.template({
      mission: this.model
    }));
    this.renderForm();
    this.$('.image-index').html(this.missionImagesView.$el);
    this.missionImagesView.render();

    this.$('.map').html(this.missionLocationView.$el);
    this.missionLocationView.render();
    return this;
  },

  renderForm: function () {
    var attrs = this.$('form').serializeJSON();
    delete attrs.latitude; delete attrs.longitude;
    this.model.set(attrs);

    this.$('.form').html(JST['mission/form']({
      mission: this.model
    }));

    this.$('#title').focus();
  },

  submitForm: function (event) {
    this.renderForm();
    event.preventDefault();
    var $submitButton = $(event.currentTarget);
    $submitButton.prop('disabled', true);
    var $imgButton = this.$('button.filepicker');
    $imgButton.prop('disabled', true);

    var attrs = this.$('form').serializeJSON();
    var that = this;

    this.model.save(attrs, {
      success: function (response) {
        that.images.each( function (image) {
          image.save({ mission_id: that.model.id });
        });
        Backbone.history.navigate('missions/' + that.model.id, { trigger: true });
      },

      error: function (model, response, options) {
        response.responseJSON.forEach( function (error) {
          that._processError(error);
        });
        $submitButton.prop('disabled', false);
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
    });
  },

  _processError: function (error) {
    var errorId = error.split(' ')[0].toLowerCase();
    var $field = this.$("#" + errorId);
    $field.addClass('ui-state-highlight');
    var $errorDiv = $('<div class="error-message">');
    $errorDiv.html(error.toUpperCase()).addClass('alert alert-warning').hide();
    $errorDiv.insertBefore($field);
    $errorDiv.fadeIn("fast");
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.missionLocationView.remove();
    this.missionImagesView.remove();
  }
});
