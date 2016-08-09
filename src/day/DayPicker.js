import React, {PropTypes} from 'react'
import cx from 'classnames';

import PickerHead from '../common/PickerHead'
import PickerItem from '../common/PickerItem'
import PickerWrapper from '../common/PickerWrapper'
import { daysInMonth, getDate, compareDate, format, add } from '../utils/date'
import { range, matrix } from '../utils/util'
import { isTimeView } from '../utils/view'

const RowNum = 6;
const ColNum = 7;
class DayPicker extends React.Component {

    constructor(props) {
        super(props);
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
        let nextCount = RowNum * ColNum - currentDaysCount - prevCount;
        let days = range(prevDaysCount - prevCount, prevCount).map(day => {
            let date = new Date(year, month - 1, day);
            return {
                value: date,
                selected: false,
            }
        }).concat(range(1, currentDaysCount).map(day => {
            let date = new Date(year, month, day);
            return {
                value: date,
                selected: compareDate(date, value, view) === 0,
                current: true,
            }
        })).concat(range(1, nextCount).map(day => {
            let date = new Date(year, month + 1, day);
            return {
                value: date,
                selected: false,
            }
        }));

        return matrix(days, ColNum)
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

    renderBody() {
        return (
            <div className="rcdate-body">
                {this.getDays().map((items, idx) =>
                    <div key={idx} className="rcdate-row">
                        {items.map((item, idx) =>
                            <PickerItem {...item}
                                key={idx}
                                min={this.props.min}
                                max={this.props.max}
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

    renderFoot() {
        if(!isTimeView(this.props.mode)){
           return null
        }
        return <div className="rcdate-foot rcdate-picker time"
                    onClick={this.onForwardView.bind(this, 1)}>
            <i className="rcdate-icon-clock" />
        </div>
    }

    render() {
        return (
            <div className="rcdate-container">
                <PickerHead
                    onPrev={this.prevNav.bind(this)}
                    onNext={this.nextNav.bind(this)}
                    onLabelClick={this.onForwardView.bind(this, -1)}
                    label={format(this.props.innerValue, 'yyyy-MM')}
                >{this.renderWeeks()}</PickerHead>
                {this.renderBody()}
                {this.renderFoot()}
            </div>
        )
    }
}

export default PickerWrapper(DayPicker)
