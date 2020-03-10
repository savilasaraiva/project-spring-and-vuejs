import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2D5269',
        secondary: '#348ECA',
        accent: '#82B1FF',
        error: '#F0656B',
        info: '#2196F3',
        success: '#00ABA4',
        warning: '#ff9800',
        blue_gray: '#78909C'
      }
    },
  },
    lang: {
      locales: { pt },
      current: 'pt',
    },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
});
