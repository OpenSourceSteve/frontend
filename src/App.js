import { useState, useEffect } from "react"

import { Header, Main, Footer } from './components'

import './App.css';

function App() {
  const [page, setPage] = useState(window.location.pathname.split("/")[1])

  useEffect(() => {
    window.history.pushState({ page }, "", page) // (state, title, URL)
    window.addEventListener('popstate', function({ state }) {
      if (state) {
        setPage(state.page)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigateTo = (nextPage) => {
    window.history.pushState({ page: nextPage }, "", nextPage)
    setPage(window.location.pathname.split("/")[1])
  }

  return (
    <>
      <Header page={page} navigateTo={navigateTo} />
      <Main page={page} />
      <Footer />
    </>
  );

}


export default App;