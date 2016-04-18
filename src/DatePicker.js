import React, {PropTypes} from 'react'
import cx from 'classnames';

import YearPicker from './year/YearPicker'
import MonthPicker from './month/MonthPicker'
import DayPicker from './day/DayPicker'
import locale from './locale/zh-cn'

import {getDate, format, getModeFormat} from './utils/date'

export default class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        let value = getDate(props.value); // get initial value
        let innerValue = value || new Date(); // initial view value
        let view = props.mode;  // inital view mode
        this.state = {
            value: value,
            innerValue: innerValue,
            view: view,
            locale: locale
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.value !== this.props.value){
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

    onChange(value, view) {
        this.setState({
            innerValue: value
        });
        if (view === this.props.mode) {
            this.setState({
                value: new Date(value)
            });
            this.props.onChange(this.getReturnValue(value))
        }
    }

    onChangeView(view) {
        this.setState({
            view: view
        })
    }

    renderYearPicker() {
        return <YearPicker
            value={this.state.value}
            innerValue={this.state.innerValue}
            view={this.state.view}
            mode={this.props.mode}
            min={this.props.min}
            max={this.props.max}
            onChange={this.onChange.bind(this)}
            onChangeView={this.onChangeView.bind(this)}
            locale={this.state.locale}
        />
    }

    renderMonthPicker() {
        return <MonthPicker
            value={this.state.value}
            innerValue={this.state.innerValue}
            view={this.state.view}
            mode={this.props.mode}
            min={this.props.min}
            max={this.props.max}
            onChange={this.onChange.bind(this)}
            onChangeView={this.onChangeView.bind(this)}
            locale={this.state.locale}
        />
    }

    renderDayPicker() {
        return <DayPicker
            value={this.state.value}
            innerValue={this.state.innerValue}
            view={this.state.view}
            mode={this.props.mode}
            min={this.props.min}
            max={this.props.max}
            onChange={this.onChange.bind(this)}
            onChangeView={this.onChangeView.bind(this)}
            locale={this.state.locale}
        />
    }

    render() {
        let t = this;
        let props = t.props;
        let picker;
        switch (t.state.view) {
            case 'year':
                picker = t.renderYearPicker();
                break;
            case 'month':
                picker = t.renderMonthPicker();
                break;
            case 'day': // fall through
            default:
                picker = t.renderDayPicker();
                break;
        }
        return (
            <div className={cx('rcdate', props.className, {floating: props.floating} )}
                 onClick={t.stopPropagation.bind(t)}
            >{picker}</div>
        )
    }
}


DatePicker.defaultProps = {
    mode: 'day',
};

DatePicker.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    mode: PropTypes.string, // 'year' 'month' 'day' as 'year' just a year picker
    min: PropTypes.string,
    max: PropTypes.string,
    returnFormat: PropTypes.string,
    closeOnClickOutside: PropTypes.bool
};
