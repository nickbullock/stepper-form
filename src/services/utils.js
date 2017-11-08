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

    static goToForm(formName, skipValidate, event){
        if(!this.props) return null;

        console.log('ARG', this.props)
        
        const save = (values) => {
            this.props.dispatch(actions.setActiveForm({activeForm: formName}));
            console.log("TO STORAGE", this.props.activeForm, values)
            localStorage.setItem(this.props.activeForm, JSON.stringify(values));
        };
        
        if(!skipValidate){
            this.props.form.validateFields((err, values) => {
                if(!err){
                    save(values);
                }
            });
        }
        else{
            save(this.props.form.getFieldsValue());
        }
    }

    static getInitialValues() {
        return JSON.parse(localStorage.getItem(this.props.activeForm)) || {};
    }
}