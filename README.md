# nebulr

[Heroku link][heroku]

[heroku]: #

## Minimum Viable Product
nebulr is a clone of airbnb built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create session (log in)
- [ ] Create missions, and make them enlistable
- [ ] View missions, users
- [ ] Create comments
- [ ] View comments for missions and users
- [ ] Search for missions by map
- [ ] Search for missions by date, compensation

## Design Docs
* [View Wireframes][views]
* [DB Schema][schema]
* [Feature Breakdown][breakdown]

[views]: ./docs/views.md
[schema]: ./docs/schema.md
[breakdown]: ./docs/feature_breakdown.md

## Implementation Timeline

### Phase 1: User Authentication, Mission Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create missions using
a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Phase 2: Viewing Missions and Users (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create blogs using
a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Bonus Features (TBD)
- [ ] Follow missions
- [ ] View a feed of mission updates in "followed missions"
- [ ] google map centered and zoomed in on mission location (mission show page)
- [ ] Pagination/infinite scroll
- [ ] Multiple sessions/session management
- [ ] User avatars
- [ ] Typeahead search bar

[phase-one]: ./docs/phases/phase1.md
