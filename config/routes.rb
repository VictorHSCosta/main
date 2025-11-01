Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Authentication routes
  get "/login", to: "sessions#new", as: :login
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy", as: :logout

  # Password reset routes
  post "/forgot_password", to: "sessions#forgot_password"
  get "/reset_password/:token", to: "sessions#reset_password", as: :reset_password
  patch "/update_password", to: "sessions#update_password"

  # Authentication check
  get "/check_auth", to: "sessions#check"

  # User management routes
  resources :users, path: '/' do
    member do
      patch :restore
    end

    collection do
      get :search
    end
  end

  # Defines the root path route ("/")
  root "landing_page#index"
end
