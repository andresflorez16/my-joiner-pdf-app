import { useState } from "react"
import { joiner } from "../../api"
import toast, { Toaster } from 'react-hot-toast'

const Button = ({ files }) => {
  const [msg, setMsg] = useState('')

  const onSubmit = async () => {
    if (files.length === 0) {
      setMsg('Por favor agregue PDFs para unir.')
      return
    }

    const data = await joiner({ files })
    if (data.code !== 200) {
      setMsg(data.message || 'Error al unir los PDFs')
      return
    }

    toast.success('¡PDFs unidos!')

    const link = document.createElement('a')
    link.href = `data:application/pdf;base64,${data.base64}`
    link.download = 'joined.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <button
        className="overflow-hidden transition-transform hover:scale-90 w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
        onClick={onSubmit}
        onBlur={() => setMsg('')}
      >
        ¿Listo?
        <span
          className="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
        ></span>
        <span
          className="absolute w-36 h-32 -top-8 -left-2 bg-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
        ></span>
        <span
          className="absolute w-36 h-32 -top-8 -left-2 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
        ></span>
        <span
          className="group-hover:opacity-100 text-center mx-auto group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
        >Une!</span>
      </button>
      <p>{msg}</p>
    </>
  )
}

export default Button