import React, {PropTypes} from 'react'
import cx from 'classnames';
import {daysInMonth, getDate, compareDate} from '../utils/date'
import {range} from '../utils/util'

import Picker from '../common/Picker'

const RowDay = 6;
const ColDay = 7;
export default class DayPicker extends React.Component {

    constructor(props) {
        super(props);
    }

    handleLabelClick() {
        // to change view
        this.props.onChangeView('month');
    }

    onChange(date) {
        this.props.onChange(date, this.props.view);
    }

    prevDate() {
        let innerValue = this.props.innerValue;
        innerValue.setMonth(innerValue.getMonth() - 1);
        this.props.onChange(new Date(innerValue));
    }

    nextDate() {
        let innerValue = this.props.innerValue;
        innerValue.setMonth(innerValue.getMonth() + 1);
        this.props.onChange(new Date(innerValue));
    }

    getWeeks() {
        return this.props.locale.weekdaysMin
    }

    getDays() {
        let days;
        let value = this.props.value;
        let innerValue = this.props.innerValue;
        let view = this.props.view;

        let year = innerValue.getFullYear();
        let month = innerValue.getMonth();
        let currentDaysCount = daysInMonth(year, month);
        let prevDaysCount = daysInMonth(year, month - 1);
        let prevCount = new Date(year, month).getDay();
        let nextCount = RowDay * ColDay - currentDaysCount - prevCount;
        days = range(prevDaysCount - prevCount, prevCount).map(day => {
            return {
                value: new Date(year, month - 1, day),
                selected: false,
                disabled: false,
            }
        }).concat(range(1, currentDaysCount).map(day => {
            let date = new Date(year, month, day)
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
        return <div className="weeks">
            {this.getWeeks().map(num =>
                <span className="day" key={num}>{num}</span>
            )}
        </div>
    }

    renderDays() {
        return <div className="rcdate-body">
            {this.getDays().map((days, idx) =>
                <div key={idx} className="rcdate-row">
                    {days.map((day, idx) =>
                        <Picker key={idx}
                            {...day}
                                view={this.props.view}
                                onClick={this.onChange.bind(this)}
                                locale={this.props.locale}
                        />
                    )}
                </div>
            )}
        </div>
    }

    render() {
        return <div className="rcdate-container">
            <div className="rcdate-head">
                <div className="rcdate-display">
                    <div className="rcdate-btn btn-left"
                         onClick={this.prevDate.bind(this)}>
                        &lt; </div>
                    <div className="rcdate-label"
                         onClick={this.handleLabelClick.bind(this)}>
                        {this.props.innerValue.format('yyyy-MM')} </div>
                    <div className="rcdate-btn btn-right"
                         onClick={this.nextDate.bind(this)}>
                        &gt; </div>
                </div>
                {this.renderWeeks()}
            </div>
            {this.renderDays()}
        </div>
    }
}

DayPicker.defaultProps = {};

DayPicker.propTypes = {
    onChange: PropTypes.func,
    onChangeView: PropTypes.func,
    prevDate: PropTypes.func,
    nextDate: PropTypes.func,
    value: PropTypes.any, // todo
    innerValue: PropTypes.any, // todo
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    view: PropTypes.string,
    locale: PropTypes.any // todo
};
