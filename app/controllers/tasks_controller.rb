class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  # GET /tasks
  def index
    @tasks = Task.all

    # Apply filters
    @tasks = @tasks.by_status(params[:status]) if params[:status].present?
    @tasks = @tasks.by_priority(params[:priority]) if params[:priority].present?
    @tasks = @tasks.search(params[:search]) if params[:search].present?

    # Sort by due_date and created_at
    @tasks = @tasks.order(due_date: :asc, created_at: :desc)

    # Pagination (optional, you can add kaminari or pagy gem if needed)
    @tasks = @tasks.page(params[:page]).per(10) if respond_to?(:page)

    # Statistics for dashboard
    @task_stats = {
      total: Task.count,
      pending: Task.where(status: 'pending').count,
      in_progress: Task.where(status: 'in_progress').count,
      completed: Task.where(status: 'completed').count,
      overdue: Task.overdue.count
    }

    render inertia: 'Tasks/Index', props: {
      tasks: @tasks.as_json(include: [:id, :title, :description, :status, :priority, :due_date, :created_at, :updated_at]),
      filters: params.slice(:status, :priority, :search),
      stats: @task_stats,
      status_options: Task.statuses.keys,
      priority_options: Task.priorities.keys
    }
  end

  # GET /tasks/1
  def show
    render inertia: 'Tasks/Show', props: {
      task: @task.as_json(include: [:id, :title, :description, :status, :priority, :due_date, :created_at, :updated_at])
    }
  end

  # GET /tasks/new
  def new
    @task = Task.new

    render inertia: 'Tasks/New', props: {
      task: @task.as_json(include: [:title, :description, :status, :priority, :due_date]),
      status_options: Task.statuses.keys,
      priority_options: Task.priorities.keys
    }
  end

  # GET /tasks/1/edit
  def edit
    render inertia: 'Tasks/Edit', props: {
      task: @task.as_json(include: [:id, :title, :description, :status, :priority, :due_date]),
      status_options: Task.statuses.keys,
      priority_options: Task.priorities.keys
    }
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      flash[:success] = 'Tarefa criada com sucesso!'
      redirect_to tasks_path
    else
      flash[:error] = 'Erro ao criar tarefa. Verifique os campos.'
      render inertia: 'Tasks/New', props: {
        task: @task.as_json(include: [:title, :description, :status, :priority, :due_date]),
        status_options: Task.statuses.keys,
        priority_options: Task.priorities.keys,
        errors: @task.errors.full_messages
      }
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      flash[:success] = 'Tarefa atualizada com sucesso!'
      redirect_to task_path(@task)
    else
      flash[:error] = 'Erro ao atualizar tarefa. Verifique os campos.'
      render inertia: 'Tasks/Edit', props: {
        task: @task.as_json(include: [:id, :title, :description, :status, :priority, :due_date]),
        status_options: Task.statuses.keys,
        priority_options: Task.priorities.keys,
        errors: @task.errors.full_messages
      }
    end
  end

  # DELETE /tasks/1
  def destroy
    if @task.destroy
      flash[:success] = 'Tarefa excluída com sucesso!'
    else
      flash[:error] = 'Erro ao excluir tarefa.'
    end

    redirect_to tasks_path
  end

  # PATCH /tasks/1/toggle_status
  def toggle_status
    new_status = case @task.status
                 when 'pending'
                   'in_progress'
                 when 'in_progress'
                   'completed'
                 else
                   'pending'
                 end

    if @task.update(status: new_status)
      flash[:success] = "Status da tarefa atualizado para '#{Task.human_attribute_name("status.#{new_status}")}'"
    else
      flash[:error] = 'Erro ao atualizar status da tarefa.'
    end

    redirect_to tasks_path
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_task
    @task = Task.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def task_params
    params.require(:task).permit(:title, :description, :status, :priority, :due_date)
  end
end