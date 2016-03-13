import React, {PropTypes} from 'react'
import ReactDom from 'react-dom'
import DatePicker from './src'
import Styles from './dist/default.css'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '2016-03-12'
        };
    }
    onChange(value){
        this.setState({
            value: value
        })
    }
    render(){
        return <div>
            <div>Current selected date: {this.state.value}</div>
            <DatePicker value={this.state.value} onChange={this.onChange.bind(this)}/>
        </div>
    }
}

ReactDom.render(<Page />, document.getElementById('main'));
