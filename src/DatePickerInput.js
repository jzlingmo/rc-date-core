import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'

import cx from 'classnames';

import DatePicker from './DatePicker'
import locale from './locale/zh-cn'

import {getDate, format, getModeFormat} from './utils/date'
import {omit, noop} from './utils/util'
import {getViewPortSize, getBoundingClientRect} from './utils/dom'
import {eventOn, eventOff} from './utils/event'

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
    container: PropTypes.any, // string or dom object
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

    componentWillReceiveProps(nextProps){
        if(nextProps.value !== this.props.value){
            this.setState({
                value: this.getDisplayValue(nextProps.value)
            })
        }
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

    hidePicker() {
        if (this.state.show) {
            this.props.closeOnClickOutside && eventOff(window, 'click', this._onClickOutSideEvent);
            this.props.autoPosition && eventOff(this._getContainer(), 'scroll resize', this._onAutoPositionEvent);
            this.setState({show: false}, this.props.onHide);
        }
    }

    showPicker() {
        if (!this.state.show) {
            this.props.closeOnClickOutside && eventOn(window, 'click', this._onClickOutSideEvent);
            this.props.autoPosition && eventOn(this._getContainer(), 'scroll resize', this._onAutoPositionEvent);
            this.setState({
                show: true,
                pickerClass: this.state.pickerClass
            }, ()=> {
                this.props.onShow();
                this.setState({
                    pickerClass: this.props.autoPosition ? this._getPickerClass() : this.state.pickerClass
                });
            });
        }
    }

    togglePicker() {
        if (this.state.show) {
            this.hidePicker();
        } else {
            this.showPicker();
        }
    }

    _onClickOutSide(e) {
        let target = e.target || e.srcElement;
        if (this.__isOutside(target)) {
            this.hidePicker();
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

        let $picker = ReactDOM.findDOMNode(this.refs['rcdatepicker']);
        let $container = this.$container;
        let pickerHeight = $picker ? $picker.clientHeight : 0;

        let rect = getBoundingClientRect(this.$input, $container);
        let toTop = this._preferTop;
        let topSpace = rect['top'];
        let bottomSpace = getViewPortSize($container)['h'] - rect['bottom'];
        let canTop = topSpace >= pickerHeight;
        let canBottom = bottomSpace >= pickerHeight;
        if (this._preferTop) {
            // to top when can top or neither can
            toTop = canTop ? true : !canBottom;
        } else {
            // to bottom when can bottom or neither can
            toTop = !(canBottom ? true : !canTop);
        }
        pickerClass = pickerClass.replace(/top|bottom/, toTop ? 'top' : 'bottom');
        return pickerClass
    }

    _getContainer() {
        let $container = this.props.container;
        if (typeof $container === 'string') {
            $container = document.querySelectorAll($container)[0];
        }
        this.$container = $container || window;
        return this.$container
    }

    componentDidMount() {
        this.$input = ReactDOM.findDOMNode(this.refs['rcdateinput']);
    }

    componentWillUnmount() {
    }

    render() {
        let props = this.props;
        let inputProps = omit(props, propTypes);
        return (
            <div ref="rcdateinput" className={cx('rcdateinput', this.props.className)}>
                <input type="text" {...inputProps}
                       value={this.state.value}
                       onClick={this.showPicker.bind(this)}
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
