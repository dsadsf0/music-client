import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PathState {
  prevPath: string[];
  nextPath: string[];
}

const initState: PathState = {
  prevPath: [],
  nextPath: [],
}

export const pathSlice = createSlice({
  name: 'path',
  initialState: initState,
  reducers: {
    pushPrev(state, action: PayloadAction<string>) {
      if (!state.prevPath.length || state.prevPath[state.prevPath.length - 1] !== action.payload) 
        state.prevPath.push(action.payload)
    },
    pushNext(state, action: PayloadAction<string>) {
      if (!state.nextPath.length || state.nextPath[state.prevPath.length - 1] !== action.payload)
        state.nextPath.push(action.payload)
    },
    popPrev(state) {
      state.prevPath.pop()
    },
    popNext(state) {
      state.nextPath.pop()
    },
    clearNext(state) {
      state.nextPath = []
    },
    clearPrev(state) {
      state.prevPath = []
    }
  }
})

export default pathSlice.reducer;