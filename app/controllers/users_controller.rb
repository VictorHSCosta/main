class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  def index
    @users = User.order(created_at: :desc)
                 .page(params[:page])
                 .per(params[:per_page] || 10)

    render inertia: 'Users/Index', props: {
      users: @users.map(&method(:user_json)),
      pagination: {
        current_page: @users.current_page,
        total_pages: @users.total_pages,
        total_count: @users.total_count,
        per_page: @users.limit_value
      }
    }
  end

  # GET /users/:id
  def show
    render inertia: 'Users/Show', props: {
      user: user_json(@user)
    }
  end

  # GET /users/new
  def new
    render inertia: 'Users/Form', props: {
      user: {},
      roles: User.roles,
      statuses: User.statuses
    }
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to users_path, notice: 'User was successfully created.'
    else
      redirect_to new_user_path, inertia: {
        errors: @user.errors.messages
      }
    end
  end

  # GET /users/:id/edit
  def edit
    render inertia: 'Users/Form', props: {
      user: user_json(@user),
      roles: User.roles,
      statuses: User.statuses
    }
  end

  # PATCH/PUT /users/:id
  def update
    if @user.update(user_params)
      redirect_to users_path, notice: 'User was successfully updated.'
    else
      redirect_to edit_user_path(@user), inertia: {
        errors: @user.errors.messages
      }
    end
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
    redirect_to users_path, notice: 'User was successfully deleted.'
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to users_path, alert: 'User not found.'
  end

  def user_params
    params.require(:user).permit(:name, :email, :role, :status)
  end

  def user_json(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      created_at: user.created_at.strftime('%Y-%m-%d %H:%M'),
      updated_at: user.updated_at.strftime('%Y-%m-%d %H:%M')
    }
  end
end
