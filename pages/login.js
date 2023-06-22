import { useCallback, useEffect, useState } from 'react'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'
import Navbar from '../components/Navbar'
import { useUser } from '@auth0/nextjs-auth0/client'


export default function LoginPage()
{
  return (
    <>
      <Navbar />
      <div className='container flex mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-8'>
        <div className='flex-1 flex flex-col justify-center'>
          <h1 className='text-6xl leading-snug text-teal-600'>Track your Money, Anytime Anywhere with MTracker</h1>
          <p className='text-gray-400 mt-2'>Take Control of Your Finances and Achieve Your Financial Goals</p>
          <div id='buttons' className='mt-4'>
            <PrimaryButton href='/api/auth/login'>Login</PrimaryButton>
            <SecondaryButton>Learn More</SecondaryButton>
          </div>
        </div>
        <div className='flex-1'>
          <img src='/images/image.jpg' alt='hero-image' className=''></img>
        </div>
      </div>
    </>
  )
}