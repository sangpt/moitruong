Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :pages
  root "pages#index"
  namespace :api do
    resources :daily_aqis
    resources :sites
  end
end
