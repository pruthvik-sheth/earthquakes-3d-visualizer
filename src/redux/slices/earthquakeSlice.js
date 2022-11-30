import { createSlice } from "@reduxjs/toolkit";

export const earthquakeSlice = createSlice({
    name: 'earthquake',

    initialState: {
        pastHour: [],
        past30Days: [],
        current: 'PAST30DAYS'
    },

    reducers: {
        setPastHour: (state, action) => {
            return {
                ...state,
                pastHour: [...state.pastHour, action.payload]
            }
        },
        setPast30days: (state, action) => {
            return {
                ...state,
                past30Days: [...state.past30Days, action.payload]
            }
        },
        setCurrent: (state, action) => {
            return {
                ...state,
                current: action.payload
            }
        }

    }
})

export const { setPastHour, setPast30days, setCurrent } = earthquakeSlice.actions

export default earthquakeSlice.reducer