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
                    {props.onPrev ? <div className="rcdate-btn btn-left"
                                         onClick={props.onPrev}> &lt; </div> : null}
                    <div className="rcdate-label"
                         onClick={props.onLabelClick}>{props.label}</div>
                    {props.onNext ? <div className="rcdate-btn btn-right"
                                         onClick={props.onNext}> &gt; </div> : null}
                </div>
                {props.children}
            </div>
        )
    }
}

PickerHead.defaultProps = {};

PickerHead.propTypes = {
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onLabelClick: PropTypes.func.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
};
