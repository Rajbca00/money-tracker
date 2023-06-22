import styles from './Button.module.css'

export function PrimaryButton(props){
  return <a href='/' type='button' className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' {...props}/>
}

export function SecondaryButton(props){
  return <a href='/' type='button' className='bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mx-4' {...props}/>
}
