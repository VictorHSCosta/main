Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Landing page and marketing pages
  root "pages#home"
  get "/features", to: "pages#features"
  get "/about", to: "pages#about"
  get "/contact", to: "pages#contact"

  # Authentication pages
  get "/login", to: "pages#login"
  get "/register", to: "pages#register"
  get "/dashboard", to: "pages#dashboard"
end
