Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  # devise_for :users
  resources :users
  # root :controller => 'static', :action => '/public/index.html'

  # get '/about', to: 'static_pages#about'

  get     '/login',    to: 'sessions#new'
  post    '/login',    to: 'sessions#create'
  delete  '/logout',   to: 'sessions#destroy'

  get     'users/:id', to: 'users#show', as: "/dashboard"

  post    '/user',   to: 'users#create'

  get     '/api/user_type', to: 'users#get_type'

  get     '/api/resetPasswordToken', to: 'users#password_token'

  post    '/api/updateUser', to: 'users#update_user'

  post     '/api/notes/mail', to: 'notes#mail'

  get     '/api/about', to: 'static_pages#about'

  resources :notes
  resources :contacts
  resources :patient_descriptions
  resources :reminders

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :static_pages

  # get '*' , to: "/public/index.html"
end
