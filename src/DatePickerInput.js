import React, {PropTypes} from 'react'
import cx from 'classnames';

import DatePicker from './DatePicker'
import locale from './locale/zh-cn'

import {getDate, format, getModeFormat} from './utils/date'
import {omit, noop} from './utils/util'
import {getViewPortSize} from './utils/dom'

const propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    value: PropTypes.string,
    mode: PropTypes.string, // 'year' 'month' 'day' as 'year' just a year picker
    min: PropTypes.string,
    max: PropTypes.string,
    returnFormat: PropTypes.string,
    displayFormat: PropTypes.string,
    autoPosition: PropTypes.bool,
    preferPosition: PropTypes.string, // 'topLeft' 'topRight' 'bottomLeft' 'bottomRight'
    closeOnSelect: PropTypes.bool,
    closeOnClickOutside: PropTypes.bool,
};

const defaultProps = {
    onChange: noop,
    onShow: noop,
    onHide: noop,
    mode: 'day',
    autoPosition: false,
    preferPosition: 'bottomLeft',
    closeOnClickOutside: true,
    closeOnSelect: true,
};


const eventOn = (target, type, fn) => {
    if (window.attachEvent) {
        target.attachEvent('on' + type, fn);
    } else if (window.addEventListener) {
        target.addEventListener(type, fn, false);
    }
};

const eventOff = (target, type, fn) => {
    if (window.detachEvent) {
        target.detachEvent('on' + type, fn);
    } else if (window.removeEventListener) {
        target.removeEventListener(type, fn, false);
    }
};

export default class DatePickerInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            value: this.getDisplayValue(props.value),
            pickerClass: props.preferPosition,
        };
        this._onClickOutSideEvent = this._onClickOutSide.bind(this);
        this._onAutoPositionEvent = this._onAutoPosition.bind(this);
        this._preferTop = props.preferPosition.indexOf('top') !== -1;
    }

    getDisplayValue(value) {
        return format(value, this.props.displayFormat || getModeFormat(this.props.mode))
    }

    getReturnValue(value) {
        return format(value, this.props.returnFormat || getModeFormat(this.props.mode))
    }

    onChange(value) { // formatted date string
        this.setState({
            value: this.getDisplayValue(value)
        });
        if (this.props.closeOnSelect) {
            this.setState({
                show: false
            });
        }
        this.props.onChange(this.getReturnValue(value))
    }

    hide() {
        if (this.state.show) {
            this.props.closeOnClickOutside && eventOff(window, 'click', this._onClickOutSideEvent);
            this.setState({show: false}, this.props.onHide);
        }
    }

    show() {
        if (!this.state.show) {
            this.props.closeOnClickOutside && eventOn(window, 'click', this._onClickOutSideEvent);
            this.setState({
                show: true,
                pickerClass: this._getPickerClass()
            }, this.props.onShow);
        }
    }

    _onClickOutSide(e) {
        let target = e.target || e.srcElement;
        if (this.__isOutside(target)) {
            this.hide();
        }
    }

    __isOutside(elem) {
        let t = this;
        let outside = true;
        while (elem) {
            if (elem === t.$input) {
                outside = false;
                break;
            }
            elem = elem.parentNode;
        }
        return outside
    }

    _onAutoPosition() {
        this.state.show && this.setState({
            pickerClass: this._getPickerClass()
        })
    }

    _getPickerClass() {
        let pickerClass = this.state.pickerClass;

        let $picker = React.findDOMNode(this.refs['rcdatepicker']);
        let pickerHeight = $picker ? $picker.clientHeight : 300; // use 300px as default

        let rect = this.$input.getBoundingClientRect();
        let toTop = this._preferTop;
        if (this._preferTop) {
            toTop = rect['top'] >= pickerHeight;
        } else {
            // toTop only when bottom area too small
            toTop = getViewPortSize()['h'] - rect['bottom'] < pickerHeight;
        }

        pickerClass = pickerClass.replace(/top|bottom/, toTop ? 'top' : 'bottom');
        return pickerClass
    }

    componentDidMount() {
        this.$input = React.findDOMNode(this.refs['rcdateinput']);
        if (this.props.autoPosition) {
            eventOn(window, 'scroll', this._onAutoPositionEvent);
            eventOn(window, 'resize', this._onAutoPositionEvent);
            this.setState({
                pickerClass: this._getPickerClass()
            });
        }
    }

    componentWillUnmount() {
        if (this.props.autoPosition) {
            eventOff(window, 'scroll', this._onAutoPositionEvent);
            eventOff(window, 'resize', this._onAutoPositionEvent);
        }
    }

    render() {
        let props = this.props;
        let inputProps = omit(props, propTypes);
        return (
            <div ref="rcdateinput" className={cx('rcdateinput', this.props.className)}>
                <input type="text" {...inputProps}
                       value={this.state.value}
                       onClick={this.show.bind(this)}
                />
                {this.state.show ?
                    <DatePicker ref="rcdatepicker" className={this.state.pickerClass}
                                value={props.value}
                                mode={props.mode}
                                min={props.min}
                                max={props.max}
                                closeOnClickOutside={props.closeOnClickOutside}
                                onChange={this.onChange.bind(this)}
                    />
                    : ''}
            </div>
        )
    }
}


DatePickerInput.defaultProps = defaultProps;

DatePickerInput.propTypes = propTypes;
