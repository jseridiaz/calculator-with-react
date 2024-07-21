import './App.css'
import { createContext, useContext, useEffect } from 'react'
import Timer from './componentes/Timer/Timer'
import Calculator from './componentes/Calculator/Calculator'
import { useWindowResize } from './componentes/CustomHooks/useWindowResize/useWindowResize'
import { useToggle } from './componentes/CustomHooks/useToggle/useToggle'

export const SizeContext = createContext()
export const themeContext = createContext()

function App() {
  const { widthWindow, heightWindow } = useWindowResize()
  const [toggle, setToggle] = useToggle(true)
  const { theme, setTheme } = useContext(themeContext)

  return (
    <>
      <SizeContext.Provider value={{ widthWindow, heightWindow }}>
        <main id='main' className={`flex-container-column ${theme}-mode`}>
          <div
            id='container-theme'
            onClick={() => {
              setTheme(!theme || theme == 'light' ? 'dark' : 'light')
              localStorage.setItem(
                'theme',
                !theme ? 'light' : theme == 'light' ? 'dark' : 'light'
              )
            }}
          >
            <img
              src={
                !theme || theme == 'dark'
                  ? 'https://res.cloudinary.com/ddybbosdk/image/upload/v1721485115/sol_k9dgus.webp'
                  : 'https://res.cloudinary.com/ddybbosdk/image/upload/v1721485236/moon_gizmv3.webp'
              }
              alt={theme === 'dark' ? 'dark-theme' : 'light-theme'}
              loading='lazy'
            />
          </div>
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
