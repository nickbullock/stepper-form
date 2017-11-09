export default class Utils {
    static loadForm(formName) {
        //load form chunk by it's name
        //use switch here because webpack can't do fully dynamic import
        //like import(foo)
        switch (formName) {
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
                return Promise.reject(`[Utils.loadForm] unknown form name ${formName}`);
                break;
        }
    }
}