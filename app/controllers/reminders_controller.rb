class RemindersController < ApplicationController
    # skip_before_action :verify_authenticity_token
    def create
        @reminders = Reminder.new(reminder_params)
        @reminders.save!
        respond_to do |format|
            format.json { render json: @reminders, status: :ok}
        end
    end

    def destroy
        reminders = Reminder.find(params[:id])
        reminders.active = false
        reminders.save()
    end

    def show
        @reminders = Reminder.find(params[:id], active: true)
        respond_to do |format|
            format.json
        end
    end

    # get all reminders for user
    def index
        user = User.find(params[:user_id])
        patient_id = params[:patient_id]
        @reminders = Reminder.where(user_id: user.id, patient_id: patient_id)
        respond_to do |format|
            format.json { render json: @reminders}
        end
    end

    def update
        @reminder = Reminder.find(params[:reminder][:id])
        @reminder.completed = params[:reminder][:completed]
        @reminder.save
        respond_to do |format|
            format.json
        end
    end

    private
      def reminder_params
        params.require(:reminder).permit(:text, :user_id, :patient_id, :completed)
        {text: params[:reminder][:text], user_id: params[:reminder][:user_id], patient_id: params[:reminder][:patient_id], completed: params[:reminder][:completed]}
      end
end
