import Axios from '../plugins/axios'

export function getSearchResult(keyword) {
  return Axios
    .get('/tomcat/search', {params: {keyword}})
    .then(({data}) => data)
    .catch(err => ({err}))
}

export function getDatafromKG({name, view="graph", entity="BuildingComplex", query_layer=0}) {
    return Axios
    .get("/tomcat/GeoKG/building", {params: {name, view, entity, query_layer}})
    .then(({data}) => data)
    .catch(err => ({err}))
  }

export function getMapData() {
    return Axios
    .get('/api/getMapPoint')
    .then(({data}) => data)
    .catch(err => ({err}))
}