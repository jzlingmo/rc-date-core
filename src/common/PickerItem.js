import React, {PropTypes} from 'react'
import cx from 'classnames';

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

    render() {
        let props = this.props;
        let className = cx("rcdate-picker", {
            [this.props.view]: true,
            "disabled": props.disabled,
            "selected": props.selected,
            "current": props.current
        });
        return (
            <span className={className}
                  onClick={this.onClick.bind(this)}
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
