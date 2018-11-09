class PagesController < ApplicationController
  def index
    site_id = params[:site_id] || 14
    # http://moitruongthudo.vn/public/dailyaqi/PM2.5?site_id=#{site_id}
    response = JSON.parse open("http://hanoiair.de/realtime/api/aqi/ESP_00981122/PM2_5").read
    @today = response.last
    response = JSON.parse open("http://hanoiair.de/realtime/api/sites").read
    @sites = response.map {|e| e["id"]}
  end
end
