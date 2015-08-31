class DaysController < ApplicationController
    before_action :authenticate_user

    def index
        @user = current_user
        @days = @user.days
    end

    def show
        @day = Day.find(params[:id])
    end

    def new
        @day = Day.new
    end

    def create
        @day = Day.new(day_params)
        @day.user = current_user

        if day_params[:order] == "-1" && !Day.where(order: 1).first.nil?
            Day.all.each do |day|
                day.update(order: day.order + 1)
            end
            @day.order = 1
        elsif day_params[:order] == "-1" && Day.where(order: 1).first.nil?
            @day.order = 1
        end

        if @day.save
            respond_to do |format|
                format.html { redirect_to day_path(@day) }
            end
        else
            respond_to do |format|
                format.html { render action: 'new', notice: 'Error creating Day Routine.' }
            end
        end
    end

    def edit
        @day = Day.find(params[:id])
    end

    def update
        @day = Day.find(params[:id])

        if @day.update_attributes(day_params)
            respond_to do |format|
                format.html { redirect_to day_path(@day) }
            end
        else
            respond_to do |format|
                format.html { render action: 'new', notice: 'Error updating Day Routine.' }
            end
        end
    end

    def destroy
        @day = Day.destroy(params[:id])
        redirect_to days_path
    end

    private

    def day_params
        params.require(:day).permit(
            :name,
            :order
        )
    end
end
