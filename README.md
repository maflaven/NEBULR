#NEBULR
NEBULR is a posting board for futuristic space jobs/missions.
It's a web application built with Ruby on Rails, PostgreSQL, Backbone.js, Google Maps API v3, Boostrap.js, and jQuery. The design is loosely inspired by airbnb.com.

Live link: [nebulr.space][live]
[live]: http://www.nebulr.space

###Main Functionality:
* Search for listings within visible map extents
* Filter search results by date, compensation, and rating
* Enlist in job/mission postings
* Follow jobs/missions and receive a feed of updates on the user feed

###Additional Features:
* Google Maps integration with custom imagery
* Backbone.js communicating with a RESTful JSON API
* Server-side searching
* Registration/login not required until enlist or follow actions
* Rate jobs/missions
* Comment on users and jobs/missions
* Polymorphic 'commentable' associations
* Image carousel
* Helpful alerts for every form
* Expandable updates

##Filter Methods
```ruby
def self.filter_by(data_type, min, max, missions_set=false)
  missions_set ||= Mission.all

  missions_set.where(data_type => min..max)
end

def self.filter_by_title_fragment(fragment, missions_set=false)
  missions_set ||= Mission.all

  missions_set.where("title LIKE ?", "%" + fragment + "%")
end
```
Simple database-level filtering allows for filter chaining:
```ruby
params[:search][:min_lat] && @missions = Mission.filter_by(
  :latitude, params[:search][:min_lat], params[:search][:max_lat], @missions
)

params[:search][:min_lng] && @missions = Mission.filter_by(
  :longitude, params[:search][:min_lng], params[:search][:max_lng], @missions
)

params[:search][:title] && @missions = Mission.filter_by_title_fragment(
  params[:search][:title], @missions
)
```

##Original Design Docs
* [View Wireframes][views]
* [DB Schema][schema]
* [Feature Breakdown][breakdown]

[views]: ./docs/views.md
[schema]: ./docs/schema.md
[breakdown]: ./docs/feature_breakdown.md

### Planned Upgrades
- [x] Expandable comments/updates
- [x] Delayed registration/login
- [ ] Pagination/infinite scroll
- [ ] OmniAuth
- [ ] Multiple sessions/session management
- [ ] Markdown comments
- [ ] Custom loading spinners
- [ ] Mission/job editing and relisting
- [ ] Custom infoBox for map view

###Screenshots
![mission/job](/app/assets/images/mission_show.jpg)
![user](/app/assets/images/user_show.jpg)
![search](/app/assets/images/mission_search.jpg)
