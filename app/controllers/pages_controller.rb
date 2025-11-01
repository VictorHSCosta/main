class PagesController < ApplicationController
  def home
    render inertia: 'Home', props: {
      current_year: Time.current.year
    }
  end
end