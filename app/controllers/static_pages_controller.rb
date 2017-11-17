class StaticPagesController < ApplicationController
	def index
  	end
    
    def about
        @text = "It works"
        respond_to do |format|
            msg = { status: "ok", message: "Success", html: "<b>...</b>" }
            format.json  { render json: msg } # don't do msg.to_json
        end
    end
end