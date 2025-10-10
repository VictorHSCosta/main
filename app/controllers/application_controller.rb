class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Share data with all Inertia responses
  inertia_share do
    {
      flash: {
        success: flash[:success],
        error: flash[:error],
        notice: flash[:notice],
        alert: flash[:alert]
      }
    }
  end
end
