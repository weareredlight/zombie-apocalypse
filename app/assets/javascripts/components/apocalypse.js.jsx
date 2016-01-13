const Apocalypse = React.createClass({

  getInitialState() {
    return {
      counting: false,
      count: 0,
      errors: ['there was an error due to some very extremely wacky stuff that just happened a while ago man, wtf?!=!?! stuff...', 'there was another error']
    };
  },


  renderCount() {
    return <span>{this.state.count}</span>;
  },


  renderStartStop() {
    if (this.state.counting) {
      return <button type='button' className='btn btn-warning ml-10'>Stop</button>;
    }
    else {
      return <button type='button' className='btn btn-success ml-10'>Start</button>;
    }
  },


  renderReset() {
    return <button type='button' className='btn btn-danger ml-10'>Reset</button>;
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


  render() {
    return(
      <div className='ml-100'>
        <h1>Well hi there, great dark overlord!</h1>

        <div className='mt-100 w-40pct timer-box'>
          <div className='pull-right'>
            {this.renderCount()}
            {this.renderStartStop()}
            {this.renderReset()}
          </div>
        </div>

        {this.renderErrors()}
      </div>
    );
  }

});
