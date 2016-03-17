# rc-date-core
A compact and delicate crafted core of date input.

## Installation
``` shell
npm install rc-date-core --save
```

## Props
- **onChange** (func) return string value formatted by prop 'mode' and 'returnFormat'
- **value** (string) initial date value e.g. 'yyyy/MM/dd'
- **min** (string) min date limit depended on mode e.g. '2015/01/01'
- **max** (string) max date limit same as above
- **mode** (string default 'day')  'year' 'month' 'day' as 'year' just a year picker
- **returnFormat** (string) e.g. 'yyyy/MM/dd' 
- **className** (string)

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
        return (
            <DatePicker ref="datepicker"
                   mode="day"
                   min="2016/01/01"
                   max="2016/11/01"
                   value={this.state.value}
                   onChange={(v)=>{this.setState({value: v})}}
           />
       )
    }
}
```
