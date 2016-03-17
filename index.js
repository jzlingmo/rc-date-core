import React, {PropTypes} from 'react'
import ReactDom from 'react-dom'
import DatePicker from './src'
import Styles from './dist/dark.css'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: '2016-03-12',
            value2: '2016-03',
            value3: '2016',
        };
    }
    render(){
        return <div>
            <div className="title">Current selected date: {this.state.value1}</div>
            <DatePicker
                mode="day"
                min="2015-05-20"
                max="2016-05-20"
                value={this.state.value1}
                onChange={(v)=>{this.setState({value1: v})}}
            />

            <div className="title">Current selected date: {this.state.value2}</div>
            <DatePicker
                mode="month"
                min="2015-05"
                max="2016-05"
                value={this.state.value2}
                onChange={(v)=>{this.setState({value2: v})}}
            />

            <div className="title">Current selected date: {this.state.value3}</div>
            <DatePicker
                mode="year"
                min="2015"
                max="2016"
                value={this.state.value3}
                onChange={(v)=>{this.setState({value3: v})}}
            />
        </div>
    }
}

ReactDom.render(<Page />, document.getElementById('main'));
