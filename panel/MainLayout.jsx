"use client"
import { store } from '@/app/store/store'
import React from 'react'
import { Provider } from 'react-redux'

export default function MainLayout({children}) {
  return (
    <Provider store = {store}>
        {children}
    </Provider>
  )
}
