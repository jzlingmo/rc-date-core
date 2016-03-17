import React, {PropTypes} from 'react'
import cx from 'classnames';

import {compareDate} from '../utils/date'

const noop = ()=> {
};

export default class PickerItem extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.onClick(this.props.value)
    }

    getDisplay() {
        let date = this.props.value;
        let display;
        switch (this.props.view) {
            case 'day':
                display = date.getDate();
                break;
            case 'month':
                display = this.props.locale.months[date.getMonth()];
                break;
            case 'year':
                display = date.getFullYear();
                break;
            default:
                break;
        }
        return display
    }
    isDisabled(){
        let props = this.props;
        let view = props.view
        let date = props.value;
        let min = props.min;
        let max = props.max;
        return compareDate(date, min, view) === -1 || compareDate(date, max, view) === 1
    }

    render() {
        let props = this.props;
        let disabled = this.isDisabled();
        let className = cx("rcdate-picker", {
            [this.props.view]: true,
            "disabled": disabled,
            "selected": props.selected,
            "current": props.current
        });
        return (
            <span className={className}
                  onClick={disabled ? noop : this.onClick.bind(this)}
            >{this.getDisplay()}</span>
        )
    }
}

PickerItem.defaultProps = {};

PickerItem.propTypes = {
    onClick: PropTypes.func,
    date: PropTypes.func,
    view: PropTypes.string,
};
