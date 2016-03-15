import React, {PropTypes} from 'react'
import cx from 'classnames';

import YearPicker from './year/YearPicker'
import MonthPicker from './month/MonthPicker'
import DayPicker from './day/DayPicker'
import locale from './locale/zh-cn'

import {getDate, format} from './utils/date'

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

    stopPropagation(e) {
        if (this.props.closeOnClickOutside) {
            e.stopPropagation();
        }
    }

    getReturnValue(value){
        let returnFormat = this.props.returnFormat;
        let mode = this.props.mode;
        const formatStr = 'yyyy-MM-dd hh:ss';
        const lenMap = {
            year: 4,
            month: 7,
            day: 10,
            hour: 16
        };
        returnFormat = returnFormat || formatStr.substr(0, lenMap[mode]);
        return format(value, returnFormat)
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
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
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
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
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
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            onChange={this.onChange.bind(this)}
            onChangeView={this.onChangeView.bind(this)}
            locale={this.state.locale}
        />
    }

    render() {
        let t = this;
        let picker;
        switch (t.state.view) {
            case 'year':
                picker = t.renderYearPicker();
                break;
            case 'month':
                picker = t.renderMonthPicker();
                break;
            case 'day':
            // fall through
            default:
                picker = t.renderDayPicker();
                break;
        }
        return (
            <div
                className={cx('rcdate', this.props.className, {floating: this.props.floating} )}
                onClick={this.stopPropagation.bind(this)}>
                {picker}
            </div>
        )
    }
}


DatePicker.defaultProps = {
    mode: 'day',
};

DatePicker.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    mode: PropTypes.string, // 'year' 'month' 'day' as 'year' just a year picker
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    returnFormat: PropTypes.string,
    className: PropTypes.string,
};
