Nebulr.Collections.Comments = Backbone.Collection.extend({
  url: 'api/comments',
  model: Nebulr.Models.Comment,

  comparator: 'created_at'
});
