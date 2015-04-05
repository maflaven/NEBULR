## feature breakdown
|                    | users                       | missions                             |
|--------------------|-----------------------------|--------------------------------------|
| models             | User                        | Mission                              |
| controllers        | Api::Users                  | Api::Missions                        |
| views              | show, index                 | show, index                          |
| models/collections | User                        | Mission, Missions                    |
| views              | form, show, navbar          | form, show, index, index item        |
| templates          | form, show, navbar          | form, show, index, index item, edit |
| 3rd party          | serializeJSON, omniauth?    | serializeJSON                        |

## feature breakdown
|                    | comments                             | search by map                | search by filter |
|--------------------|--------------------------------------|------------------------------|------------------|
| models             | Comment                              |                              |                  |
| controllers        | Api::Comments                        |                              |                  |
| views              | show, index                          |                              |                  |
| models/collections | Comment, Comments                    |                              |                  |
| views              | form, index, index item              | show, mapSearch, mapItem     | form             |
| templates          | form, index, index item              | show, mapSearch, mapItem     | form             |
| 3rd party          | serializeJSON                        | Google Maps                  |                  |

## feature breakdown
|                    | navbar                               |
|--------------------|--------------------------------------|
| models             |                                      |
| controllers        |                                      |
| views              |                                      |
| models/collections |                                      |
| views              | navbar                               |
| templates          | navbar                               |
| 3rd party          |                                      |
