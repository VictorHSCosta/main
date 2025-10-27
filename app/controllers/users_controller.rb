class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authorize_user, except: [:index, :new, :create]

  # GET /users
  def index
    @users = User.search(params[:search])
                 .by_role(params[:role])
                 .page(params[:page])
                 .per(15)
                 .order(created_at: :desc)

    # Store filters in session for back navigation
    session[:users_filters] = {
      search: params[:search],
      role: params[:role],
      page: params[:page]
    }

    respond_to do |format|
      format.html { inertia :Users/Index, props: users_props }
      format.json { render json: @users }
    end
  end

  # GET /users/:id
  def show
    respond_to do |format|
      format.html { inertia :Users/Show, props: user_props }
      format.json { render json: @user }
    end
  end

  # GET /users/new
  def new
    @user = User.new
    respond_to do |format|
      format.html { inertia :Users/Form, props: form_props }
    end
  end

  # GET /users/:id/edit
  def edit
    respond_to do |format|
      format.html { inertia :Users/Form, props: form_props }
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      flash[:success] = 'User was successfully created.'
      redirect_to users_path
    else
      flash[:error] = 'There was an error creating the user.'
      redirect_to new_user_path, inertia: { errors: @user.errors }
    end
  end

  # PUT/PATCH /users/:id
  def update
    if @user.update(user_params)
      flash[:success] = 'User was successfully updated.'
      redirect_to users_path(session[:users_filters])
    else
      flash[:error] = 'There was an error updating the user.'
      redirect_to edit_user_path(@user), inertia: { errors: @user.errors }
    end
  end

  # DELETE /users/:id
  def destroy
    if @user.destroy
      flash[:success] = 'User was successfully deleted.'
    else
      flash[:error] = 'There was an error deleting the user.'
    end
    redirect_to users_path(session[:users_filters])
  end

  # PUT /users/:id/activate
  def activate
    if @user.activate!
      flash[:success] = 'User was successfully activated.'
    else
      flash[:error] = 'There was an error activating the user.'
    end
    redirect_to users_path(session[:users_filters])
  end

  # PUT /users/:id/deactivate
  def deactivate
    if @user.deactivate!
      flash[:success] = 'User was successfully deactivated.'
    else
      flash[:error] = 'There was an error deactivating the user.'
    end
    redirect_to users_path(session[:users_filters])
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash[:error] = 'User not found.'
    redirect_to users_path
  end

  def user_params
    params.require(:user).permit(:name, :email, :role, :phone, :avatar, :status)
  end

  def authorize_user
    # Add authorization logic here
    # For now, we'll allow all actions
  end

  # Props for Inertia.js responses
  def users_props
    {
      users: @users.map { |user| user_json(user) },
      filters: params.slice(:search, :role),
      pagination: pagination_json(@users),
      roles: User.roles_for_select,
      statuses: User.statuses_for_select
    }
  end

  def user_props
    {
      user: user_json(@user),
      filters: session[:users_filters] || {}
    }
  end

  def form_props
    {
      user: @user.persisted? ? user_json(@user) : default_user_json,
      roles: User.roles_for_select,
      statuses: User.statuses_for_select,
      filters: session[:users_filters] || {}
    }
  end

  def user_json(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      active: user.active?,
      created_at: user.created_at.iso8601,
      updated_at: user.updated_at.iso8601
    }
  end

  def default_user_json
    {
      id: nil,
      name: '',
      email: '',
      role: 'user',
      phone: '',
      avatar: '',
      status: 'active',
      active: true,
      created_at: nil,
      updated_at: nil
    }
  end

  def pagination_json(collection)
    {
      current_page: collection.current_page,
      total_pages: collection.total_pages,
      total_count: collection.total_count,
      per_page: collection.limit_value,
      next_page: collection.next_page,
      prev_page: collection.prev_page,
      first_page: collection.first_page?,
      last_page: collection.last_page?
    }
  end
end