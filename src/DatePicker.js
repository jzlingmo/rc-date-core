import React, { PropTypes } from 'react'
import cx from 'classnames';

import YearPicker from './year/YearPicker'
import MonthPicker from './month/MonthPicker'
import DayPicker from './day/DayPicker'
import TimePicker from './time/TimePicker'
import locale from './locale/zh-cn'

import { getDate, format, getModeFormat } from './utils/date'
import { isTimeView } from './utils/view'

const TIME_VIEWS = ['hour', 'minute', 'second'];

export default class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        let value = getDate(props.value); // get initial value
        let innerValue = value || new Date(); // initial view value
        let view = isTimeView(props.mode) ? 'day' : props.mode;  // inital view mode
        this.state = {
            value: value,
            innerValue: innerValue,
            view: view,
            locale: locale
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            let value = getDate(nextProps.value);
            this.setState({
                value: value,
                innerValue: value || new Date()
            })
        }
    }

    stopPropagation(e) {
        if (this.props.closeOnClickOutside) {
            e.stopPropagation();
        }
    }

    getReturnValue(value) {
        return format(value, this.props.returnFormat || getModeFormat(this.props.mode))
    }

    onChange(dateValue, view) {
        this.setState({
            innerValue: dateValue
        });
        let shouldChange = false;
        if (isTimeView(this.props.mode)) {
            shouldChange = ['day', 'time'].indexOf(view) !== -1
        } else {
            shouldChange = this.props.mode === view
        }
        if (shouldChange) {
            this.setState({
                value: new Date(dateValue)
            });
            this.props.onChange(this.getReturnValue(dateValue), dateValue)
        }
    }

    onChangeView(view) {
        this.setState({
            view: view
        })
    }

    render() {
        let t = this;
        let state = t.state;
        let props = t.props;
        let pickerMap = {
            'year': YearPicker,
            'month': MonthPicker,
            'day': DayPicker,
            'time': TimePicker,
        };
        let Picker = pickerMap[t.state.view] || pickerMap['day'];
        let pickerProps = {
            value: state.value,
            innerValue: state.innerValue,
            view: state.view,
            mode: props.mode,
            min: props.min,
            max: props.max,
            onChange: t.onChange.bind(t),
            onChangeView: t.onChangeView.bind(t),
            locale: state.locale,
        };
        return (
            <div className={cx('rcdate', props.className, {floating: props.floating} )}
                 onClick={t.stopPropagation.bind(t)}
            ><Picker {...pickerProps} /></div>
        )
    }
}


DatePicker.defaultProps = {
    mode: 'day',
};

DatePicker.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date)
    ]),
    mode: PropTypes.oneOf(['year', 'month', 'day', 'hour', 'minute', 'second']),
    min: PropTypes.string,
    max: PropTypes.string,
    returnFormat: PropTypes.string,
    closeOnClickOutside: PropTypes.bool
};
