class SetLog < ActiveRecord::Base
    belongs_to :exercise
    scope :date, lambda {|date| where('created_at > ? AND created_at < ?', DateTime.parse(date).beginning_of_day, DateTime.parse(date).end_of_day)}
end
