# nebulr

[Heroku link][heroku]

[heroku]: http://www.nebulr.space

## Minimum Viable Product
nebulr is a design clone of airbnb built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create session (log in)
- [ ] Create missions, and make them enlistable
- [ ] View missions, users
- [ ] Follow missions
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
App Academy. By the end of this phase, users will be able to sign up and sign in,
and create missions using a simple text form in a Rails view. The most important
part of this phase will be pushing the app to Heroku and ensuring that everything
works before moving on to phase 2. It is also important that I make a guest login
button so that users can demo the entire site without registering.

[Details][phase-one]

### Phase 2: Viewing & Creating Missions, Viewing Users (~2 days)
I will implement mission creation via backbone, integrating Filepicker for image
file upload so that users can add images to missions. I'll also create a user show
view where users can see their followed and enlisted missions, as well as those
on other users' show pages. I'll need to override the parse method for User and
Mission in order to correctly associate Missions with their leader, and associate
Users with their followed and enlisted Missions. To make Missions enlistable and
followable, I'll create a join table for each, and make the appropriate associations.

[Details][phase-two]

### Phase 3: Creating, Viewing, & Deleting Comments for Missions & Users (~1 day)
I will add indexes and and form creation for comments at the bottom of each
Mission and User Show view. This requires a commentable model in the rails
backend. Showing comments will require filtering by User or Mission. Users will
have the ability to delete any comments from their UserShow's as well as any Missions
they lead. They will only be able to delete their own comments from any other page.

[Details][phase-three]

### Phase 4: Editing Missions (~0.5 days)
I will add the ability to edit missions by changing each field in the mission
show page to an editable field by the click of an 'edit mission' button. Every
element of the mission form view will be reused, and another field to remove
enlisted users will be added.

[Details][phase-four]

### Phase 5: Searching Missions via Map (~2 day)
I will need to add search for the Mission controller. On the Backbone side,
there will be a SearchShow composite view containing a SearchMap view (using the
Google Maps API), a SearchForm view that filters out missions by date and compensation,
and a MissionsIndex composite view of the search results.

[Details][phase-five]

### Phase 6: Updating Mission Search by Filtering (~0.5 days)
I will implement updateable search results via the filters view and via
reorienting the SearchMap view. SearchShow will have to combine the filter form
data with the extent of the map to constrain the results appropriately.

[Details][phase-six]

### Phase 7: Basic CSS, Imagery, Seed Data (~1.5-2 days)
I will use bootstrap.css and potentially a bootstrap theme to dress everything
in a coherent, unobtrusive design. I will also scour the internet for freely usable
images to attach to seed missions. I will need to create a ~five seed users, twenty
missions, and a few comments, follows, and enlistments for each user/mission.

[Details][phase-seven]

### Bonus Features
- [ ] View a feed of mission updates in "followed missions"
- [ ] Google Map centered and zoomed-in on mission location (mission/show)
- [ ] Pagination/infinite scroll
- [ ] OmniAuth
- [ ] Multiple sessions/session management
- [ ] User avatars
- [ ] Comments with markdown

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
