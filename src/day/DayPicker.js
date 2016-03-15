import React, {PropTypes} from 'react'
import cx from 'classnames';

import Picker from '../common/Picker'
import PickerWrapper from '../common/PickerWrapper'
import {daysInMonth, getDate, compareDate, format, add} from '../utils/date'
import {range} from '../utils/util'

const RowDay = 6;
const ColDay = 7;
class DayPicker extends React.Component {

    constructor(props) {
        super(props);
    }

    handleLabelClick() {
        this.props.onChangeView('month');
    }

    onChange(date) {
        this.props.onChange(date, this.props.view);
        if (this.compareView(this.props.view, this.props.mode) > 0) {
            this.props.onChangeView(this.getNextView(this.props.view));
        }
    }

    prevNav() {
        this.props.onChange(add(this.props.innerValue, -1, 'month'));
    }

    nextNav() {
        this.props.onChange(add(this.props.innerValue, 1, 'month'));
    }

    getWeeks() {
        return this.props.locale.weekdaysMin
    }

    getDays() {
        let value = this.props.value;
        let innerValue = this.props.innerValue;
        let view = this.props.view;
        let year = innerValue.getFullYear();
        let month = innerValue.getMonth();

        let currentDaysCount = daysInMonth(year, month);
        let prevDaysCount = daysInMonth(year, month - 1);
        let prevCount = new Date(year, month).getDay();
        let nextCount = RowDay * ColDay - currentDaysCount - prevCount;
        let days = range(prevDaysCount - prevCount, prevCount).map(day => {
            return {
                value: new Date(year, month - 1, day),
                selected: false,
                disabled: false,
            }
        }).concat(range(1, currentDaysCount).map(day => {
            let date = new Date(year, month, day);
            return {
                value: date,
                selected: compareDate(date, value, view),
                current: true,
                disabled: false,
            }
        })).concat(range(1, nextCount).map(day => {
            return {
                value: new Date(year, month + 1, day),
                selected: false,
                disabled: false,
            }
        }));

        let arr = [];
        let len = days.length;
        for (let start = 0; start < len; start += ColDay) {
            arr.push(days.slice(start, start + ColDay))
        }
        return arr
    }

    renderWeeks() {
        return (
            <div className="weeks">
                {this.getWeeks().map(num =>
                    <span className="day" key={num}>{num}</span>
                )}
            </div>
        )
    }

    renderHead() {
        return (
            <div className="rcdate-head">
                <div className="rcdate-display">
                    <div className="rcdate-btn btn-left"
                         onClick={this.prevNav.bind(this)}>
                        &lt; </div>
                    <div className="rcdate-label"
                         onClick={this.handleLabelClick.bind(this)}>
                        {format(this.props.innerValue, 'yyyy-MM')} </div>
                    <div className="rcdate-btn btn-right"
                         onClick={this.nextNav.bind(this)}>
                        &gt; </div>
                </div>
                {this.renderWeeks()}
            </div>
        )
    }

    renderBody() {
        return (
            <div className="rcdate-body">
                {this.getDays().map((items, idx) =>
                    <div key={idx} className="rcdate-row">
                        {items.map((item, idx) =>
                            <Picker {...item}
                                key={idx}
                                view={this.props.view}
                                onClick={this.onChange.bind(this)}
                                locale={this.props.locale}
                            />
                        )}
                    </div>
                )}
            </div>
        )
    }

    render() {
        return (
            <div className="rcdate-container">
                {this.renderHead()}
                {this.renderBody()}
            </div>
        )
    }
}

DayPicker.defaultProps = {};

DayPicker.propTypes = {
    onChange: PropTypes.func,
    onChangeView: PropTypes.func,
    prevDate: PropTypes.func,
    nextDate: PropTypes.func,
    value: PropTypes.any,
    innerValue: PropTypes.instanceOf(Date),
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    view: PropTypes.string,
    mode: PropTypes.string,
    locale: PropTypes.object
};

export default PickerWrapper(DayPicker)
