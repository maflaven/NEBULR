## feature breakdown
|                    | users                       | missions                             |
|--------------------|-----------------------------|--------------------------------------|
| models             | User                        | Mission                              |
| controllers        | Api::Users                  | Api::Missions                        |
| views              | show, index                 | show, index                          |
| models/collections | User                        | Mission, Missions                    |
| views              | create, login, show, update | new, show, update, index, index item |
| templates          | create, login, show, update | new, show, update, index, index item |
| 3rd party          | serializeJSON, omniauth?    | serializeJSON                        |

## feature breakdown
|                    | comments                             | search by map | search by filter |
|--------------------|--------------------------------------|---------------|------------------|
| models             | Comment                              |               |                  |
| controllers        | Api::Comments                        |               |                  |
| views              | show, index                          |               |                  |
| models/collections | Comment, Comments                    |               |                  |
| views              | new, show, update, index, index item | show          | show             |
| templates          | new, show, update, index, index item | show          | show             |
| 3rd party          | serializeJSON                        | Google Maps   |                  |