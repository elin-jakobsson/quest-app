import React, {Component} from 'react';
class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeKeeper: function() {
                return {secondsRemaining : null};
            },
            timeIsOut: this.props.timeBool
        }
    }

    componentDidMount() {
        // Initializing the timer event
        this.timer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick = () => {
        this.setState({
            secondsRemaining: this.state.secondsRemaining - 1
        });
        if (this.state.secondsRemaining <= 0) {
            this.setState({timeIsOut: true},
            () => {
                this.props.timesUp(this.state.timeIsOut);
            })
            clearInterval(this.interval);
        }
      }

    timer = () => {
        this.tick();
        this.setState({secondsRemaining: this.props.startValue});
        this.interval = setInterval(this.tick, 1000);
    }
    render() {
        return (<div className="component">{this.state.secondsRemaining}</div>);
    }
}
export default Timer;
