import axios from 'axios';

export default {
  state: {
    packages: [],
    singlePack: [],
    rawPackages: [],
    query: '',
    pagination: {
      perPage: 5,
      page: 1,
      totalPages: 1,
    },
    alertMessage: '',
    isLoading: false,
    herokuCors: 'https://aqueous-taiga-02610.herokuapp.com/'
  },
  mutations: {
    SET_IS_LOADING (state, load) {
      state.isLoading = load;
    },
    SET_TABLE_PACKAGE (state, pack) {
      let formatedPackcage = {
        'name': pack.name,
        'latest version': pack['dist-tags'].latest,
        'description': pack.description,
      }
      state.packages.push(formatedPackcage)
    },
    SET_EMPTY_TABLE_PACKAGE (state) {
      state.packages = [];
    },
    SET_PAGINATION (state, pagination) {
      state.pagination = pagination;
    },
    SET_CURENT_PAGE (state, page) {
      state.pagination.page = page;
    },
    SET_TOTAL_PAGES (state, pages) {
      state.pagination.totalPages = pages;
    },
    SET_RAW_PACKAGES (state, packs) {
      state.rawPackages.push(packs);
    },
    SET_SINGEL_PACK (state, singlePack) {
      state.singlePack = [singlePack];
    },
    SET_QUERY (state, query) {
      state.query = query
    },
    SET_ALERT_MESSAGE (state, message) {
      state.alertMessage = message;

      window.setTimeout(() => {
        state.alertMessage = '';
      }, 3000)
    }
  },
  actions: {
    async findPackage ({state, commit}) {
      let dublicate = state.rawPackages.some(pack => pack.name === state.query)

      if (!dublicate && state.query) {
        try {
          commit('SET_IS_LOADING', true);
          let response = await axios.get(`${state.herokuCors}https://registry.npmjs.org/${state.query}`)
            .then(res => res.data)


          commit('SET_RAW_PACKAGES', response)
          let newTotalCount = Math.ceil(state.rawPackages.length / state.pagination.perPage);


          commit('SET_TOTAL_PAGES', newTotalCount);

          if (newTotalCount * state.pagination.perPage > state.pagination.perPage) {
            commit('SET_EMPTY_TABLE_PACKAGE')

            let max = (state.pagination.perPage * state.pagination.page) - 1;
            let min = (state.pagination.page - 1) * state.pagination.perPage;

            for (let i = min; i <= max; i++) {
              commit('SET_TABLE_PACKAGE', state.rawPackages[i])
            }
          } else {
            commit('SET_TABLE_PACKAGE', response)
          }
          commit('SET_ALERT_MESSAGE', '')
          commit('SET_IS_LOADING', false);

        } catch (e) {
          console.error(e)
          if (e.response.status === 404) {
            commit('SET_IS_LOADING', false);
            commit('SET_ALERT_MESSAGE', `Can't find package ${state.query}`)
          }
        }
      } else {
        commit('SET_ALERT_MESSAGE', 'We alredy have this package')
      }
      commit('SET_IS_LOADING', false);
    },
    setNewPage({state, commit}, payload) {
      commit('SET_EMPTY_TABLE_PACKAGE')
      commit('SET_CURENT_PAGE', payload)

      let max = (state.pagination.perPage * state.pagination.page) - 1;
      let min = (state.pagination.page - 1) * state.pagination.perPage;

      for (let i = min; i <= max; i++) {
        commit('SET_TABLE_PACKAGE', state.rawPackages[i])
      }
    },
    async setPack ({state, commit}, payload) {
      let name = state.packages[payload].name;
      let rawPack = state.rawPackages.find(pack => pack.name === name)
      let preparedPack = {};

      rawPack.name ? preparedPack.name = rawPack.name : '',
      rawPack.author ? preparedPack.author= rawPack.author.name : '',
      rawPack.bugs ? preparedPack.bugs= rawPack.bugs.url : '',
      rawPack.description ? preparedPack.description= rawPack.description : '',
      rawPack['dist-tags'] ? preparedPack.latest = rawPack['dist-tags'].latest : '',
      rawPack.homepage ? preparedPack.homepage = rawPack.homepage : '',
      rawPack.keywords ? preparedPack.keywords = rawPack.keywords.join(', ') : '',
      rawPack.license ? preparedPack.license = rawPack.license : '',


      commit('SET_SINGEL_PACK', preparedPack)
    }
  },
  getters: {
    packages: state => state.packages,
    query: state => state.query,
    alertMessage: state => state.alertMessage,
    singlePack: state => state.singlePack,
    totalPages: state => state.pagination.totalPages,
    isLoading: state => state.isLoading,
  }
}
