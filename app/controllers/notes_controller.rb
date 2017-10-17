class NotesController < ApplicationController
    # skip_before_action :verify_authenticity_token
    def create
        @note = Note.new(note_params)
        @note.save!
        respond_to do |format|
            format.json
        end
    end

    def destroy
        note = Note.find(params[:id])
        note.active = false
        note.save()
        # @message = "note destroyed"
        # if note.save
        #     respond_to do |format|
        #         format.json { render json: @message }
        #     end
        # end
    end

    def show
        @note = Note.find(params[:id], active: true)
        respond_to do |format|
            format.json
        end
    end

    # get all notes for user
    def index
        user = User.find(params[:user_id])
        patient_id = params[:patient_id]
        @notes = Note.where(user_id: user.id, patient_id: patient_id, active: true)
        respond_to do |format|
            format.json { render json: @notes}
        end
    end

    def update
        @note = Note.find(params[:note][:id])
        @note.title = params[:note][:title]
        @note.text = params[:note][:text]
        @note.save
        respond_to do |format|
            format.json
        end
    end

    private
      def note_params
        params.require(:note).permit(:title, :text, :user_id, :patient_id)
        {title: params[:note][:title], text: params[:note][:text], user_id: params[:note][:user_id], patient_id: params[:note][:patient_id]}
      end
end
