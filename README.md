# rc-date-core
A compact and delicate crafted core of date input.

## Installation
``` shell
npm install rc-date-core --save
```

## Usage
```es6
import DatePicker from 'rc-date-core'
// use dark skin
import style from './node_modules/rc-date-core/dist/dark.css'
class Demo extends React.Component{
    constructor(){
        this.state = {
            value: '2016/03/01'
        }
    }
    render(){
        return <DatePicker ref="datepicker"
                               mode="day"
                               value={this.state.value}
                               onChange={(v)=>{this.setState({value: v})}}
                           />
    }
}
```

## Props
- **onChange** (func) return string value formatted by prop 'mode' and 'returnFormat'
- **value** (string) e.g. 'yyyy/MM/dd'
- **mode** (string default 'day') 'year' 'month' 'day' as 'year' just a year picker
- **returnFormat** (string) e.g. 'yyyy/MM/dd' 
- **className** (string)

