class CountersController < ApplicationController

  def create
    @counter = Counter.create(started_at: Time.zone.now)
    render :errors unless @counter.valid?
  end

  def index
    @counters = Counter.all
  end

  def update
    if params[:id] == 'running'
      @counter = Counter.find_by_stopped_at(nil)
    else
      @counter = Counter.find(params[:id])
    end
    @counter.update_attributes(counter_attributes)
    render :errors unless @counter.valid?
  end

  def reset
    Counter.delete_all
  end


  private


  def counter_attributes
    params.require(:counter).permit(:stopped_at)
  end

end
