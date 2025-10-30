class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:new, :create]
  before_action :require_no_authentication, only: [:new, :create]

  # GET /login
  def new
    respond_to do |format|
      format.html { render inertia: "Sessions/New", props: session_form_props }
      format.json { render json: { message: "Please login" } }
    end
  end

  # POST /login
  def create
    user = User.find_by(email: params[:email]&.downcase)

    if user&.authenticate(params[:password]) && user.active_for_authentication?
      session[:user_id] = user.id
      track_login_activity(user)

      respond_to do |format|
        format.html { redirect_to intended_url, notice: 'Welcome back!' }
        format.json { render json: {
          message: 'Login successful',
          user: serialize_user(user)
        }, status: :ok }
      end
    else
      failed_login_attempt(user)

      respond_to do |format|
        format.html {
          flash.now[:alert] = 'Invalid email or password'
          render inertia: "Sessions/New", props: session_form_props.merge(errors: ['Invalid email or password'])
        }
        format.json {
          render json: {
            error: 'Invalid email or password',
            code: 'invalid_credentials'
          }, status: :unauthorized
        }
      end
    end
  end

  # DELETE /logout
  def destroy
    track_logout_activity(current_user)
    session[:user_id] = nil

    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Goodbye!' }
      format.json { render json: { message: 'Logout successful' } }
    end
  end

  # GET /check_auth
  def check
    respond_to do |format|
      if current_user
        format.json { render json: {
          authenticated: true,
          user: serialize_user(current_user)
        } }
      else
        format.json { render json: {
          authenticated: false,
          message: 'Not authenticated'
        }, status: :unauthorized }
      end
    end
  end

  # POST /forgot_password
  def forgot_password
    user = User.find_by(email: params[:email]&.downcase)

    if user
      user.generate_password_reset_token!
      UserMailer.password_reset(user).deliver_later
    end

    # Always return success to prevent email enumeration attacks
    respond_to do |format|
      format.html { redirect_to login_path, notice: 'If your email exists in our system, you will receive password reset instructions.' }
      format.json { render json: {
        message: 'If your email exists in our system, you will receive password reset instructions.'
      } }
    end
  end

  # GET /reset_password/:token
  def reset_password
    @user = User.find_by(password_reset_token: params[:token])

    unless @user&.password_reset_token_valid?
      respond_to do |format|
        format.html { redirect_to login_path, alert: 'Invalid or expired reset token.' }
        format.json { render json: {
          error: 'Invalid or expired reset token',
          code: 'invalid_token'
        }, status: :unprocessable_entity }
      end
      return
    end

    respond_to do |format|
      format.html { render inertia: "Sessions/ResetPassword", props: reset_password_props(@user) }
      format.json { render json: {
        token: @user.password_reset_token,
        email: @user.email
      } }
    end
  end

  # PATCH /update_password
  def update_password
    @user = User.find_by(password_reset_token: params[:token])

    unless @user&.password_reset_token_valid?
      respond_to do |format|
        format.html { redirect_to login_path, alert: 'Invalid or expired reset token.' }
        format.json { render json: {
          error: 'Invalid or expired reset token',
          code: 'invalid_token'
        }, status: :unprocessable_entity }
      end
      return
    end

    if @user.update(password_params)
      @user.clear_password_reset_token!
      track_password_reset_activity(@user)

      respond_to do |format|
        format.html { redirect_to login_path, notice: 'Password has been reset successfully.' }
        format.json { render json: {
          message: 'Password has been reset successfully.',
          user: serialize_user(@user)
        } }
      end
    else
      respond_to do |format|
        format.html {
          render inertia: "Sessions/ResetPassword",
          props: reset_password_props(@user).merge(errors: @user.errors.full_messages)
        }
        format.json { render json: {
          errors: @user.errors.full_messages,
          code: 'validation_failed'
        }, status: :unprocessable_entity }
      end
    end
  end

  private

  def session_form_props
    {
      email: params[:email],
      errors: flash[:alert] ? [flash[:alert]] : nil
    }
  end

  def reset_password_props(user)
    {
      token: user.password_reset_token,
      email: user.email,
      errors: user.errors.any? ? user.errors.full_messages : nil
    }
  end

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  def require_no_authentication
    if current_user
      respond_to do |format|
        format.html { redirect_to root_path, notice: 'You are already logged in.' }
        format.json { render json: {
          message: 'Already authenticated',
          user: serialize_user(current_user)
        } }
      end
    end
  end

  def intended_url
    session[:return_to] || root_path
  end

  def serialize_user(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      admin?: user.admin?,
      moderator?: user.moderator?,
      can_manage_users?: user.can_manage_users?
    }
  end

  # Activity tracking methods
  def track_login_activity(user)
    # Log successful login
    Rails.logger.info "User #{user.id} (#{user.email}) logged in from #{request.remote_ip}"

    # You could also create an ActivityLog model to track user activities
    # ActivityLog.create!(user: user, action: 'login', ip_address: request.remote_ip)
  end

  def track_logout_activity(user)
    # Log successful logout
    Rails.logger.info "User #{user.id} (#{user.email}) logged out from #{request.remote_ip}"

    # ActivityLog.create!(user: user, action: 'logout', ip_address: request.remote_ip)
  end

  def track_password_reset_activity(user)
    # Log password reset
    Rails.logger.info "User #{user.id} (#{user.email}) reset password from #{request.remote_ip}"

    # ActivityLog.create!(user: user, action: 'password_reset', ip_address: request.remote_ip)
  end

  def failed_login_attempt(user)
    # Log failed login attempt
    email = user&.email || params[:email]
    Rails.logger.warn "Failed login attempt for #{email} from #{request.remote_ip}"

    # You could implement rate limiting or account lockout logic here
    # ActivityLog.create!(action: 'failed_login', email: email, ip_address: request.remote_ip)
  end
end