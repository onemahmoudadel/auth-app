import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface FormErrorProps {
  message?:string | null
}


export const FormError = ({message}:FormErrorProps) => {
  if(!message) return null
  return (
    <div className='bg-destructive/15 p-4 rounded-md flex items-center gap-2 text-sm text-destructive'>
      <ExclamationTriangleIcon className='size-4' />
      <p>{message}</p>
    </div>
  )
}
