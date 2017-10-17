class PatientDescriptionsController < ApplicationController
  def create
    description = PatientDescription.new(patient_id: params[:patient_id], doctor_id: params[:doctor_id], text: params[:text])
    description.save!
  end

  # get /patient_descriptions/id
  def show
    @description = PatientDescription.find(params[:id])
  end

  # put/patch patient_descriptions/id 
  def update
    @description = PatientDescription.find(params[:id])
    @description.text = params[:text]
    @description.save
    respond_to do |format|
      format.json
    end
  end
end
