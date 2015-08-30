class DaysController < ApplicationController
    before_action :authenticate_user

    def index
        @user = current_user
        @days = @user.days
        @charts = {}
        @days.each do |day|
            @charts[day.order] = {
                name: day.name,
                exercises: {}
            }
            day.exercises.each do |exercise|
                chart = LazyHighCharts::HighChart.new('line') do |f|
                    f.title(text: exercise.name)
                    f.xAxis(categories: exercise.dates)
                    f.series(name: "Max Weight (1 Rep)", yAxis: 0, data: exercise.one_rep_max_weight_days)
                    f.series(name: "Max Weight (Cumulative)", yAxis: 1, data: exercise.cumulative_max_weight_days)

                    f.yAxis [
                        {title: {text: "LBs"}},
                        {title: {text: "LBs"}},
                    ]

                    f.legend(:align => 'right', :verticalAlign => 'top', :y => 75, :x => -50, :layout => 'vertical',)
                end

                @charts[day.order][:exercises][:rank] = {
                    name: exercise.name,
                    chart: chart
                }
            end
        end
    end
end
