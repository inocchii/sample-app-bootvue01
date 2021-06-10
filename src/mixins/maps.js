// note用
export default {
  /*
  created() {
    console.log("start maps.js from mixins. OUR_MAP=" + this.OUR_MAP);
  },
  */
  data() {
    return {
      OUR_MAP: "this is map list",
      OUR_MAP_PATH: "/articledtl?catg=Map",
      OUR_MAPS: [
        {
          id: 'kibana',
          latLng: {lat: 31.82706, lng: 131.42872},
          name: 'お家',
          info: 'お家',
          tags: 'home miyazaki kibana',
        },
        {
          id: 'aoshima',
          latLng: {lat: 31.80490, lng: 131.47488},
          name: '青島神社',
          info: '青島神社',
          tags: 'shrine miyazaki aoshima',
        },
        {
          id: 'aoshima monoral',
          latLng: {lat: 31.80090, lng: 131.46785},
          name: '青島モノラル',
          info: '青島モノラル',
          tags: 'cafe miyazaki aoshima',
        },
        {
          id: 'aoshima coffee',
          latLng: {lat: 31.80257, lng: 131.46775},
          name: 'AOSHIMA COFFEE',
          info: 'AOSHIMA COFFEE',
          tags: 'cafe miyazaki aoshima',
        },

      ],
    };
  },
};
