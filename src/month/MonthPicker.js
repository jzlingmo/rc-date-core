import React, {PropTypes} from 'react'
import cx from 'classnames';

import PickerHead from '../common/PickerHead'
import PickerItem from '../common/PickerItem'
import PickerWrapper from '../common/PickerWrapper'
import {compareDate, format, add} from '../utils/date'
import {matrix} from '../utils/util'

const RowNum = 3;
const ColNum = 4;

class MonthPicker extends React.Component {
    constructor(props) {
        super(props);
    }

    prevNav() {
        this.props.onChange(add(this.props.innerValue, -1, 'year'));
    }

    nextNav() {
        this.props.onChange(add(this.props.innerValue, 1, 'year'));
    }

    getMonths() {
        let value = this.props.value;
        let innerValue = this.props.innerValue;
        let view = this.props.view;
        let year = innerValue.getFullYear();

        let months = this.props.locale['months'].map((monthStr, month) => {
            let date = new Date(year, month);
            return {
                value: date,
                selected: compareDate(date, value, view) === 0,
                current: true,
                disabled: false
            }
        });

        return matrix(months, ColNum)
    }

    renderBody() {
        return (
            <div className="rcdate-body">
                {this.getMonths().map((items, idx) =>
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

    render() {
        return (
            <div className="rcdate-container">
                <PickerHead
                    onPrev={this.prevNav.bind(this)}
                    onNext={this.nextNav.bind(this)}
                    onLabelClick={this.onForwardView.bind(this, -1)}
                    label={format(this.props.innerValue, 'yyyy')}
                />
                {this.renderBody()}
            </div>
        )
    }
}

export default PickerWrapper(MonthPicker)
