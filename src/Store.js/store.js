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
import bike from '../images/bike.png'
import cap from '../images/cap.png'

const categories = [
    {n: "CARS FOR SALE", i: car},
    {n: "PERFORMANCE CARS", i: perf},
    {n: "MOTORBIKES", i: bike},
    {n: "WHEELS", i: wheel},
    {n: "TYRES", i: tyres},
    {n: "PARTS", i: parts},
    {n: "GARAGES", i: garage},
    {n: "PAINT/BODY SHOP", i: paint},
    {n: "WRAP SHOPS", i: wrap},
    {n: "ACCESSORIES", i: acc},
    {n: "BATTERIES", i: batt},
    {n: "APPAREL", i: cap}
]



const cSlice = createSlice({
    name: "client",
    initialState: { globalProducts: [], userProducts: [], userId: "", searchTerm: "", isLoggedIn: false, orders: [],
     globalEvents: [], userEvents: [] , categories: categories, events: [], 
     currentChat: {seller: "", buyer: "", messages: []}, chats: []
    },
    reducers: {
        set_chats(state, action){
            state.chats = [...new Set(action.payload)]
        },
        add_message(state, action){
            state.currentChat.messages.push(action.payload)
        },
        set_curr_chat(state, action){
            state.currentChat = action.payload
        },
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
    fetch_events,
    set_curr_chat,
    set_chats,
    add_message
 } = cSlice.actions;

let clientSlice = cSlice.reducer

const reducer = combineReducers({ clientSlice });

const store = configureStore({reducer});

export default store;
