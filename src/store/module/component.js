
import config from "../../config";
import {isUrl} from "../../libs/tools";
export default {
    state: {
        componentData: '',
    },
    mutations: {
        setComponent(state, data) {
            data.forEach(item => {
                item.date = item.date.slice(0, 10);
                item.img_url = isUrl(item.img_url)?item.img_url:config.url+ item.img_url;
                item.show_url = isUrl(item.show_url)?item.show_url:config.show_url+ item.show_url
                item.source_url = isUrl(item.source_url)?item.source_url:config.source_url+ item.source_url
            });
            state.componentData = data;
        }
    },
    getters: {

    },
    actions: {

    }
}
