class CountersController < ApplicationController

  def create
    @counter = Counter.create(started_at: Time.zone.now)
    render :errors unless @counter.valid?
  end

  def index
    @counters = Counter.all
  end

  def update
    @counter = Counter.find(params[:id])
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
