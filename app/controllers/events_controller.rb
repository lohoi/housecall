class EventsController < ApplicationController
    # skip_before_action :verify_authenticity_token
    def create
        @event = Event.new(event_params)
        @event.save!
        respond_to do |format|
            format.json { render json: @event, status: :ok}
        end
    end

    def destroy
        event = Event.find(params[:id]).destroy
        # event.active = false
        # event.save()
    end

    def show
        @event = Event.find(params[:id])
        respond_to do |format|
            format.json
        end
    end

     # get all events for user
    def index
        user = User.find(params[:user_id])
        patient_id = params[:patient_id]
        if patient_id == nil
            @events = Event.where(user_id: user.id)
        else            
            @events = Event.where(user_id: user.id, patient_id: patient_id)
        end
        respond_to do |format|
            format.json { render json: @events}
        end
    end

    def update
        @event = Event.find(params[:event][:id])
        @event.title = params[:event][:title]
        @event.description = params[:event][:text]
        @event.start = params[:event][:start]
        @event.end = params[:event][:end]
        @event.color = params[:event][:color][:primary]
        @event.allDay = params[:event][:allDay]
        @event.draggable = params[:event][:draggable]        
        @event.resizeBeforeStart = params[:event][:resizable][:beforeStart]
        @event.resizeAfterEnd = params[:event][:resizable][:afterEnd]

        @event.save
        respond_to do |format|
            format.json
        end
    end
    private
    def event_params
      params.require(:event).permit(
          :title, 
          :description,
          :start,
          :end,
          :color,
          :allDay,
          :draggable,
          :resizeBeforeStart,
          :resizeAfterEnd,
          :user_id, 
          :patient_id)
      {
        title: params[:event][:title], 
        description: params[:event][:description],
        start: params[:event][:start],
        end: params[:event][:end],
        color: params[:event][:color][:primary],
        allDay: params[:event][:allDay],
        draggable: params[:event][:draggable],        
        resizeBeforeStart: params[:event][:resizable][:beforeStart],
        resizeAfterEnd: params[:event][:resizable][:afterEnd],
        user_id: params[:event][:user_id],
        patient_id: params[:event][:patient_id]
      }
    end
end