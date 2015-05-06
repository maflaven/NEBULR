# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150506211945) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer  "commentable_id",   null: false
    t.string   "commentable_type", null: false
    t.integer  "user_id",          null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.text     "body",             null: false
  end

  add_index "comments", ["commentable_id"], name: "index_comments_on_commentable_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "enlists", force: :cascade do |t|
    t.integer  "mission_id", null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "enlists", ["mission_id", "user_id"], name: "index_enlists_on_mission_id_and_user_id", unique: true, using: :btree
  add_index "enlists", ["mission_id"], name: "index_enlists_on_mission_id", using: :btree
  add_index "enlists", ["user_id"], name: "index_enlists_on_user_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "mission_id", null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "follows", ["mission_id", "user_id"], name: "index_follows_on_mission_id_and_user_id", unique: true, using: :btree
  add_index "follows", ["mission_id"], name: "index_follows_on_mission_id", using: :btree
  add_index "follows", ["user_id"], name: "index_follows_on_user_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.integer  "mission_id",     null: false
    t.string   "filepicker_url", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "images", ["mission_id"], name: "index_images_on_mission_id", using: :btree

  create_table "missions", force: :cascade do |t|
    t.integer  "leader_id",                    null: false
    t.string   "title",                        null: false
    t.text     "description",                  null: false
    t.integer  "user_limit"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "compensation"
    t.float    "latitude"
    t.float    "longitude"
    t.boolean  "completed",    default: false
    t.string   "start_date",                   null: false
    t.string   "end_date",                     null: false
  end

  add_index "missions", ["compensation"], name: "index_missions_on_compensation", using: :btree
  add_index "missions", ["end_date"], name: "index_missions_on_end_date", using: :btree
  add_index "missions", ["latitude"], name: "index_missions_on_latitude", using: :btree
  add_index "missions", ["leader_id"], name: "index_missions_on_leader_id", using: :btree
  add_index "missions", ["longitude"], name: "index_missions_on_longitude", using: :btree
  add_index "missions", ["start_date"], name: "index_missions_on_start_date", using: :btree
  add_index "missions", ["title"], name: "index_missions_on_title", unique: true, using: :btree

  create_table "ratings", force: :cascade do |t|
    t.string   "mission_id", null: false
    t.string   "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float    "value",      null: false
  end

  add_index "ratings", ["mission_id", "user_id"], name: "index_ratings_on_mission_id_and_user_id", unique: true, using: :btree
  add_index "ratings", ["mission_id"], name: "index_ratings_on_mission_id", using: :btree
  add_index "ratings", ["user_id"], name: "index_ratings_on_user_id", using: :btree
  add_index "ratings", ["value"], name: "index_ratings_on_value", using: :btree

  create_table "updates", force: :cascade do |t|
    t.integer  "mission_id", null: false
    t.string   "text",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "updates", ["mission_id"], name: "index_updates_on_mission_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "filepicker_url"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
