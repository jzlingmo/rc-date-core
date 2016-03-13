import React, {PropTypes} from 'react'
import cx from 'classnames';

import YearPicker from './year/YearPicker'
import MonthPicker from './month/MonthPicker'
import DayPicker from './day/DayPicker'
import locale from './locale/zh-cn'

import {getDate} from './utils/date'

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

    onChange(value, view) {
        this.setState({
            innerValue: value
        });
        if (view === this.props.mode) {
            let formatValue = value.format(this.props.returnFormat);
            this.setState({
                value: new Date(formatValue)
            });
            this.props.onChange(formatValue)
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
    returnFormat: 'yyyy-MM-dd'
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
