Nebulr.Views.UpdateNew = Backbone.View.extend({
  template: JST['update/form'],
  tagName: 'div',
  className: 'update-new-form',

  initialize: function (options) {
    this.mission = options.mission;
    this.currentUserId = options.currentUserId;
    this.listenTo(this.mission, "sync", this.render);
  },

  events: {
    'submit .update-form': 'create'
  },

  render: function () {
    this.setAttributes();

    if (this.currentUserId && this.currentUserId == this.leaderId) {
      this.$el.html(this.template({ update: this.model }));
    }
    return this;
  },

  setAttributes: function () {
    if (this.mission) {
      this.leaderId = this.mission.leader().id;
    }
  },

  create: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
     $btn = $form.find('.create-update-btn');
     $btn.prop('disabled', true);

    var data = $form.serializeJSON();
    data = $.extend(data, {
      mission_id: this.mission.id
    });

    this.model.set(data);
    this.model.save({}, {
      success: function (model, response, options) {
        this.collection.add(this.model);
        this.model = new Nebulr.Models.Update();
        this.render();
      }.bind(this),
      error: function () {
        $btn.prop('disabled', false);
      }
    });
  }
});
