import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'

import {DatePicker, DatePickerInput} from './src'
import Styles from './dist/lightGrey.css'
import DemoStyles from './index.css'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueScroll: '2016-03-14',
            value: new Date(),
            valueNumber: Date.now(),
            valueTime: '2016-03-14 12:12',
            valueFullDay: '2016-03-14 12:12:12',
            valueDay: '2016-03-14',
            valueMonth: '2016-03',
            valueYear: new Date(),
        };
    }

    render() {
        return <div className="demos">
            <h3>Day picker</h3>
            <div className="section">
                <div className="col col1">
                    <DatePicker
                        mode="day"
                        min="2015-05-20"
                        max="2030-05-20"
                        value={this.state.valueDay}
                        returnFormat="yyyy-MM-dd"
                        onChange={(v)=>{this.setState({valueDay: v})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.valueDay}</span></p>
                    <p className="btn-group">
                        <span className="btn" onClick={()=>{
                        this.setState({valueDay: '2020-02-02'})
                    }}>Set date to 2020-02-02</span>
                        <span className="btn" onClick={()=>{
                        this.setState({valueDay: null})
                    }}>Clear</span>
                    </p>
                    <p>Props</p>
                    <pre>
                        mode= <span className="pl-s"><span className="pl-pds">"</span>day<span className="pl-pds">"</span></span><br/>
                        min= <span className="pl-s"><span className="pl-pds">"</span>2015-05-20<span className="pl-pds">"</span></span><br/>
                        max= <span className="pl-s"><span className="pl-pds">"</span>2030-05-20<span className="pl-pds">"</span></span><br/>
                        returnFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy-MM-dd<span className="pl-pds">"</span></span><br/>
                    </pre>
                </div>
            </div>

            <h3>Date input(auto position in scroll container)</h3>
            <div id="scrollContainer" className="wrapper-limited">
                <div className="section">
                <div className="col col1">
                    <DatePickerInput
                        value={this.state.valueScroll}
                        readOnly={true}
                        autoPosition={true}
                        container='#scrollContainer'
                        preferPosition="topLeft"
                        closeOnSelect={true}
                        closeOnClickOutside={true}
                        displayFormat="yyyy/MM/dd"
                        returnFormat="yyyy-MM-dd"
                        onChange={(v)=>{this.setState({valueScroll: v})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.valueScroll}</span></p>
                    <p className="btn-group">
                        <span className="btn" onClick={()=>{
                        this.setState({valueScroll: '2020-02-02'})
                    }}>Set date to 2020-02-02</span>
                        <span className="btn" onClick={()=>{
                        this.setState({valueScroll: null})
                    }}>Clear</span>
                    </p>
                    <p>Props</p>
                    <pre>
                        value= <span className="pl-s"><span className="pl-pds">"</span>2016-03-14<span className="pl-pds">"</span></span><br/>
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
                        onChange={(v, date)=>{this.setState({value: date})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.value && this.state.value.toString()}</span></p>
                    <p className="btn-group">
                        <span className="btn" onClick={()=>{
                        this.setState({value: '2020-02-02'})
                    }}>Set date to 2020-02-02</span>
                        <span className="btn" onClick={()=>{
                        this.setState({value: null})
                    }}>Clear</span>
                    </p>
                    <p>Props</p>
                    <pre>
                        value= <span className="pl-k">new </span>Date()<br/>
                        autoPosition= <span className="pl-k">true</span><br/>
                        preferPosition= <span className="pl-s"><span className="pl-pds">"</span>bottomRight<span className="pl-pds">"</span></span><br/>
                        closeOnSelect= <span className="pl-k">true</span><br/>
                        closeOnClickOutside= <span className="pl-k">true</span><br/>
                        displayFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy年M月d日<span className="pl-pds">"</span></span><br/>
                        returnFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy-MM-dd<span className="pl-pds">"</span></span><br/>
                    </pre>
                </div>
            </div>

            <h3>Date input(different type of value)</h3>
            <div className="section">
                <div className="col col1">
                    <DatePickerInput
                        value={this.state.valueNumber}
                        readOnly={true}
                        autoPosition={true}
                        preferPosition="bottomRight"
                        closeOnSelect={true}
                        closeOnClickOutside={true}
                        displayFormat="yyyy年M月d日 HH:mm"
                        returnFormat="yyyy-MM-dd"
                        onChange={(v, date)=>{this.setState({valueNumber: date && date.getTime()})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.valueNumber && this.state.valueNumber.toString()}</span></p>
                    <p className="btn-group">
                        <span className="btn" onClick={()=>{
                        this.setState({valueNumber: '2020-02-02'})
                    }}>Set date to 2020-02-02</span>
                        <span className="btn" onClick={()=>{
                        this.setState({valueNumber: null})
                    }}>Clear</span>
                    </p>
                    <p>Props</p>
                    <pre>
                        value= Date.now()<br/>
                        autoPosition= <span className="pl-k">true</span><br/>
                        preferPosition= <span className="pl-s"><span className="pl-pds">"</span>bottomRight<span className="pl-pds">"</span></span><br/>
                        closeOnSelect= <span className="pl-k">true</span><br/>
                        closeOnClickOutside= <span className="pl-k">true</span><br/>
                        displayFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy年M月d日<span className="pl-pds">"</span></span><br/>
                        returnFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy-MM-dd<span className="pl-pds">"</span></span><br/>
                    </pre>
                </div>
            </div>

            <h3>Date input(time picker)</h3>
            <div className="section">
                <div className="col col1">
                    <DatePickerInput
                        value={this.state.valueTime}
                        readOnly={true}
                        autoPosition={true}
                        preferPosition="bottomRight"
                        closeOnSelect={false}
                        closeOnClickOutside={true}
                        mode="minute"
                        displayFormat="yyyy年M月d日 HH:mm"
                        returnFormat="yyyy-MM-dd HH:mm"
                        onChange={(v, date)=>{this.setState({valueTime: v})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.valueTime && this.state.valueTime.toString()}</span></p>
                    <p className="btn-group">
                        <span className="btn" onClick={()=>{
                        this.setState({valueNumber: '2020-02-02 12:12'})
                    }}>Set date to 2020-02-02 12:12</span>
                        <span className="btn" onClick={()=>{
                        this.setState({valueTime: null})
                    }}>Clear</span>
                    </p>
                    <p>Props</p>
                    <pre>
                        value= Date.now()<br/>
                        autoPosition= <span className="pl-k">true</span><br/>
                        preferPosition= <span className="pl-s"><span className="pl-pds">"</span>bottomRight<span className="pl-pds">"</span></span><br/>
                        closeOnSelect= <span className="pl-k">false</span><br/>
                        closeOnClickOutside= <span className="pl-k">true</span><br/>
                        mode= <span className="pl-s"><span className="pl-pds">"</span>minute<span className="pl-pds">"</span></span><br/>
                        displayFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy年M月d日 HH:mm<span className="pl-pds">"</span></span><br/>
                        returnFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy-MM-dd HH:mm<span className="pl-pds">"</span></span><br/>
                    </pre>
                </div>
            </div>

            <h3>Day picker(With hour&minute)</h3>
            <div className="section">
                <div className="col col1">
                    <DatePicker
                        mode="second"
                        min="2015-05-20"
                        max="2030-05-20"
                        value={this.state.valueFullDay}
                        returnFormat="yyyy-MM-dd HH:mm:ss"
                        onChange={(v)=>{this.setState({valueFullDay: v})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.valueFullDay}</span></p>
                    <p className="btn-group">
                        <span className="btn" onClick={()=>{
                        this.setState({valueFullDay: '2020-02-02 12:12:12'})
                    }}>Set date to 2020-02-02 12:12:12</span>
                        <span className="btn" onClick={()=>{
                        this.setState({valueFullDay: null})
                    }}>Clear</span>
                    </p>
                    <p>Props</p>
                    <pre>
                        mode= <span className="pl-s"><span className="pl-pds">"</span>second<span className="pl-pds">"</span></span><br/>
                        min= <span className="pl-s"><span className="pl-pds">"</span>2015-05-20<span className="pl-pds">"</span></span><br/>
                        max= <span className="pl-s"><span className="pl-pds">"</span>2030-05-20<span className="pl-pds">"</span></span><br/>
                        returnFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy-MM-dd HH:mm:ss<span className="pl-pds">"</span></span><br/>
                    </pre>
                </div>
            </div>

            <h3>Month picker</h3>
            <div className="section">
                <div className="col col1">
                    <DatePicker
                        mode="month"
                        min="2015-05"
                        max="2030-05"
                        returnFormat="yyyy-MM"
                        value={this.state.valueMonth}
                        onChange={(v)=>{this.setState({valueMonth: v})}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.valueMonth}</span></p>
                    <p className="btn-group">
                        <span className="btn" onClick={()=>{
                        this.setState({valueMonth: '2020-02'})
                    }}>Set date to 2020-02</span>
                        <span className="btn" onClick={()=>{
                        this.setState({valueMonth: null})
                    }}>Clear</span>
                    </p>
                    <p>Props</p>
                    <pre>
                        mode= <span className="pl-s"><span className="pl-pds">"</span>month<span className="pl-pds">"</span></span><br/>
                        min= <span className="pl-s"><span className="pl-pds">"</span>2015-05<span className="pl-pds">"</span></span><br/>
                        max= <span className="pl-s"><span className="pl-pds">"</span>2030-05<span className="pl-pds">"</span></span><br/>
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
                        max="2030"
                        returnFormat="yyyy"
                        value={this.state.valueYear}
                        onChange={(v, date)=>{this.setState({valueYear: date});}}
                    />
                </div>
                <div className="col col2">
                    <p>Selected: <span className="value">{this.state.valueYear && this.state.valueYear.toString()}</span></p>
                    <p className="btn-group">
                        <span className="btn" onClick={()=>{
                        this.setState({valueYear: '2020-02'})
                    }}>Set date to 2020</span>
                        <span className="btn" onClick={()=>{
                        this.setState({valueYear: null})
                    }}>Clear</span>
                    </p>
                    <p>Props</p>
                    <pre>
                        mode= <span className="pl-s"><span className="pl-pds">"</span>year<span className="pl-pds">"</span></span><br/>
                        min= <span className="pl-s"><span className="pl-pds">"</span>2015<span className="pl-pds">"</span></span><br/>
                        max= <span className="pl-s"><span className="pl-pds">"</span>2030<span className="pl-pds">"</span></span><br/>
                        returnFormat= <span className="pl-s"><span className="pl-pds">"</span>yyyy<span className="pl-pds">"</span></span><br/>
                    </pre>
                </div>
            </div>
        </div>
    }
}

ReactDOM.render(<Page />, document.getElementById('main'));
