import { actions } from "./Actions"


export const reducer = (state,action)=>{
    switch (action.type){
        case actions.GET_EVENTS:{
            const {events} = action.payload
            console.log(events)
            const {data,page,totalPages} = events
            return {...state, events:{...state.events,data,page,totalPages,loading:false}}
        }
        default:{
            throw new Error(`No such action as ${action.type}`)
        }
    }

}
