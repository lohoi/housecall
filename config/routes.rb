Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  # devise_for :users
  resources :users
  # root :controller => 'static', :action => '/public/index.html'

  # sessions

  get     '/login',    to: 'sessions#new'
  post    '/login',    to: 'sessions#create'
  delete  '/logout',   to: 'sessions#destroy'

  # contacts
  post     '/api/contacts',   to: 'contacts#create'
  get      'api/contacts/',   to: 'contacts#index'

  # notes
  post     '/api/notes/mail', to: 'notes#mail'
  get      'api/notes/',      to: 'notes#index'
  post     '/api/notes',      to: 'notes#create'
  delete   'api/notes/:id',   to: 'notes#destroy'
  patch    'api/notes/:id',   to: 'notes#update'
  get      'api/notes/:id',   to: 'notes#show'

  # reminders
  get      'api/reminders/',      to: 'reminders#index'
  post     '/api/reminders',      to: 'reminders#create'
  delete   'api/reminders/:id',   to: 'reminders#destroy'
  patch    'api/reminders/:id',   to: 'reminders#update'
  get      'api/reminders/:id',   to: 'reminders#show'

  # static pages
  get     '/api/about', to: 'static_pages#about'

  # users
  get     'users/:id', to: 'users#show', as: "/dashboard"
  post    '/user',   to: 'users#create'
  get     '/api/user_type', to: 'users#get_type'
  get     '/api/resetPasswordToken', to: 'users#password_token'
  post    '/api/updateUser', to: 'users#update_user'

  # get '*' , to: "/public/index.html"
end
