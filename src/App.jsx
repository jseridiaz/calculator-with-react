import './App.css'
import { createContext } from 'react'
import Timer from './componentes/Timer/Timer'
import Calculator from './componentes/Calculator/Calculator'
import { useWindowResize } from './componentes/CustomHooks/useWindowResize/useWindowResize'

export const SizeContext = createContext()

function App() {
  const { widthWindow, heightWindow } = useWindowResize()

  return (
    <>
      <SizeContext.Provider value={{ widthWindow, heightWindow }}>
        <main id='main' className='flex-container-column'>
          <div className='none' id='resizing'>
            {widthWindow} {heightWindow}
          </div>
          <Timer />
          <Calculator />
        </main>
      </SizeContext.Provider>
    </>
  )
}

export default App
