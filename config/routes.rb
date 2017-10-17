Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  # devise_for :users
  resources :users
  # root 'static_pages#home'

  # get '/about', to: 'static_pages#about'

  get    '/login',    to: 'sessions#new'
  post   '/login',    to: 'sessions#create'
  delete '/logout',   to: 'sessions#destroy'

  get    'users/:id', to: 'users#show', as: "/dashboard"

  post '/user',   to: 'users#create'

  get '/user_type', to: 'users#get_type'

  get '/resetPasswordToken', to: 'users#password_token'

  post '/updateUser', to: 'users#update_user'

  resources :users
  resources :notes
  resources :contacts

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :static_pages
  get '/about', to: 'static_pages#about'
end
