Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :pages
  resources :nongdo
  root "pages#index"
  namespace :api do
    resources :daily_aqis
    resources :daily_stats
    resources :sites
  end
end
