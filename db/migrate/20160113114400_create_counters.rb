class CreateCounters < ActiveRecord::Migration
  def change
    create_table :counters do |t|
      t.datetime :started_at, null: false
      t.datetime :stopped_at
    end
  end
end
