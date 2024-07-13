import { ProductModel } from "../../../_model/Product";

export const productState: ProductModel = {
    list: [],
    errormessage: '',
    editdata:{
        id: "",
        title: "",
        description: "",
        category: "",
        price: "",
        rating: "",
        availabilityStatus: "",
    }
} 