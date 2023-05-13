import CodeDescription from './CodeDescription'
import { retrieveData } from './ApiUtil'
import React, { useEffect, useState } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

function CodeSelect() {
    const [selectedCode, setSelectedCode] = useState('')
    const [cptCode, setCptCode] = useState([])
    const [cptData, setCptData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
  
    useEffect(() => {
      const fetchData = async () => {
        const cptData = await retrieveData("http://localhost:3001/cptCodes")
        setCptData(cptData)
        setIsLoaded(true)
      } 
  
      fetchData()
    }, [])
    
    const handleChange = (event) => {
      setSelectedCode(event.target.value)
      const dataFromCode = cptData.find(set => set.code === event.target.value)
      setCptCode(dataFromCode)
    }
  
    if (cptData.status === 'error') {
      return <div>{cptData.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <Box sx={{ minWidth: 120, maxWidth: 500 }}>
          <FormControl fullWidth>
            <InputLabel id="code-select">Select Code</InputLabel>
            <Select
              labelId="code-select"
              id="code-select"
              value={selectedCode}
              label="Select Code"
              onChange={handleChange}
            >
              <MenuItem value={''}>Select Code</MenuItem>
              {cptData.map(c => (
                <MenuItem key={c.id} value={c.code}>{c.code}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedCode && 
            <CodeDescription 
              cptCode={cptCode}
            />
          }
        </Box>
      )
    }
  }

export default CodeSelect