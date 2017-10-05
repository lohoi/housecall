Rails.application.routes.draw do

  devise_for :users
  root 'static_pages#home'

  get '/about', to: 'static_pages#about'

  get    '/login',    to: 'sessions#new'
  post   '/login',    to: 'sessions#create'
  delete '/logout',   to: 'sessions#destroy'

  get    'users/:id', to: 'users#show', as: "/dashboard"

  post '/user',   to: 'users#create'

  resources :users

end
