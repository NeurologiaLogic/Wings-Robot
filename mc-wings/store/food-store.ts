// import { Audio } from 'expo-av';
import { create } from 'zustand';
import { Food } from '../types/food';

type FoodState = {
  food: Food[];
  incrementCount: (id: number) => void;
  decrementCount: (id: number) => void;
  getProductInCartCount : () => number,
  getProductInCart : () => Food[],
  getProductById:(id:number) => Food|null
  removeAllProductFromCart:()=>void,
  removeProductFromCart:(id:number) => void
};
// product pertama : 010282006F000001000;010182006F000001;010131006A00000101
// product kedua     : 0102820070000001000;0101820070000001;010131006A01000101
// product ketiga     : 0102820071000001000;0101820071000001;010131006A02000101
export const useFoodStore = create<FoodState>((set, get) => ({
  food: [
    {
      id:1,
      image:"https://stevor.co.id/storage/products/1682557365-1e1c261d-aeca-487e-9109-f7e5acdeb639.png",
      name:"Mie Sedap Soto",
      price:"4000",
      address:"010282006F000001000",
      callback_address:"010182006F000001",
      count:3
    },
    {
      id:2,
      image:"https://tumbasembako.com/asset/foto_produk/mie_sedap_goreng1.jpg",
      name:"Mi Sedap Goreng",
      address:"0102820070000001000",
      callback_address:"0101820070000001",
      price:"5000",
      count:2
    },
    {
      id:3,
      image:"https://batammall.co.id/img/76164250-mie_sedap_mie_sedaap_korean_spicy_chicken_full01.jpg",
      name:"Mie Sedap Korean Spicy Chiken",
      address:"0102820071000001000",
      callback_address:"0101820071000001",
      price:"4000",
      count:3
    },
    // {
    //   id:4,
    //   image:"https://s3.belanjapasti.com/media/image/sedaap-mie-mie-instant-baso-cup-7277g-49963.png",
    //   name:"Mie Sedap Bakso Spesial",
    //   price:"4000",
    //   count:1
    // },
    // {
    //   id:5,
    //   image:"https://foodbuy-id.s3.ap-southeast-3.amazonaws.com/products/primary/400/1691975403_64d97eebc0c79_258.png",
    //   name:"Mie Sedap Rawit Ringgit",
    //   price:"4000",
    //   count:1
    // }
    // ,
    // {
    //   id:6,
    //   image:"https://foodbuy-id.s3.ap-southeast-3.amazonaws.com/products/primary/400/1691975403_64d97eebc0c79_258.png",
    //   name:"Mie Sedap Rawit Ringgit",
    //   price:"4000",
    //   count:1
    // }
    // ,
    // {
    //   id:7,
    //   image:"https://foodbuy-id.s3.ap-southeast-3.amazonaws.com/products/primary/400/1691975403_64d97eebc0c79_258.png",
    //   name:"Mie Sedap Rawit Ringgit",
    //   price:"4000",
    //   count:1
    // },
    // {
    //   id:8,
    //   image:"https://foodbuy-id.s3.ap-southeast-3.amazonaws.com/products/primary/400/1691975403_64d97eebc0c79_258.png",
    //   name:"Mie Sedap Rawit Ringgit",
    //   price:"4000",
    //   count:1
    // }
    // ,{
    //   id:9,
    //   image:"https://foodbuy-id.s3.ap-southeast-3.amazonaws.com/products/primary/400/1691975403_64d97eebc0c79_258.png",
    //   name:"Mie Sedap Rawit Ringgit",
    //   price:"4000",
    //   count:1
    // }
  ],
  incrementCount: (id) => {
    set((state) => {
      const updatedFood = state.food.map((item) => {
        if (item.id === id) {
          return { ...item, count: (item.count || 0) + 1 }; // Increment count
        }
        return item;
      });
      return { food: updatedFood };
    });
  },
  decrementCount: (id) => {
    set((state) => {
      const updatedFood = state.food.map((item) => {
        if (item.id === id && item.count && item.count > 0) {
          if(item.count>0){
            return { ...item, count: item.count - 1 }; // Decrement count if it's greater 0
          }
        }
        return item;
      });
      return { food: updatedFood };
    });
  },
  removeAllProductFromCart:()=>{
    set((state) => {
      const updatedFood = state.food.map((item) => {
        return { ...item, count: 0 }; // Remove item from cart
      });
      return { food: updatedFood };
    });
  },
  removeProductFromCart:(id:number) =>{
    set((state) => {
      const updatedFood = state.food.map((item) => {
        if (item.id === id) {
          return { ...item, count: 0 }; // Remove item from cart
        }
        return item;
      });
      return { food: updatedFood };
    });
  },
  getProductInCartCount: () => {
      const cart = get().food; // Assuming `food` is the array representing the cart
      let totalCount = 0;
      cart.forEach(item => {
          if (item.count > 0) {
              totalCount += item.count;
          }
      });
      return totalCount;
  },
  getProductInCart:()=>{
    return get().food.filter(item=>item.count>0)
  },
  getProductById: (id: number) => {
    get().food.map(item=>{
      console.log(item.id)
    })
    const foodItem = get().food.find(item => item.id === id);
    return foodItem || null;
  }
}));

