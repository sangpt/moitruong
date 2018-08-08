class Api::DailyStatsController < ApplicationController
  def index
    indicator = params[:indicator]
    site_id = params[:site_id]
    response = open("http://moitruongthudo.vn/public/dailystat/#{indicator}?site_id=#{site_id}").read
    render json: response
  end
end
