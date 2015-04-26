Nebulr.Views.MissionCarousel = Backbone.View.extend({
  template: JST['mission/carousel'],
  className: 'mission-carousel',

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click .slick-next': 'nextImage',
    'click .slick-prev': 'prevImage'
  },

  render: function () {
    var images;
    if (this.collection.length === 0) {
      defaultImage = new Nebulr.Models.Image({
        filepicker_url: "https://www.filepicker.io/api/file/UuGSt7rqR4aVqjX5K54S"
      });
      images = new Nebulr.Collections.Images([defaultImage]);
    } else {
      images = this.collection;
    }

    this.$el.html(this.template({ images: images }));

    this.$('.slick-carousel').slick();

    return this;
  },

  nextImage: function () {
    $('.slick-carousel').slick('slickNext');
  },

  prevImage: function () {
    $('.slick-carousel').slick('slickPrev');
  }
});
