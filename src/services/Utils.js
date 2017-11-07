export default class Utils {
    static loadForm(formName){
        switch(formName){
            case 'startForm':
                return import(/* webpackChunkName: "startForm" */ "../components/startForm");
                break;
            default:
                return Promise.reject('Unknowm form name');
                break;
        }
    }
}