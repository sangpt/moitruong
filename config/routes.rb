Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root "pages#index"
  # resources :pages
  # resources :nongdo
  # resources :posts
  # namespace :api do
  #   resources :daily_aqis
  #   resources :daily_stats
  #   resources :sites
  # end

  scope "(:locale)", locale: /en|vi/ do
    root "pages#index"
    resources :pages
    resources :nongdo
    resources :posts
    namespace :api do
      resources :daily_aqis
      resources :daily_stats
      resources :sites
    end

    devise_for :admins, controllers: {
      sessions: 'admins/sessions',
      passwords: 'admins/passwords'
    }

    resources :public
    resources :about
  end
end
