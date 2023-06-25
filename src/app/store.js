import { configureStore } from '@reduxjs/toolkit'
import AuthenticationToken from '../features/AuthenticationToken'
import ThreeSteps from '../features/ThreeSteps'
import Fullprofile from '../features/Fullprofile'
export const store = configureStore({
    reducer: {
        SetAuthenticationToken: AuthenticationToken,
        SetThreeSteps: ThreeSteps,
        SetFullProfile:Fullprofile,
    }
})

