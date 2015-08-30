class DaysController < ApplicationController
    before_action :authenticate_user

    def index
        @days = Day.all
    end
end
