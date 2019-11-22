/**
 * Created by Allen Liu on 2019/11/22.
 */
export default [
    {
        name:'demo1Plugin',
        path: 'demo1Plugin',
        component: () => import(/* webpackChunkName: "portal/chunk/demo1Plugin" */'../views/demo1Plugin/index.vue')
    }
]