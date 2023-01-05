import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit"

import wheel from '../images/wheel.png'
import car from '../images/car.png'
import parts from '../images/parts.png'
import garage from '../images/garage.png'
import paint from '../images/paint.png'
import tyres from '../images/Tyres.png'
import acc from '../images/acc.png'
import wrap from '../images/wrap.png'
import batt from '../images/batt.png'
import perf from '../images/perfCarsBg.png'
import api2 from "../apis/api2"

const categories = [
    {n: "CARS FOR SALE", i: car},
    {n: "WHEELS", i: wheel},
    {n: "TYRES", i: tyres},
    {n: "PARTS", i: parts},
    {n: "GARAGES", i: garage},
    {n: "PAINT/BODY SHOP", i: paint},
    {n: "WRAP SHOPS", i: wrap},
    {n: "ACCESSORIES", i: acc},
    {n: "BATTERIES", i: batt},
    {n: "PERFORMANCE CARS", i: perf}
]



const cSlice = createSlice({
    name: "client",
    initialState: { globalProducts: [], userProducts: [], userId: "", searchTerm: "", isLoggedIn: false, orders: [],
     globalEvents: [], userEvents: [] , categories: categories, events: []
    },
    reducers: {
        fetch_events(state, action){
            state.events = [...new Set(action.payload)]
        },
        log_out(state, action){
            state.isLoggedIn = action.payload
        },
        set_global_events(state, action){
            state.globalEvents = [...new Set(action.payload)]
        },
        set_user_events(state, action){
            state.userEvents = [...new Set(action.payload)]
        },
        log_in(state, action){
            // check id from localstorage
            
            state.isLoggedIn = true;
        },
        set_term(state, action) {
            state.searchTerm = action.payload;
        },
        add_to_user_products(state, action){
            state.userProducts = [...new Set(action.payload)];
        },
        add_to_global_products(state, action){
            state.globalProducts = [...new Set(action.payload)]
        },
        set_filters(state, action){
            state.filters = [...new Set(action.payload)]
        }
    }
})

export const { 
    add_to_global_products,
    add_to_user_products,
    set_term,
    log_in,
    set_global_events, 
    set_user_events,
    log_out,
    fetch_events
 } = cSlice.actions;

let clientSlice = cSlice.reducer

const reducer = combineReducers({ clientSlice });

const store = configureStore({reducer});

export default store;
