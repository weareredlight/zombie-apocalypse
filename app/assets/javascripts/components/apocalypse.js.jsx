const Apocalypse = React.createClass({

  getInitialState() {
    return {
      counting: false,
      total_count: 0,
      errors: []
    };
  },


  componentWillMount() {
    this.counters = {};
    $.getJSON('/counters.json', (response) => {
      response.counters.forEach((c) => this.counters[c.id] = c);
      this.updateTotalCount();
    });

    setInterval(this.updateTotalCount, 1000);
  },


  startTimer() {
    this.clearErrors();
    $.post('/counters.json', (response) => {
      this.counters[response.counter.id] = response.counter;
      if (response.errors) this.setState({ errors: response.errors });
      this.updateTotalCount();
    });
  },


  stopTimer() {
    this.clearErrors();
    $.ajax({
      url: '/counters/running.json',
      type: 'PUT',
      data: { counter: { stopped_at: new Date().toISOString() }},
      success: (response) => {
        this.counters[response.counter.id] = response.counter;
        if (response.errors) this.setState({ errors: response.errors });
        this.updateTotalCount();
      }
    });
  },


  resetTimer() {
    this.clearErrors();
    $.ajax({
      url: '/counters/reset.json',
      type: 'DELETE',
      success: (response) => {
        this.counters = {};
        if (response.errors) this.setState({ errors: response.errors });
        this.updateTotalCount();
      }
    });
  },


  clearErrors() {
    this.setState({ errors: [] });
  },


  updateTotalCount() {
    let counting = false;
    const all_counters = [];
    for (k in this.counters) all_counters.push(this.counters[k]);
    const total_count = all_counters.reduce(
      (a, b) => {
        if (b.stopped_at == null) counting = true;
        return a + Date.parse(b.stopped_at || new Date()) - Date.parse(b.started_at);
      },
      0
    ) / 1000;

    this.setState({ counting, total_count });
  },


  renderTotalCount() {
    return <span>{Math.ceil(this.state.total_count)}</span>;
  },


  renderStartStop() {
    if (this.state.counting) {
      return (
        <button type='button' className='btn btn-warning ml-10' onClick={this.stopTimer}>
          Stop
        </button>
      );
    }
    else {
      return (
        <button type='button' className='btn btn-success ml-10' onClick={this.startTimer}>
          Start
        </button>
      );
    }
  },


  renderReset() {
    return (
      <button type='button' className='btn btn-danger ml-10' onClick={this.resetTimer}>
        Reset
      </button>
    );
  },


  renderErrors() {
    if (this.state.errors.length > 0) {
      return (
        <div className='alert alert-danger mt-100 w-40pct' role='alert'>
        {this.state.errors.map((e) =>
          <div className='mt-5 mb-5'>
          <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
          <span className='sr-only'>Error:</span> {e}
        </div>
        )}
        </div>
      );
    }
  },


  renderZombieApocalypse() {
    return (
      <div className='alert alert-success mt-100 w-40pct' role='alert'>
        <div className='mt-5 mb-5'>
          <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
          <span className='sr-only'>Error:</span> The end is nigh upon us!
        </div>
      </div>
    );
  },


  render() {
    return(
      <div className='ml-100'>
        <h1>Well hi there, great dark overlord!</h1>

        <div className='mt-100 w-40pct timer-box'>
          <div className='pull-right'>
            {this.renderTotalCount()}
            {this.renderStartStop()}
            {this.renderReset()}
          </div>
        </div>

        {this.state.total_count >= 30 && this.renderZombieApocalypse()}
        {this.renderErrors()}
      </div>
    );
  }

});
