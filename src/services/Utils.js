export default class Utils {
    static loadForm(formName){
        console.log(">>>", formName)

        const path = "../components/startForm";

        const config = {
            startForm: require("../components/startForm")
        };

        return new Promise(resolve => {
            require.ensure([], () => {
                const form = config.startForm();

                console.log("form", form)

                resolve(form);
            });
        })
    }
}