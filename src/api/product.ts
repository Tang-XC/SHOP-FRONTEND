import request,{ResponseData} from "./request"
export function getProductList(params?:any):Promise<ResponseData> {
  return request({
    url: "/products",
    method: "get",
    params
  })
}
export function createProduct(data:any):Promise<ResponseData>{
  return request({
    url:"/product",
    method:"post",
    data,
  })
}
