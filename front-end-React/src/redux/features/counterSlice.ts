
import { createSlice } from '@reduxjs/toolkit'
//איתחול מחלקה בחנות
const initialValue={
    counter:100,
    date:new Date()
}

//יצירת מחלקה בתוך החנות
//יצירת סלייס-slice
const counterSlice=createSlice({
    //שם של מחלקה
    name:'counter',
    //איתחול המחלקה במבנה שלה
    initialState:initialValue,
    //רשימת הפונקציה לעדכון המחלקה
    reducers:{
         add1:(state)=>{
            state.counter++  
         } ,
         addNumber:(state,action) =>{
          state.counter+= action.payload.counterValue
         }
    }
})
//{reducer,action}
//לייצא את הפונקציה לעדכון המחלקה
export const {add1,addNumber}=counterSlice.actions
export default counterSlice.reducer