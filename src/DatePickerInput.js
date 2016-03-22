import React, {PropTypes} from 'react'
import cx from 'classnames';

import DatePicker from './DatePicker'
import locale from './locale/zh-cn'

import {getDate, format} from './utils/date'
import {omit, noop} from './utils/util'

const propTypes = {
    onChange: PropTypes.func,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    value: PropTypes.string,
    mode: PropTypes.string, // 'year' 'month' 'day' as 'year' just a year picker
    min: PropTypes.string,
    max: PropTypes.string,
    returnFormat: PropTypes.string,
    className: PropTypes.string,
    closeOnClickOutside: PropTypes.bool,
    displayFormat: PropTypes.string,
    closeOnSelect: PropTypes.bool,
};

export default class DatePickerInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            value: props.value
        };
    }

    onChange(value) { // formatted value
        this.setState({
            value: value
        });
        if (this.props.closeOnSelect) {
            this.setState({
                show: false
            });
        }
        this.props.onChange(value)
    }

    onClick() {
        this.show();
    }

    hide() {
        this.setState({show: false}, this.props.onHide);
    }

    show() {
        if (!this.state.show) {
            this.setState({show: true}, this.props.onShow);
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        let props = this.props;
        let inputProps = omit(props, propTypes);
        return (
            <div className={cx('rcdateinput', this.props.className)}>
                <input type="text" {...inputProps}
                       value={this.state.value}
                       onClick={this.onClick.bind(this)}
                />
                {this.state.show ?
                    <DatePicker
                        value={props.value}
                        mode={props.mode}
                        min={props.min}
                        max={props.max}
                        returnFormat={props.returnFormat}
                        closeOnClickOutside={props.closeOnClickOutside}
                        onChange={this.onChange.bind(this)}
                    />
                    : ''}
            </div>
        )
    }
}


DatePickerInput.defaultProps = {
    onChange: noop,
    onShow: noop,
    onHide: noop,
    closeOnClickOutside: true,
    closeOnSelect: true,
};

DatePickerInput.propTypes = propTypes;
