import React, {PropTypes} from 'react'
import objectAssign from 'object-assign'

const PickerWrapper = (Component) =>{
    objectAssign(Component.prototype, {
        viewList: ['year', 'month', 'day'],
        compareView(viewA, viewB) {
            let a = this.viewList.indexOf(viewA);
            let b = this.viewList.indexOf(viewB);
            if (a < b) {
                return 1
            } else if (a === b) {
                return 0
            } else {
                return -1
            }
        },

        getPrevView(current) {
            let idx = this.viewList.indexOf(current);
            return this.viewList[idx - 1]
        },

        getNextView(current) {
            let idx = this.viewList.indexOf(current);
            return this.viewList[idx + 1]
        }
    });
    return Component
};

export default  PickerWrapper
