class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :edit, :update, :destroy, :restore]
  before_action :authorize_user!, only: [:index, :show]
  before_action :authorize_manage_user!, only: [:edit, :update, :destroy, :restore, :new, :create]

  # GET /users
  def index
    @users = User.active.includes(:role)
    @users = @users.by_role(params[:role]) if params[:role].present?
    @users = @users.search_by_name(params[:search]) if params[:search].present?
    @users = @users.order(created_at: :desc).page(params[:page]).per(10)

    respond_to do |format|
      format.html { render inertia: "Users/Index", props: users_index_props }
      format.json { render json: users_json_response }
    end
  end

  # GET /users/:id
  def show
    respond_to do |format|
      format.html { render inertia: "Users/Show", props: user_show_props }
      format.json { render json: user_json_response(@user) }
    end
  end

  # GET /users/new
  def new
    @user = User.new

    respond_to do |format|
      format.html { render inertia: "Users/New", props: user_form_props(@user) }
      format.json { render json: user_json_response(@user) }
    end
  end

  # GET /users/:id/edit
  def edit
    respond_to do |format|
      format.html { render inertia: "Users/Edit", props: user_form_props(@user) }
      format.json { render json: user_json_response(@user) }
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render json: user_json_response(@user), status: :created }
      else
        format.html { render inertia: "Users/New", props: user_form_props(@user) }
        format.json { render json: { errors: @user.errors }, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/:id
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render json: user_json_response(@user) }
      else
        format.html { render inertia: "Users/Edit", props: user_form_props(@user) }
        format.json { render json: { errors: @user.errors }, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/:id
  def destroy
    if @user.soft_delete!
      respond_to do |format|
        format.html { redirect_to users_path, notice: 'User was successfully deleted.' }
        format.json { head :no_content }
      end
    else
      respond_to do |format|
        format.html { redirect_to @user, alert: 'Failed to delete user.' }
        format.json { render json: { error: 'Failed to delete user' }, status: :unprocessable_entity }
      end
    end
  end

  # PATCH /users/:id/restore
  def restore
    if @user.restore!
      respond_to do |format|
        format.html { redirect_to @user, notice: 'User was successfully restored.' }
        format.json { render json: user_json_response(@user) }
      end
    else
      respond_to do |format|
        format.html { redirect_to @user, alert: 'Failed to restore user.' }
        format.json { render json: { error: 'Failed to restore user' }, status: :unprocessable_entity }
      end
    end
  end

  # GET /users/search
  def search
    @users = User.active.search_by_name(params[:q]).limit(10)

    respond_to do |format|
      format.json { render json: users_json_response(@users) }
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    respond_to do |format|
      format.html { redirect_to users_path, alert: 'User not found.' }
      format.json { render json: { error: 'User not found' }, status: :not_found }
    end
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :role)
  end

  def authorize_user!
    authorize @user || User
  end

  def authorize_manage_user!
    authorize @user || User, :manage?
  end

  # Props for Inertia responses
  def users_index_props
    {
      users: users_json_response(@users),
      filters: {
        role: params[:role],
        search: params[:search]
      },
      roles: User.roles.map { |key, value| { value: key, label: key.humanize } },
      pagination: pagination_props(@users)
    }
  end

  def user_show_props
    {
      user: user_json_response(@user),
      can_edit: policy(@user).edit?,
      can_delete: policy(@user).destroy?,
      can_restore: policy(@user).restore?
    }
  end

  def user_form_props(user)
    {
      user: user_json_response(user),
      errors: user.errors.any? ? user.errors.full_messages : nil,
      roles: User.roles.map { |key, value| { value: key, label: key.humanize } },
      is_edit: user.persisted?
    }
  end

  # JSON serialization methods
  def user_json_response(user_or_users)
    if user_or_users.respond_to?(:map)
      user_or_users.map { |user| serialize_user(user) }
    else
      serialize_user(user_or_users)
    end
  end

  def serialize_user(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
      full_name: user.full_name,
      admin?: user.admin?,
      moderator?: user.moderator?,
      regular_user?: user.regular_user?,
      can_manage_users?: user.can_manage_users?,
      deleted?: user.deleted?
    }
  end

  def users_json_response(users)
    {
      data: users.map { |user| serialize_user(user) },
      meta: {
        total: users.total_count,
        per_page: users.limit_value,
        current_page: users.current_page,
        total_pages: users.total_pages
      }
    }
  end

  def pagination_props(collection)
    {
      currentPage: collection.current_page,
      totalPages: collection.total_pages,
      total: collection.total_count,
      perPage: collection.limit_value,
      hasNextPage: collection.next_page.present?,
      hasPreviousPage: collection.prev_page.present?
    }
  end
end