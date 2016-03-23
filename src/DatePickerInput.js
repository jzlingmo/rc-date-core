import React, {PropTypes} from 'react'
import cx from 'classnames';

import DatePicker from './DatePicker'
import locale from './locale/zh-cn'

import {getDate, format} from './utils/date'
import {omit, noop} from './utils/util'

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
    closeOnSelect: PropTypes.bool,
    closeOnClickOutside: PropTypes.bool,
};

const defaultProps = {
    onChange: noop,
    onShow: noop,
    onHide: noop,
    mode: 'day',
    closeOnClickOutside: true,
    closeOnSelect: true,
};

export default class DatePickerInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            value: props.value
        };
        this._onClickOutSideEvent = this._onClickOutSide.bind(this);
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

    hide() {
        if (this.state.show) {
            this.props.closeOnClickOutside && this._offClickOutside();
            this.setState({show: false}, this.props.onHide);
        }
    }

    show() {
        if (!this.state.show) {
            this.props.closeOnClickOutside && this._onClickOutside();
            this.setState({show: true}, this.props.onShow);
        }
    }

    _onClickOutside() {
        if (window.attachEvent) {
            window.attachEvent('onclick', this._onClickOutSideEvent);
        } else if (window.addEventListener) {
            window.addEventListener('click', this._onClickOutSideEvent, false);
        }
    }

    _offClickOutside() {
        if (window.detachEvent) {
            window.detachEvent('onclick', this._onClickOutSideEvent);
        } else if (window.removeEventListener) {
            window.removeEventListener('click', this._onClickOutSideEvent, false);
        }
    }

    _onClickOutSide(e) {
        let target = e.target || e.srcElement;
        if (this._isOutside(target)) {
            this.hide();
        }
    }

    _isOutside(elem) {
        let t = this;
        let outside = true;
        while (elem) {
            if (elem === t.$el) {
                outside = false;
                break;
            }
            elem = elem.parentNode;
        }
        return outside
    }

    componentDidMount() {
        this.$el = React.findDOMNode(this.refs['rcdateinput']);
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
                    <DatePicker ref
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


DatePickerInput.defaultProps = defaultProps;

DatePickerInput.propTypes = propTypes;
