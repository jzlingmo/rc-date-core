import React, {PropTypes} from 'react'
import cx from 'classnames';

import Picker from '../common/Picker'
import PickerWrapper from '../common/PickerWrapper'
import {compareDate, format, add} from '../utils/date'
import {range} from '../utils/util'

const RowDay = 3;
const ColDay = 4;

class YearPicker extends React.Component {
    constructor(props) {
        super(props);
        let innerValue = this.props.innerValue;
        let year = innerValue.getFullYear();
        this.baseYear = Math.floor(year / 10) * 10;
    }

    prevNav() {
        this.props.onChange(add(new Date(this.getBase(), 0), -10, 'year'));
    }

    nextNav() {
        this.props.onChange(add(new Date(this.getBase(), 0), 10, 'year'));
    }

    onChangeView() {
        this.props.onChangeView(this.getPrevView(this.props.view));
    }

    onChange(date) {
        this.props.onChange(date, this.props.view);
        if (this.compareView(this.props.view, this.props.mode) > 0) {
            this.props.onChangeView(this.getNextView(this.props.view));
        }
    }

    getBase() {
        return Math.floor(this.props.innerValue.getFullYear() / 10) * 10;
    }

    getYears() {
        let value = this.props.value;
        let view = this.props.view;
        let baseYear = this.getBase();

        let years = range(baseYear, 10).map((year) => {
            let date = new Date(year, 0);
            return {
                value: date,
                current: true,
                selected: compareDate(date, value, view),
                disabled: false
            }
        });
        years.unshift({
            value: new Date(baseYear - 1, 0),
            selected: false,
            disabled: false
        });
        years.push({
            value: new Date(baseYear + 10, 0),
            selected: false,
            disabled: false
        });

        let arr = [];
        let len = years.length;
        for (let start = 0; start < len; start += ColDay) {
            arr.push(years.slice(start, start + ColDay))
        }
        return arr
    }


    renderHead() {
        let baseYear = this.getBase();
        return (
            <div className="rcdate-head">
                <div className="rcdate-display">
                    <div className="rcdate-btn btn-left"
                         onClick={this.prevNav.bind(this)}>
                        &lt; </div>
                    <div className="rcdate-label">
                        {[baseYear, baseYear + 9].join(' - ')} </div>
                    <div className="rcdate-btn btn-right"
                         onClick={this.nextNav.bind(this)}>
                        &gt; </div>
                </div>
            </div>
        )
    }

    renderBody() {
        return (
            <div className="rcdate-body">
                {this.getYears().map((items, idx) =>
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

YearPicker.defaultProps = {};

YearPicker.propTypes = {
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

export default PickerWrapper(YearPicker)
