# rc-date-core
A compact and delicate crafted core of date input.

<img src="http://7xib2u.com1.z0.glb.clouddn.com/daypicker.png" width="236"/>

## Installation
``` shell
npm install rc-date-core --save
```

## Props
### date picker props
- **onChange** (func) return string value formatted by prop 'mode' and 'returnFormat'
- **value** (string) date value of input e.g. 'yyyy/MM/dd'
- **min** (string) min date limit depended on mode e.g. '2015/01/01'
- **max** (string) max date limit same as above
- **mode** (string default 'day')  'year' 'month' 'day' as 'year' just a year picker
- **returnFormat** (string) e.g. 'yyyy/MM/dd' if none provided, just decided by 'mode'
- **className** (string)

### date input props
- ...any props above
- **autoPosition** (bool default false) enable picker changing position when scrolling
- **preferPosition** (string default "bottomLeft") initial position of picker(als0 will affect autoPosition when enabled)
- **container** (selector or element default window) scroll container for autoPosition
- **closeOnSelect** (bool default true) close picker when select
- **closeOnClickOutside** (bool default true) close picker when click outside
- **displayFormat** (string) e.g. 'yyyy/MM/dd' input value display, if none provided, just decided by 'mode'
- ...any other props of react input element e.g. 'readOnly' 'disabled'


## Usage
```es6
import {DatePicker} from 'rc-date-core'
// use dark skin
import Styles from './node_modules/rc-date-core/dist/darkInput.css'
class Demo extends React.Component{
    constructor(){
        this.state = {
            value: '2016/03/01'
            inputValue: '2016/03/02'
        }
    }
    render(){
        return (
            <div>
                <DatePicker ref="datepicker"
                       mode="day"
                       min="2016/01/01"
                       max="2016/11/01"
                       value={this.state.value}
                       onChange={(v)=>{this.setState({value: v})}}
               />
               <DatePickerInput
                    mode="day"
                    min="2016/01/01"
                    max="2016/11/01"
                    value={this.state.inputValue}
                    readOnly={true}
                    autoPosition={true}
                    container={window}
                    preferPosition="bottomRight"
                    closeOnSelect={true}
                    closeOnClickOutside={true}
                    onChange={(v)=>{this.setState({inputValue: v})}}
                />
            </div>
       )
    }
}
```
