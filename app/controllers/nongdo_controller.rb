class NongdoController < ApplicationController
  def index
    site_id = params[:site_id] || 14
    response = JSON.parse open("http://moitruongthudo.vn/public/dailyaqi/PM2.5?site_id=#{site_id}").read
    @today = response.last
  end
end
