import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from "@mui/material/Button"
import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Layout from './components/Layout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Login from './pages/Login'
const  router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}></Route>
      <Route path="/cart" index element={<Cart/>}/>
      <Route path="/login" index element={<Login/>}/>
    </Route>,
    
  )
)
function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
