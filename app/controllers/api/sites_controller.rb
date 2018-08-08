class Api::SitesController < ApplicationController
  def index
    require 'open-uri'
    response = open("http://moitruongthudo.vn/api/site").read
    render json: response
  end
end