
  <script>
  import { Icon } from 'tdesign-icons-vue';
  
  export default {
    components: {
      Icon,
    },
    data() {
      return {

        iconUrl: 'https://tdesign.gtimg.com/site/baseLogo-light.png',
      };
    },
    methods: {
      changeHandler(active) {
        console.log('change', active);
      },
      changeCollapsed() {
        this.collapsed = !this.collapsed;
        this.iconUrl = this.collapsed
          ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png'
          : 'https://tdesign.gtimg.com/site/baseLogo-light.png';
      },
    },
  };
  </script>
  