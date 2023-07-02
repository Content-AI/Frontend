import { configureStore } from '@reduxjs/toolkit'
import AuthenticationToken from '../features/AuthenticationToken'
import ThreeSteps from '../features/ThreeSteps'
import Fullprofile from '../features/Fullprofile'
import BlurBgNavBar from '../features/BlurBg'
import HideShowNavBarGlobalState from '../features/HideShowNavBarGlobalState'
import LoadingScreen from '../features/LoadingScreen'

export const store = configureStore({
    reducer: {
        SetAuthenticationToken: AuthenticationToken,
        SetThreeSteps: ThreeSteps,
        SetFullProfile:Fullprofile,
        SetBlurBgNavBar:BlurBgNavBar,
        SetHideShowNavBarGlobalState:HideShowNavBarGlobalState,
        SetLoadingScreen:LoadingScreen,
    }
})

