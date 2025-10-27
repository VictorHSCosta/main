class PagesController < ApplicationController
  def home
    inertia_render 'Home', props: {
      current_year: Time.current.year
    }
  end
end