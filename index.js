import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {DatePicker, DatePickerInput} from './src'
import Styles from './dist/darkInput.css'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '2016-03-14',
            value1: '2016-03-12',
            value2: '2016-03',
            value3: '2016',
        };
    }
    render(){
        return <div>
            <div>
                <DatePickerInput
                    min="2015-05-20"
                    max="2016-05-20"
                    value={this.state.value}
                    readOnly={true}
                    onChange={(v)=>{this.setState({value: v})}}
                />
            </div>
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

ReactDOM.render(<Page />, document.getElementById('main'));
