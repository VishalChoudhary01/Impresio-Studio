const BASE_URL="http://localhost:3001"

export const getPhotographers=async(params)=>{
    const query=new URLSearchParams(params).toString();
    const res=await fetch(`${BASE_URL}`)
}