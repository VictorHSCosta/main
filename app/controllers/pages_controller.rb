class PagesController < ApplicationController
  def home
    render inertia: 'Landing', props: {}
  end
end