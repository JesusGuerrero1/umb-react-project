import { saveData } from './ApiUtil'
import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

const COPAY_ERROR_TEXT = "Please enter a Copay"
const COST_ERROR_TEXT = "Please enter a Cost"
const FACILITY_TYPE_ERROR_TEXT = "Please enter a Facility Type"

function CostForm({ costData, cptCodeId, fetchCostsData }) {
  const [submitMessage, setSubmitMessage] = useState('')
  const [alertColor, setAlertColor] = useState('')
  const [costFormData, setCostFormData] = useState({
    "cptCodeId": cptCodeId,
    "cost": costData.cost, 
    "facilityType": costData.facilityType, 
    "copay": costData.copay
  })
  
    const onUpdateField = e => {
      setSubmitMessage('')
      const nextFormState = {
        ...costFormData,
        [e.target.name]: e.target.value,
      }
      setCostFormData(nextFormState)
    }

    const onSubmit = (e) => {
      e.preventDefault()
      setSubmitMessage('')
  
      if (costFormData.facilityType && costFormData.copay && costFormData.cost) {
        submitData()
      }
    }
  
    const submitData = async () => {
      const parsedCost = parseFloat(costFormData.cost)
      const parsedData = {
        "cptCodeId": cptCodeId,
        "cost": parsedCost, 
        "facilityType": costFormData.facilityType, 
        "copay": costFormData.copay
      }
      const response = await saveData(parsedData)
  
      if (response.status === 'error') {
        setAlertColor('red')
      } else {
        setAlertColor('green')
        fetchCostsData()
      }
      setSubmitMessage(response.message)
    }
  
    return (
      <Box sx={{ m: 2, pt: 1, pb: 1, border: '1px solid', borderRadius: '5px '}}>
        <form noValidate onSubmit={onSubmit}>
          <div>
            <TextField
              id="id"
              label="Id"
              disabled
              defaultValue={costData.id}
              variant="standard"
            />
            <TextField
              id="facilityType"
              name="facilityType"
              label="Facility Type"
              error={!costFormData.facilityType}
              helperText={!costFormData.facilityType ? FACILITY_TYPE_ERROR_TEXT : ''}
              value={costFormData.facilityType}
              variant="standard"
              onChange={onUpdateField}
            />
          </div>
          <div>
            <TextField
              id="copay"
              name="copay"
              label="Copay"
              error={!costFormData.copay}
              helperText={!costFormData.copay ? COPAY_ERROR_TEXT : ''}
              value={costFormData.copay}
              variant="standard"
              type='number'
              onChange={onUpdateField}
            />
            <TextField
              id="cost"
              name="cost"
              label="Cost"
              error={!costFormData.cost}
              helperText={!costFormData.cost ? COST_ERROR_TEXT : ''}
              value={costFormData.cost}
              variant="standard"
              type='number'
              onChange={onUpdateField}
            />
          </div>
          <Button
            variant="contained"
            type='submit'
            fullWidth
            mt={2}
          >
            Save
          </Button>
        </form>
        {submitMessage && 
          <Typography mt={2} color={alertColor}>
            {submitMessage}
          </Typography>
        }
      </Box>
    )
}

export default CostForm