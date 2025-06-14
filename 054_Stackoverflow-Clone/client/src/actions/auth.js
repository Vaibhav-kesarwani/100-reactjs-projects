import * as api from '../api'
import {setCurrentUser} from './currentuser'

export const signup=(authData,navigate)=> async (dispatch) =>{
    try{
        const {data}=await api.signUP(authData)
        dispatch({type:'AUTH',data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    }catch(error){
        console.log(error)
    }

}
export const login=(authData,navigate)=> async (dispatch) =>{
    try{
        const {data}=await api.logIn(authData)
        dispatch({type:'AUTH',data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    }catch(error){
        console.log(error)
    }

}