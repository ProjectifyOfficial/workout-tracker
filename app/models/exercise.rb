class Exercise < ActiveRecord::Base
    belongs_to :day
    belongs_to :user
    has_many :sets
end
