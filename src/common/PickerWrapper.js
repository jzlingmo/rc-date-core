import React, {PropTypes} from 'react'
import objectAssign from 'object-assign'

import {
    compareView,
    getForwardView,
    getViewFromMode,
    ALL_VIEWS,
} from '../utils/view'

const PickerWrapper = (Component) => {
    objectAssign(Component.prototype, {
        onChange(date) {
            let view = this.props.view;
            let toView = getViewFromMode(this.props.mode);
            this.props.onChange(date, view);
            if (compareView(view, toView) > 0) {
                let forwardView = getForwardView(view, 1);
                if(forwardView === 'time'){
                    return
                }
                this.props.onChangeView(forwardView);
            }
        },

        onForwardView(forwardStep) {
            let view = getForwardView(this.props.view, forwardStep);
            if (!view || view === ALL_VIEWS[0]) {
                return
            }
            this.props.onChangeView(view);
        }
    });

    objectAssign(Component, {
        defaultProps: {},

        propTypes: {
            onChange: PropTypes.func,
            onChangeView: PropTypes.func,
            prevDate: PropTypes.func,
            nextDate: PropTypes.func,
            value: PropTypes.any,
            innerValue: PropTypes.instanceOf(Date),
            min: PropTypes.string,
            max: PropTypes.string,
            view: PropTypes.string,
            mode: PropTypes.string,
            locale: PropTypes.object
        }
    });
    return Component
};

export default  PickerWrapper
