import { createReducer, on } from "@ngrx/store";
import { productState } from "./Product.State";
import { deleteProductSuccess, getProductSuccess, loadProductFail, loadProductSuccess } from "./Product.Actions";
import { state } from "@angular/animations";

const _ProductReducer = createReducer(productState,
    on(loadProductSuccess, (state, action) => {
        return {
            ...state,
            list: action.list,
            errormessage: '',
            editdata:{
                id: "",
                title: "",
                description: "",
                category: "",
                stock: "",
                price: "",
                rating: "",
                availabilityStatus: "",
            }
        }
    }),
    on(getProductSuccess, (state, action) => {
        return {
            ...state,
            errormessage: '',
            editdata:action.obj
        }
    }),
    on(loadProductFail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(deleteProductSuccess, (state, action) => {
        let _newdata=state.list.filter(o=>o.id!=action.id);
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    })

)

export function ProductReducer(state: any, action: any) {
    return _ProductReducer(state, action)
}