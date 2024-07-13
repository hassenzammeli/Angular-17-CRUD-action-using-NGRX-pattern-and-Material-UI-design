export interface Product{
    id: string;
    title: string;
    description: string;
    category: string;
    price: string;
    rating: string;
    availabilityStatus: string;
}
export interface ProductModel{
    list:Product[],
    errormessage:string,
    editdata:Product
}