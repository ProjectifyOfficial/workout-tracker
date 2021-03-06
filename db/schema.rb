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

ActiveRecord::Schema.define(version: 20150831004136) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "days", force: :cascade do |t|
    t.string   "name",       default: "", null: false
    t.integer  "order",      default: 99, null: false
    t.integer  "user_id",                 null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "exercises", force: :cascade do |t|
    t.string   "name",                   default: "", null: false
    t.integer  "rank",                   default: 99, null: false
    t.integer  "sets",                   default: 4,  null: false
    t.integer  "one_rep_base_weight",    default: 0,  null: false
    t.integer  "cumulative_base_weight", default: 0,  null: false
    t.integer  "day_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",                             null: false
  end

  create_table "set_logs", force: :cascade do |t|
    t.integer  "exercise_id",             null: false
    t.integer  "reps",        default: 0, null: false
    t.integer  "weight",      default: 0, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "name"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
