class Api::DailyAqisController < ApplicationController
  def index
    require 'open-uri'
    indicator = params[:indicator]
    site_id = params[:site_id]
    response = open("http://moitruongthudo.vn/public/dailyaqi/#{indicator}?site_id=#{site_id}").read
    render json: response
  end
end