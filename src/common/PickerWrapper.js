import React, {PropTypes} from 'react'
import objectAssign from 'object-assign'

const PickerWrapper = (Component) => {
    objectAssign(Component.prototype, {
        _viewList: ['decade', 'year', 'month', 'day'],
        _compareView(viewA, viewB) {
            let a = this._viewList.indexOf(viewA);
            let b = this._viewList.indexOf(viewB);
            if (a < b) {
                return 1
            } else if (a === b) {
                return 0
            } else {
                return -1
            }
        },

        _getForwardView(forwardStep){
            let current = this.props.view;
            let idx = this._viewList.indexOf(current);
            return this._viewList[idx + forwardStep]
        },

        onChange(date) {
            this.props.onChange(date, this.props.view);
            if (this._compareView(this.props.view, this.props.mode) > 0) {
                this.props.onChangeView(this._getForwardView(1));
            }
        },

        onForwardView(forwardStep) {
            let view = this._getForwardView(forwardStep);
            if (!view || view === this._viewList[0]) {
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
            minDate: PropTypes.string,
            maxDate: PropTypes.string,
            view: PropTypes.string,
            mode: PropTypes.string,
            locale: PropTypes.object
        }
    });
    return Component
};

export default  PickerWrapper
