class PagesController < ApplicationController
  def home
    # Render the Welcome/Index.jsx page
    render inertia: 'Welcome/Index', props: {
      # Add any props needed for the welcome page
    }
  end

  def login
    # Render the Auth/Login.jsx page
    render inertia: 'Auth/Login', props: {
      # Add any props needed for the login page
    }
  end

  def register
    # Render the Auth/Register.jsx page
    render inertia: 'Auth/Register', props: {
      # Add any props needed for the register page
    }
  end

  def features
    # Render a features page (placeholder)
    render inertia: 'Welcome/Index', props: {
      # Reuse welcome page for now
    }
  end

  def about
    # Render an about page (placeholder)
    render inertia: 'Welcome/Index', props: {
      # Reuse welcome page for now
    }
  end

  def contact
    # Render a contact page (placeholder)
    render inertia: 'Welcome/Index', props: {
      # Reuse welcome page for now
    }
  end

  def dashboard
    # Render a dashboard page (placeholder)
    render inertia: 'Welcome/Index', props: {
      # Reuse welcome page for now
    }
  end
end