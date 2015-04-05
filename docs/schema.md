# Schema Information

## missions
| column name         | data type | details                                  |
|---------------------|-----------|------------------------------------------|
| id                  | integer   | not null, primary key                    |
| leader_id           | integer   | not null, foreign key (references users) |
| title               | string    | not null                                 |
| description         | text      | not null                                 |
| compensation        | string    |                                          |
| compensation_amount | decimal   |                                          |
| latitude            | decimal   | not null                                 |
| longitude           | decimal   | not null                                 |
| user_limit          | integer   |                                          |

## follows
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
mission_id  | integer   | not null, foreign key (references missions)
user_id     | integer   | not null, foreign key (references users)

## enlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
mission_id  | integer   | not null, foreign key (references missions)
user_id     | integer   | not null, foreign key (references users)

## comments
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
commentable_id   | integer   | not null, foreign key (references commentables.id)
commentable_type | string    | not null, foreign key (references commentables Class)
user_id          | integer   | not null, foreign key (references users)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
