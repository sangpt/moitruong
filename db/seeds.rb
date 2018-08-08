# This file should contain all the record creation needed to seed the database with its default site_ids.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

locations = [
  {name: "Hoàn Kiếm", site_id: 1},
  {name: "Thành Công", site_id: 7},
  {name: "Tân Mai", site_id: 8},
  {name: "Kim Liên", site_id: 9},
  {name: "Phạm Văn Đồng", site_id: 10},
  {name: "Tây Mỗ ", site_id: 11},
  {name: "Mỹ Đình", site_id: 12},
  {name: "Hàng Đậu", site_id: 13},
  {name: "Chi cục bảo vệ môi trường", site_id: 14},
  {name: "Minh Khai - Bắc Từ Liêm", site_id: 15},
]

Location.import locations
