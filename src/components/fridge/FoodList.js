import { React, useState, useEffect } from "react";
//firebase
import { db } from "../../firebase";
import { getDocs, collection } from "@firebase/firestore";
//foodCard
import FoodCard from "./FoodCard";
//moment
import moment from "moment";
import { useStateValue } from "../../StateProvider";

export default function FoodList() {
  const [fridge, setFridge] = useState([]);
  const user = localStorage.getItem("userUid");
  const userFoodRef = collection(db, "users", `${user}`, "fridge");

  //冷藏or冷凍
  function isFrozen(ice) {
    if (ice === true) {
      return "冷凍中";
    } else {
      return "冷藏中";
    }
  }

  //read firebase
  useEffect(() => {
    async function readData() {
      const querySnapshot = await getDocs(userFoodRef);
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({
          id: doc.id,
          name: doc.data().name,
          quantity: doc.data().quantity,
          unit: doc.data().unit,
          isFrozen: isFrozen(doc.data().isFrozen),
          imageURL: doc.data().imageURL,
          endDate: moment(doc.data().endDate.seconds * 1000).format(
            "YYYY/MM/DD"
          ),
        });
      });
      console.log(temp);
      setFridge([...temp]);
    }
    readData();
  }, [db]);

  console.log(fridge);

  return (
    <div>
      <FoodCard />
    </div>
  );
}
