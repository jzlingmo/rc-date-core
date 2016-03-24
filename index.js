import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {DatePicker, DatePickerInput} from './src'
import Styles from './dist/darkInput.css'
import DemoStyles from './index.css'

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

    render() {
        return <div className="demos">
            <h3>Date input</h3>
            <div className="section">
                <div className="col col1">
                    <DatePickerInput
                        value={this.state.value}
                        readOnly={true}
                        autoPosition={true}
                        preferPosition="bottomRight"
                        closeOnSelect={true}
                        closeOnClickOutside={true}
                        displayFormat="yyyy年M月d日"
                        returnFormat="yyyy-MM-dd"
                        onChange={(v)=>{this.setState({value: v})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.value}</span></p>
                    <p>Props</p>
                    <pre>
                        autoPosition=true<br/>
                        preferPosition="bottomRight"<br/>
                        closeOnSelect=true<br/>
                        closeOnClickOutside=true<br/>
                        displayFormat="yyyy-M-d"<br/>
                        returnFormat="yyyy/MM/dd"
                    </pre>
                </div>
            </div>

            <h3>Day picker</h3>
            <div className="section">
                <div className="col col1">
                    <DatePicker
                        mode="day"
                        min="2015-05-20"
                        max="2016-05-20"
                        value={this.state.value1}
                        returnFormat="yyyy-MM-dd"
                        onChange={(v)=>{this.setState({value1: v})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.value1}</span></p>
                    <p>Props</p>
                    <pre>
                        mode="day"<br/>
                        min="2015-05-20"<br/>
                        max="2016-05-20"<br/>
                        returnFormat="yyyy-MM-dd"<br/>
                    </pre>
                </div>
            </div>

            <h3>Month picker</h3>
            <div className="section">
                <div className="col col1">
                    <DatePicker
                        mode="month"
                        min="2015-05"
                        max="2016-05"
                        returnFormat="yyyy-MM"
                        value={this.state.value2}
                        onChange={(v)=>{this.setState({value2: v})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.value2}</span></p>
                    <p>Props</p>
                    <pre>
                        mode="month"<br/>
                        min="2015-05"<br/>
                        max="2016-05"<br/>
                        returnFormat="yyyy-MM"<br/>
                    </pre>
                </div>
            </div>

            <h3>Year picker</h3>
            <div className="section">
                <div className="col col1">
                    <DatePicker
                        mode="year"
                        min="2015"
                        max="2016"
                        returnFormat="yyyy"
                        value={this.state.value3}
                        onChange={(v)=>{this.setState({value3: v})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.value3}</span></p>
                    <p>Props</p>
                    <pre>
                        mode="year"<br/>
                        min="2015"<br/>
                        max="2016"<br/>
                        returnFormat="yyyy"<br/>
                    </pre>
                </div>
            </div>
        </div>
    }
}

ReactDOM.render(<Page />, document.getElementById('main'));
