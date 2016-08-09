import React, {PropTypes} from 'react'
import cx from 'classnames';

import PickerHead from '../common/PickerHead'
import PickerItem from '../common/PickerItem'
import PickerWrapper from '../common/PickerWrapper'
import { compareDate, format, add, set, get } from '../utils/date'
import { TIME_VIEWS } from '../utils/view'


const processTimeValue = (value, range)=> {
    value = value % range;
    if (value < 0) {
        value += range
    }
    return value
};

class TimePicker extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeValue(viewName, value) {
        value = value >>> 0;
        let date = set(this.props.innerValue, value, viewName);
        this.props.onChange(date, 'time');
    }

    onChangeAdd(viewName, step) {
        let value = get(this.props.innerValue, viewName) + step;
        value = processTimeValue(value, viewName === 'hour' ? 24 : 60);
        this.onChangeValue(viewName, value);
    }

    getInputs() {
        let inputs = [];
        let mode = this.props.mode;
        let inputCount = TIME_VIEWS.indexOf(mode) + 1;
        for (let i = 0; i < inputCount; i++) {
            let viewName = TIME_VIEWS[i];
            inputs.push({
                value: get(this.props.value, viewName) || 0,
                view: viewName,
            })
        }
        return inputs
    }

    renderBody() {
        let t = this;
        return (
            <div border="0" className="rcdate-body rcdate-time">
                {t.getInputs().map((item, idx) =>
                    <div className="rcdate-time-item" key={idx}>
                        <div>
                            <i className="rcdate-icon-up rcdate-time-control rcdate-picker time"
                               onClick={t.onChangeAdd.bind(t, item.view, 1)}/>
                        </div>
                        <input className="rcdate-time-input"
                               type="text"
                               value={item.value}
                               onChange={(e)=>{t.onChangeValue(item.view, e.target.value)}}/>
                        <div>
                            <i className="rcdate-icon-down rcdate-time-control rcdate-picker time"
                               onClick={t.onChangeAdd.bind(t, item.view, -1)}/>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    render() {
        return (
            <div className="rcdate-container">
                <PickerHead
                    onLabelClick={this.onForwardView.bind(this, -1)}
                    label={<i className="rcdate-icon-calendar" />}
                />
                {this.renderBody()}
            </div>
        )
    }
}

export default PickerWrapper(TimePicker)
