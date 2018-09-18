class PublicController < ApplicationController
    def index
        redirect_to root_path(site_id: params[:site_id])
    end
end
