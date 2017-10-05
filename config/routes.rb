Rails.application.routes.draw do

  root 'static_pages#home'

  get '/about', to: 'static_pages#about'

  get    '/login',    to: 'sessions#new'
  post   '/login',    to: 'sessions#create'
  delete '/logout',   to: 'sessions#destroy'

  get    'users/:id', to: 'users#show', as: "/dashboard"

  post '/create_user',   to: 'users#create'

  resources :users

end
