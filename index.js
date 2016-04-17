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
            <h3>Date input(auto position in scroll container)</h3>
            <div id="scrollContainer" className="wrapper-limited">
                <div className="section">
                <div className="col col1">
                    <DatePickerInput
                        value={this.state.value}
                        readOnly={true}
                        autoPosition={true}
                        container='#scrollContainer'
                        preferPo sition="topLeft"
                        closeOnSelect={true}
                        closeOnClickOutside={true}
                        displayFormat="yyyy/MM/dd"
                        returnFormat="yyyy-MM-dd"
                        onChange={(v)=>{this.setState({value: v})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.value}</span></p>
                    <p>Props</p>
                    <pre>
                        autoPosition= <span className="pl-k">true</span><br/>
                        container= <span className="pl-k">'#scrollContainer'</span><br/>
                        preferPosition= <span className="pl-s"><span className="pl-pds">"</span>topLeft<span className="pl-pds">"</span></span><br/>
                        closeOnSelect= <span className="pl-k">true</span><br/>
                        closeOnClickOutside= <span className="pl-k">true</span><br/>
                        displayFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy-MM-dd<span className="pl-pds">"</span></span><br/>
                        returnFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy/MM/dd<span className="pl-pds">"</span></span><br/>
                    </pre>
                </div>
            </div>
            </div>

            <h3>Date input(auto position)</h3>
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
                        autoPosition= <span className="pl-k">true</span><br/>
                        preferPosition= <span className="pl-s"><span className="pl-pds">"</span>bottomRight<span className="pl-pds">"</span></span><br/>
                        closeOnSelect= <span className="pl-k">true</span><br/>
                        closeOnClickOutside= <span className="pl-k">true</span><br/>
                        displayFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy-MM-dd<span className="pl-pds">"</span></span><br/>
                        returnFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy年M月d日<span className="pl-pds">"</span></span><br/>
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
                        mode= <span className="pl-s"><span className="pl-pds">"</span>day<span className="pl-pds">"</span></span><br/>
                        min= <span className="pl-s"><span className="pl-pds">"</span>2015-05-20<span className="pl-pds">"</span></span><br/>
                        max= <span className="pl-s"><span className="pl-pds">"</span>2016-05-20<span className="pl-pds">"</span></span><br/>
                        returnFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy-MM-dd<span className="pl-pds">"</span></span><br/>
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
                        mode= <span className="pl-s"><span className="pl-pds">"</span>month<span className="pl-pds">"</span></span><br/>
                        min= <span className="pl-s"><span className="pl-pds">"</span>2015-05<span className="pl-pds">"</span></span><br/>
                        max= <span className="pl-s"><span className="pl-pds">"</span>2016-05<span className="pl-pds">"</span></span><br/>
                        returnFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy-MM<span className="pl-pds">"</span></span><br/>
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
                        mode= <span className="pl-s"><span className="pl-pds">"</span>year<span className="pl-pds">"</span></span><br/>
                        min= <span className="pl-s"><span className="pl-pds">"</span>2015<span className="pl-pds">"</span></span><br/>
                        max= <span className="pl-s"><span className="pl-pds">"</span>2016<span className="pl-pds">"</span></span><br/>
                        returnFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy<span className="pl-pds">"</span></span><br/>
                    </pre>
                </div>
            </div>
        </div>
    }
}

ReactDOM.render(<Page />, document.getElementById('main'));
