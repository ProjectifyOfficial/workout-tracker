class ExercisesController < ApplicationController
    before_action :authenticate_user

    def index
        @user = current_user
        @exercises = @user.exercises
    end

    def show
        @exercise = Exercise.find(params[:id])
        redirect_to root_path if @exercise.user != current_user
    end

    def new
        @exercise = Exercise.new
    end

    def create
        @exercise = Exercise.new(exercise_params)
        @exercise.user = current_user

        if @exercise.save
            respond_to do |format|
                format.html { redirect_to exercise_path(@exercise) }
            end
        else
            respond_to do |format|
                format.html { render action: 'new', notice: 'Error creating Exercise.' }
            end
        end
    end

    def edit
        @exercise = Exercise.find(params[:id])
        redirect_to root_path if @exercise.user != current_user
    end

    def update
        @exercise = Exercise.find(params[:id])

        if @exercise.user == current_user
            if @exercise.update_attributes(exercise_params)
                respond_to do |format|
                    format.html { redirect_to exercise_path(@exercise) }
                end
            else
                respond_to do |format|
                    format.html { render action: 'new', notice: 'Error updating Exercise.' }
                end
            end
        else
            redirect_to root_path
        end
    end

    def destroy
        @exercise = Exercise.find(params[:id])

        if @exercise.user == current_user
            redirect_to root_path
        else
            @exercise.destroy
            redirect_to exercises_path
        end
    end

    private

    def exercise_params
        params.require(:exercise).permit(
            :name,
            :rank,
            :sets,
            :one_rep_base_weight,
            :cumulative_base_weight,
            :day_id
        )
    end
end
