import './App.css'
import CodeSelect from './CodeSelect'
import React, { useEffect, useState } from 'react'

function App() {
  return (
    <>
      <div>
        <a href="https://healthcare.utah.edu/" target="_blank" rel="noreferrer">
          <img src="https://healthcare.utah.edu/themes/custom/theme_uou_clinical/logo.svg" className="logo uhealth" alt="UHealth logo" />
        </a>
      </div>
      <h1>UMB React Project</h1>
      <div className="card">
        <CodeSelect />
      </div>
    </>
  )
}



export default App
