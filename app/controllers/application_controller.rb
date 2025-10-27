class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  include Pundit::Authorization

  before_action :store_return_to
  before_action :set_current_user_for_pundit

  # Share data with all Inertia responses
  inertia_share do
    {
      flash: {
        success: flash[:success],
        error: flash[:error],
        notice: flash[:notice],
        alert: flash[:alert]
      },
      auth: {
        user: current_user ? {
          id: current_user.id,
          name: current_user.name,
          email: current_user.email,
          role: current_user.role,
          admin?: current_user.admin?,
          moderator?: current_user.moderator?,
          can_manage_users?: current_user.can_manage_users?
        } : nil
      }
    }
  end

  # Authentication helpers
  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def authenticate_user!
    unless current_user
      respond_to do |format|
        format.html do
          session[:return_to] = request.fullpath
          redirect_to login_path, alert: 'Please log in to continue.'
        end
        format.json { render json: { error: 'Authentication required' }, status: :unauthorized }
      end
    end
  end

  def logged_in?
    !!current_user
  end
  helper_method :logged_in?

  # Authorization helpers
  def pundit_user
    current_user
  end

  def set_current_user_for_pundit
    Pundit.policy_scope!(current_user, :user) if current_user
  end

  protected

  def store_return_to
    session[:return_to] = request.fullpath if request.get? && !request.xhr?
  end

  private

  # Error handling
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def user_not_authorized(exception)
    respond_to do |format|
      format.html do
        flash[:alert] = "You are not authorized to perform this action."
        redirect_back(fallback_location: root_path)
      end
      format.json { render json: { error: 'Not authorized' }, status: :forbidden }
    end
  end

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def record_not_found(exception)
    respond_to do |format|
      format.html do
        flash[:alert] = "Record not found."
        redirect_back(fallback_location: root_path)
      end
      format.json { render json: { error: 'Record not found' }, status: :not_found }
    end
  end
end
