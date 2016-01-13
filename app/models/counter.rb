class Counter < ActiveRecord::Base
  validate :stopped_at_is_after_started_at, if: 'stopped_at.present?'
  validate :single_running_counter

  def stopped_at_is_after_started_at
    errors.add(:stopped_at, 'older than started_at') unless stopped_at > started_at
  end

  def single_running_counter
    running_counter_ids = Counter.where(stopped_at: nil).ids
    if stopped_at.blank? && running_counter_ids.length > 0 && !running_counter_ids.include?(id)
      errors.add(
        'stopped_at',
        'can only be empty for a single counter, since you can only have one counter running'
      )
    end
  end
end
