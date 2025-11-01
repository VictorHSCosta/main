class LandingPageController < ApplicationController
  def index
    # Data to pass to the React component
    inertia_props({
      current_year: Time.current.year,
      app_name: "RailsApp"
    })
  end
end