import { useParams } from 'react-router-dom';
import { useFoodStore } from '../../../store/food-store';
import { Food } from '../../../types/food';
import { useEffect, useState } from 'react';

export default function ChooseToppingsById() {
 let params = useParams();
 const [food,setFood] = useState<Food|null>(null);
 const getFoodById  = useFoodStore(state=>state.getFoodById)
 useEffect(()=>{
  const findFood = getFoodById(params.id)
  setFood(findFood)
  console.log(params.id)
  console.log(findFood)
 },[])
 if(food==null){
  return <div>Food Not Exist</div>
 }
 return (
    <div>{params.id}</div>
  )
}
