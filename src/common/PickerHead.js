import React, {PropTypes} from 'react'

export default class PickerHead extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props;
        return (
            <div className="rcdate-head">
                <div className="rcdate-display">
                    <div className="rcdate-btn btn-left"
                         onClick={props.onPrev}> &lt; </div>
                    <div className="rcdate-label"
                         onClick={props.onLabelClick}>{props.label}</div>
                    <div className="rcdate-btn btn-right"
                         onClick={props.onNext}> &gt; </div>
                </div>
                {props.children}
            </div>
        )
    }
}

PickerHead.defaultProps = {};

PickerHead.propTypes = {
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onLabelClick: PropTypes.func.isRequired,
    label: PropTypes.string,
};
