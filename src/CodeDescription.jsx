import CostForm from './CostForm'
import { retrieveData } from './ApiUtil'
import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

function CodeDescription({ cptCode }) {
  const [costsData, setCostsData] = useState([])

  const fetchCostsData = async () => {
    const result = await retrieveData("http://localhost:3001/costs")
    setCostsData(result)
  }

  useEffect(() => {
    fetchCostsData()
  }, [])

  const calculateAvgCost = () => {
    const costList = costsData.filter(set => set.cptCodeId === cptCode.id).map(data => data.cost)
    var totalCost = 0
    for(const cost of costList) {
      totalCost += parseFloat(cost)
    }

    return totalCost/(costList.length)
  }

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Typography m={2} textAlign='start'>
          Code: {cptCode.code}
        </Typography>
        <Typography m={2} textAlign='start'>
          Description: {cptCode.description}
        </Typography>
        <Typography m={2} textAlign='start'>
          Average Cost: {calculateAvgCost()}
        </Typography>
      </div>

      {costsData.filter(set => set.cptCodeId === cptCode.id).map(costData => (
        <CostForm
          key={costData.id}
          costData={costData}
          cptCodeId={cptCode.id}
          fetchCostsData={fetchCostsData}
        />
      ))}
    </Box>
  )
}

export default CodeDescription