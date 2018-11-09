class Api::SitesController < ApplicationController
  def index
    require 'open-uri'
    # http://moitruongthudo.vn/api/site
    response = open("http://hanoiair.de/realtime/api/sites").read
    render json: response
  end
end