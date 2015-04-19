Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, defaults: { format: :json }
  resource :session, only: [:create, :destroy],
            defaults: { format: :json }

  namespace :api, defaults: { format: :json } do
    resources :missions, except: [:new, :edit]
    resources :enlists, only: [:create, :destroy, :show]
    resources :follows, only: [:create, :destroy, :show]
    resources :images, only: [:create, :destroy, :show]
    resources :comments, only: [:create, :destroy, :show]
    resources :ratings, only: [:create, :destroy, :update, :show]
    resources :updates, only: [:create, :destroy, :show]
  end
end
