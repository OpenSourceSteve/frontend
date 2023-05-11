import { useState, useEffect } from "react"

import { Header, Main, Footer } from './components'

import './App.css';

function App() {
  const [pages, setPages] = useState(window.location.pathname.split("/"))

  useEffect(() => {
    // Record initial page
    if (pages.length === 2) {
      window.history.pushState({ pages }, "", `/${pages[1]}`) // (state, title, URL)
    } else {
      window.history.pushState({ pages }, "", `/${pages[1]}/${pages[2]}`) // (state, title, URL)
    }

    window.addEventListener('popstate', function({ state }) {
      if (state) {
        setPages(state.pages)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigateTo = (nextPages) => {
    if (nextPages.length === 2) {
      window.history.pushState({ pages: nextPages }, "", `/${nextPages[1]}`) // (state, title, URL)
    } else {
      window.history.pushState({ pages: nextPages }, "", `/${nextPages[1]}/${nextPages[2]}`) // (state, title, URL)
    }
    setPages(window.location.pathname.split("/"))
  }

  return (
    <>
      <Header pages={pages} navigateTo={navigateTo} />
      <Main pages={pages} />
      <Footer />
    </>
  );

}

export default App;