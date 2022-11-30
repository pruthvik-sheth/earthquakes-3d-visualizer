

import { configureStore } from "@reduxjs/toolkit";
import earthquakeSlice from "../slices/earthquakeSlice";


export default configureStore({
    reducer: {
        earthquakes: earthquakeSlice
    },
})