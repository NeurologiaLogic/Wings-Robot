import { Food } from "../../types/food";

export const calculatePrice = (foods:Food[]) =>{
    let price = 0;
    foods.forEach((food) => {
      price += parseFloat(food.price) * food.count;
    });
    const formattedPrice = price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formattedPrice;
}