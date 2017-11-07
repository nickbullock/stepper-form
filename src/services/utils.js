import actions from '../actions';

export default class Utils {
    static loadForm(formName){
        switch(formName){
            case 'startForm':
                return import(/* webpackChunkName: "StartForm" */ "../components/StartForm");
                break;
            case 'middleForm':
                return import(/* webpackChunkName: "MiddleForm" */ "../components/MiddleForm");
                break;
            case 'endForm':
                return import(/* webpackChunkName: "EndForm" */ "../components/EndForm");
                break;
            default:
                return Promise.reject('Unknown form name');
                break;
        }
    }

    static goToForm(formName, event){
        if(!this.props) return null;

        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.props.dispatch(actions.setActiveForm({activeForm: formName, [this.props.activeForm]: values}));
            }
        });
    }
}