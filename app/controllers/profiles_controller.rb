class ProfilesController < ApplicationController
  before_action :require_login

  def show
    @user = current_user
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user

    if @user.update(profile_params)
      redirect_to profile_path, notice: "Perfil atualizado com sucesso!"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def update_password
    @user = current_user

    unless @user.authenticate(params[:current_password])
      redirect_to edit_profile_path, alert: "Senha atual incorreta"
      return
    end

    if params[:new_password] != params[:password_confirmation]
      redirect_to edit_profile_path, alert: "Nova senha e confirmação não coincidem"
      return
    end

    if @user.update(password: params[:new_password])
      redirect_to profile_path, notice: "Senha alterada com sucesso!"
    else
      redirect_to edit_profile_path, alert: "Erro ao alterar senha: #{@user.errors.full_messages.join(', ')}"
    end
  end

  private

  def profile_params
    params.require(:user).permit(:name, :email)
  end
end
