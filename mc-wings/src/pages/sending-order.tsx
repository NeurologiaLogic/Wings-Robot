import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import machine_hand from "../assets/mahine_hand.jpg";
import { useEffect, useRef, useState } from "react";
import { useFoodStore } from "../../store/food-store";
import { Food } from "../../types/food";

enum RobotStatus {
  idle = 0,
  cooking = 1,
  error = 2
}

type Finish = {
  batch:number,
  status:string,
  food:Food[]
}

type Batch = {
  food:Food[]
}
type JSON = {
  orderId:number,
  data:Finish[]
}

export default function SendingOrder() {
  const navigate = useNavigate();
  const getProductFromCart = useFoodStore((state) => state.getProductInCart);
  const removeAllProductFromCart = useFoodStore((state) => state.removeAllProductFromCart);
  const [isFinished, setAllOrderFinished] = useState<boolean>(false);
  
  const processing = useRef<Food[]>([]);
  const finish = useRef<Finish[]>([]);
  const batch = useRef<number>(0);
  const isMounted = useRef<boolean>(false); // Ref to track component mount status
  const mockServerResponse = [0, 1, 2];
  const MAX_PROCESS_PER_BATCH = 3;


  const HEADER_REQUEST = "80020000006400000000"

  const getServerResponse = (currentBatch: Batch): RobotStatus => {
    // Status Robot
    // return : RobotStatus
    const _strStatusRobot:string = "0101820079000001"
    // Conveyor
    // return : number
    const _strCheckConveyor:string = "0101820078000001"
    //! checking conveyor status
    //! if conveyor is empty then send the process to the server
    //! don't forget to append the HEADER_REQUEST
    //! change the conveyorStatus
    const conveyorAddress:string = HEADER_REQUEST+_strCheckConveyor;
    const conveyorStatus:number = Math.floor(Math.random() * 3);
    if(conveyorStatus!=0){
      return RobotStatus.cooking
    }
    
    //! checking robot status
    //! don't forget to append the HEADER_REQUEST
    //! change the robotStatus
    const robotAddress:string = HEADER_REQUEST+_strStatusRobot;
    const robotStatus = Math.floor(Math.random() * 3);
    console.log("robot status", robotStatus);
    return robotStatus;
  }

  const processOrderBasedOnResponse = (response: RobotStatus) => {
    switch (response) {
      case RobotStatus.idle:

        //! send the products first
        //! don't forget to append the HEADER_REQUEST
        //! write here
        for(const process of processing.current){
          const foodAddress = HEADER_REQUEST+process.address+process.count
          const foodCallbackAddress = HEADER_REQUEST+process.callback_address
          //! check if the foodCallBackAddress doesnt return the same value as the total food count
          console.log("foodAddress",foodAddress)
          console.log("foodCallbackAddress",foodCallbackAddress)
        }

        // Diakhir kita akan mengirimkan data ke server
        // return : 

        const _strStartProcess:string = "010231006402000101"
        // !sending start process to the server
        //! don't forget to append the HEADER_REQUEST
        //! send the request
        const startProcess = HEADER_REQUEST+_strStartProcess

        finish.current = [...finish.current, { batch: batch.current, status: "success", food: processing.current }];
        batch.current += 1;
        console.log("RobotStatus.idle")
        break;
      case RobotStatus.cooking:
        console.log("RobotStatus.cooking")
        break;
      case RobotStatus.error:
        finish.current = [...finish.current, { batch: batch.current, status: "failed", food: processing.current }];
        batch.current += 1;
        console.log("RobotStatus.error")
        break;
    }
  };

  const saveAllFinishedOrderToLocalStorage = () => {
    const finishedOrders: JSON[] = JSON.parse(localStorage.getItem("finished-orders") || "[]");
    const nextId = finishedOrders.length + 1;
    localStorage.setItem("finished-orders", JSON.stringify([...finishedOrders, { ...finish.current, id: nextId }]));
    const data = JSON.parse(localStorage.getItem("finished-orders") || "[]");
    console.log("data", data);
  }

  const processingProductQueuesAsBatches = (queue: Food[]): Batch[] => {
    const queuePipeLine: Batch[] = [];
    const data: Food[] = [];
    queue.forEach((item) => {
      for (let i = 0; i < item.count; i++) {
        data.push(item);
      }
    });

    for (let i = 0; i < data.length; i += MAX_PROCESS_PER_BATCH) {
      queuePipeLine.push({ food: data.slice(i, i + MAX_PROCESS_PER_BATCH) });
    }

    const finalGroupPipelineByVariant = queuePipeLine.map((items) => {
      const groupedById: { [id: number]: Food } = {};
      items.food.forEach((item) => {
        if (groupedById[item.id]) {
          groupedById[item.id].count += 1; // Increment count
        } else {
          groupedById[item.id] = { ...item, count: 1 };
        }
      });
      return { food: Object.values(groupedById) }; // Convert object values back to array
    });
    return finalGroupPipelineByVariant;
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true; // Set the flag to true after the first render
      return; // Exit early to prevent further execution
    }

    const fetchDataAndProcessOrder = async () => {
      const queue = await getProductFromCart();
      const queuePipeLine = await processingProductQueuesAsBatches(queue);
      console.log("queuePipeLine",queuePipeLine);

      while (batch.current < queuePipeLine.length) {
        processing.current = await queuePipeLine[batch.current].food;
        const response = await new Promise<RobotStatus>((resolve) => {
          setTimeout(() => {
            resolve(getServerResponse(queuePipeLine[batch.current]));
          }, 5000); // Simulate server response delay
        });
        await processOrderBasedOnResponse(response);
      }

      if (batch.current >= queuePipeLine.length) {
        saveAllFinishedOrderToLocalStorage();
        removeAllProductFromCart();
        setAllOrderFinished(true);
      }
    };

    fetchDataAndProcessOrder();
  }, [getProductFromCart]);

  return (
    <div className="h-screen relative bg-[#bc1c2c] w-full overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <img src={logo} alt="Logo" className="w-36 mx-auto" />
        <img src={machine_hand} alt="Machine Hand" className="mt-4" />
        <h3 className="font-semibold text-2xl max-w-sm">Your order will be sent to the kitchen after you’ve completed the payment.</h3>
      </div>
      <div className="flex flex-col gap-2 fixed bottom-20 left-0 w-full z-20 p-10">
        <div className="order-option flex gap-2 ">
          {/* <button className="bg-gray-300 text-black p-2 flex-1 rounded-md" onClick={()=>navigate("/select-flavour-page")}>Cancel Order</button> */}
          {isFinished && (
            <p className="bg-[#24a4a4] text-center text-white p-2 flex-1" onClick={() => navigate("/")}>
              Pick Up Your Order
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
