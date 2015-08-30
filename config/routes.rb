Rails.application.routes.draw do
    root to: 'days#index'
    devise_for :users
    resources :users
end
