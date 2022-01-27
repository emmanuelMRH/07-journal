
// export const myMutation = ( state ) => {
    
// }

export const setEntries = ( state, entries ) => {
    state.entries = [...state.entries, ...entries]
    state.isLoading = false
}

export const updateEntry = ( state, entry ) => {
    state.isLoading = true
    const idx = state.entries.map(e => e.id).indexOf( entry.id )
    state.entries[idx] = entry
    state.isLoading = false
}

export const addEntry = ( state, newEntry ) => {
    state.isLoading = true
    state.entries = [ newEntry, ...state.entries ]
    state.isLoading = false
}

export const deleteEntry = ( state, id ) => {
    const idx = state.entries.map(e => e.id).indexOf( id )
    state.entries.splice(idx, 1)
}

