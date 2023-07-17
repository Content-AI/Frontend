import { configureStore } from '@reduxjs/toolkit'
import AuthenticationToken from '../features/AuthenticationToken'
import ThreeSteps from '../features/ThreeSteps'
import Fullprofile from '../features/Fullprofile'
import BlurBgNavBar from '../features/BlurBg'
import HideShowNavBarGlobalState from '../features/HideShowNavBarGlobalState'
import LoadingScreen from '../features/LoadingScreen'
import LoadingScreenMessage from '../features/LoadingScreenMessage'
import EditorText from '../features/EditorText'
import CopiedText from '../features/CopiedText'
import LeftTemplateId from '../features/LeftTemplateId'
import LengthOfEditorWord from '../features/LengthOfEditorWord'
import ProjectOrFolderIdChoosen from '../features/ProjectOrFolderIdChoosen'
import DocumentsData from '../features/DocumentsData'
import FolderData from '../features/FolderData'

export const store = configureStore({
    reducer: {
        SetAuthenticationToken: AuthenticationToken,
        SetThreeSteps: ThreeSteps,
        SetFullProfile:Fullprofile,
        SetBlurBgNavBar:BlurBgNavBar,
        SetHideShowNavBarGlobalState:HideShowNavBarGlobalState,
        SetLoadingScreen:LoadingScreen,
        SetLoadingScreenMessage:LoadingScreenMessage,
        SetEditorText:EditorText,
        SetCopiedText:CopiedText,
        SetLeftTemplateId:LeftTemplateId,
        SetLengthOfEditorWord:LengthOfEditorWord,
        SetProjectOrFolderIdChoosen:ProjectOrFolderIdChoosen,
        SetDocumentsData:DocumentsData,
        SetFolderData:FolderData,
    }
})

