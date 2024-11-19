import { Moked } from "../../models/moked.model";
import { User } from "../../models/user.model";
import { createSlice } from '@reduxjs/toolkit'

class UserSliceModel {
    user!: User
    moked!: Moked[]
}

const initValue: UserSliceModel = {
    user: new User(),
    moked: []
}

const UserSlice = createSlice({
    name: 'user',
    initialState: initValue,
    reducers: {
        insertUser: (state, action) => {
            let statemy = { ...state };
            statemy.user = action.payload.userCurrent
            state = statemy
        }
    }
})


export const { insertUser } = UserSlice.actions
export default UserSlice.reducer