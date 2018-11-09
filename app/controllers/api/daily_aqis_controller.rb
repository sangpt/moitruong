class Api::DailyAqisController < ApplicationController
  def index
    indicator = params[:indicator]
    site_id = params[:site_id]
    # response = open("http://moitruongthudo.vn/public/dailyaqi/#{indicator}?site_id=#{site_id}").read
    response = open("http://hanoiair.de/realtime/api/aqi/ESP_00981122/PM2_5").read
    render json: response
  end
end
