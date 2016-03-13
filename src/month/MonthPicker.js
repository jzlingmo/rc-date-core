import React, {PropTypes} from 'react'
import cx from 'classnames';

import Picker from '../common/Picker'
import {compareDate, format, add} from '../utils/date'

const RowDay = 3;
const ColDay = 4;
export default class MonthPicker extends React.Component {
    constructor(props) {
        super(props);
    }

    prevNav() {
        this.props.onChange(add(this.props.innerValue, 1, 'year'));
    }

    nextNav() {
        this.props.onChange(add(this.props.innerValue, 1, 'year'));
    }

    handleLabelClick(){
        this.props.onChangeView('year');
    }

    onChange(date) {
        this.props.onChange(date, this.props.view);
    }

    getMonths() {
        let value = this.props.value;
        let innerValue = this.props.innerValue;
        let view = this.props.view;
        let year = innerValue.getFullYear();

        let months = this.props.locale['months'].map((monthStr, month) =>{
            let date = new Date(year, month);
            return {
                value: date,
                selected: compareDate(date, value, view),
                disabled: false
            }
        });

        let arr = [];
        let len = months.length;
        for (let start = 0; start < len; start += ColDay) {
            arr.push(months.slice(start, start + ColDay))
        }
        return arr
    }


    renderHead(){
        return (
            <div className="rcdate-head">
                <div className="rcdate-display">
                    <div className="rcdate-btn btn-left"
                         onClick={this.prevNav.bind(this)}>
                        &lt; </div>
                    <div className="rcdate-label"
                         onClick={this.handleLabelClick.bind(this)}>
                        {format(this.props.innerValue, 'yyyy')} </div>
                    <div className="rcdate-btn btn-right"
                         onClick={this.nextNav.bind(this)}>
                        &gt; </div>
                </div>
            </div>
        )
    }

    renderBody(){
        return (
            <div className="rcdate-body">
                {this.getMonths().map((items, idx) =>
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

MonthPicker.defaultProps = {};

MonthPicker.propTypes = {
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
