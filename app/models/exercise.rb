class Exercise < ActiveRecord::Base
    belongs_to :day
    belongs_to :user
    has_many :set_logs

    def dates
        return set_logs.pluck(:created_at).map {|x| "#{x.month}/#{x.day}"}.join(', ').to_json.html_safe
    end

    def cumulative_max_weight_days
        # returns an hash like this:
        # => {"8/29"=>180, "8/30"=>400}
        array = []
        set_logs.order(created_at: :asc).pluck(:created_at).each do |x|
            array << set_logs.date("#{x.year}-#{x.month}-#{x.day}").pluck(:weight, :reps).map {|x| x[0] * x[1]}.reduce(:+)
        end
        return array.join(', ').to_json.html_safe
    end

    def one_rep_max_weight_days
        # returns an hash like this:
        # => {"8/29"=>15, "8/30"=>25}
        array = []
        set_logs.order(created_at: :asc).pluck(:created_at).each do |x|
            array << set_logs.date("#{x.year}-#{x.month}-#{x.day}").pluck(:weight).max
        end
        return array.join(', ').to_json.html_safe
    end
end
