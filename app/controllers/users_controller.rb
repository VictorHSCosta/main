class UsersController < ApplicationController
  before_action :require_login, only: [:show, :edit, :update]
  before_action :set_user, only: [:show, :edit, :update]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: "Conta criada com sucesso!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    # Profile page
  end

  def edit
    # Password change page
  end

  def update
    if params[:user][:current_password].present?
      # Password change
      unless @user.authenticate(params[:user][:current_password])
        flash.now[:alert] = "Senha atual incorreta"
        render :edit, status: :unprocessable_entity
        return
      end

      if @user.update(password_params)
        redirect_to profile_path, notice: "Senha alterada com sucesso!"
      else
        render :edit, status: :unprocessable_entity
      end
    else
      # Profile update
      if @user.update(profile_params)
        redirect_to profile_path, notice: "Perfil atualizado com sucesso!"
      else
        render :show, status: :unprocessable_entity
      end
    end
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  def profile_params
    params.require(:user).permit(:name, :email)
  end
end
