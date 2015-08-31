class SetsController < ApplicationController
    before_action :authenticate_user

    def index
        @exercise = Exercise.find(params[:exercise_id])
        redirect_to root_path if @exercise.user != current_user
        @sets = @exercise.set_logs
    end

    def show
    end

    def new
        @exercise = Exercise.find(params[:exercise_id])
        redirect_to root_path if @exercise.user != current_user
        @set = SetLog.new
    end

    def create
        @exercise = Exercise.find(params[:exercise_id])
        if @exercise.user == current_user
            @set = SetLog.new(set_params)
            @set.exercise = @exercise

            if @set.save
                respond_to do |format|
                    format.html { redirect_to exercise_sets_path(@exercise) }
                end
            else
                respond_to do |format|
                    format.html { render action: 'new', notice: 'Error creating Set.' }
                end
            end
        else
            redirect_to root_path
        end
    end

    def destroy
        @exercise = Exercise.find(params[:exercise_id])
        if @exercise.user == current_user
            SetLog.destroy(params[:id])
            redirect_to exercise_sets_path(@exercise)
        else
            redirect_to root_path
        end
    end

    private

    def set_params
        params.require(:set_log).permit(
            :exercise_id,
            :reps,
            :weight
        )
    end
end
