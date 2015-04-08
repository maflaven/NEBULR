Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new]
  resources :users, only: [:index, :show, :edit, :destroy],
            defaults: { format: :json }

  resource :session

  namespace :api, defaults: { format: :json } do
    resources :missions, except: [:new, :edit]
  end
end
