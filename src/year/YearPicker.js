import React, {PropTypes} from 'react'
import cx from 'classnames';

import PickerHead from '../common/PickerHead'
import PickerItem from '../common/PickerItem'
import PickerWrapper from '../common/PickerWrapper'
import {compareDate, format, add} from '../utils/date'
import {range, matrix} from '../utils/util'

const RowNum = 3;
const ColNum = 4;

class YearPicker extends React.Component {
    constructor(props) {
        super(props);
    }

    prevNav() {
        this.props.onChange(add(new Date(this.getBase(), 0), -10, 'year'));
    }

    nextNav() {
        this.props.onChange(add(new Date(this.getBase(), 0), 10, 'year'));
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
                selected: compareDate(date, value, view) === 0,
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

        return matrix(years, ColNum)
    }

    renderBody() {
        return (
            <div className="rcdate-body">
                {this.getYears().map((items, idx) =>
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
        let baseYear = this.getBase();
        return (
            <div className="rcdate-container">
                <PickerHead
                    onPrev={this.prevNav.bind(this)}
                    onNext={this.nextNav.bind(this)}
                    onLabelClick={this.onForwardView.bind(this, -1)}
                    label={[baseYear, baseYear + 9].join(' - ')}
                />
                {this.renderBody()}
            </div>
        )
    }
}

export default PickerWrapper(YearPicker)
