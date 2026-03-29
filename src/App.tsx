import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete,
} from '@mui/material'
import './App.css'
import { autocompleteOptions, mockData, options, tableRows } from './mock'



function App() {
  const [rowValues, setRowValues] = useState<Record<number, string>>({
    1: '',
    2: '',
  })
  const [initialFormValues, setInitialFormValues] = useState<Record<number, string>>({
    1: '',
    2: '',
  })
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState<string>('')
  const [dialogLabelByRow, setDialogLabelByRow] = useState<Record<number, string>>({
    1: '',
    2: '',
  })
  const [isFromDialog, setIsFromDialog] = useState<Record<number, boolean>>({
    1: false,
    2: false,
  })
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const handleRowButtonClick = (rowId: number) => {
    setSelectedRow(rowId)
    // Simulate fetching data only if not already set
    if (!rowValues[rowId]) {
      setRowValues((prev) => ({
        ...prev,
        [rowId]: mockData[rowId] || '',
      }))
      setIsFromDialog((prev) => ({
        ...prev,
        [rowId]: false,
      }))
    }
    // Set initial value for autocomplete only if not already set
    if (!initialFormValues[rowId]) {
      setInitialFormValues((prev) => ({
        ...prev,
        [rowId]:  '🍭'
      }))
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(String(event.target.value))
  }

  const handleDialogSubmit = () => {
    if (selectedRadio !== '' && selectedRow !== null) {
      const selectedOption = options.find((option) => String(option.value) === selectedRadio)
      const label = selectedOption ? selectedOption.label : ''

      setRowValues((prev) => ({
        ...prev,
        [selectedRow]: selectedRadio,
      }))
      setDialogLabelByRow((prev) => ({
        ...prev,
        [selectedRow]: label,
      }))
      setIsFromDialog((prev) => ({
        ...prev,
        [selectedRow]: true,
      }))
    }
    handleCloseDialog()
  }

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (selectedRow !== null) {
      setRowValues((prev) => ({
        ...prev,
        [selectedRow]: value,
      }))
    }
  }

  const handleAutocompleteOptionChange = (_event: any, value: string | null) => {
    if (selectedRow !== null) {
      setInitialFormValues((prev) => ({
        ...prev,
        [selectedRow]: value || '',
      }))
    }
    if (value === '🍄') {
      setOpenDialog(true)
    }
  }

  useEffect(() => {
    if (selectedRow !== null && initialFormValues[selectedRow] === '🍄') {
      setOpenDialog(true)
    }
  }, [selectedRow, initialFormValues])


  const selectedOption = options.find((o) => String(o.value) === selectedRadio)
  const dialogTitle = selectedOption
    ? `${selectedOption.value} ${selectedOption.label}`
    : ''

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Left Side - Table */}
          <Grid  >
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      Rows
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        backgroundColor:
                          selectedRow === row.id ? '#e3f2fd' : 'inherit',
                        cursor: 'pointer',
                      }}
                    >
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant={
                            selectedRow === row.id ? 'contained' : 'outlined'
                          }
                          size="small"
                          onClick={() => handleRowButtonClick(row.id)}
                        >
                          Form {row.name}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Right Side - Form */}
          <Grid >
            {selectedRow ? (
              <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <h2>Form  {tableRows.find((r) => r.id === selectedRow)?.name}</h2>
                
                <TextField
                  type="text"
                  label={
                    selectedRow !== null && isFromDialog[selectedRow]
                      ? dialogLabelByRow[selectedRow] 
                      : '🍍'
                  }
                  value={selectedRow !== null ? rowValues[selectedRow] : ''}
                  onChange={handleNumberChange}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ff69b4',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ff1493',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#c71585',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#ff1493',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#ff69b4',
                    },
                  }}
                />
                <Autocomplete
                  options={autocompleteOptions}
                  value={selectedRow !== null ? initialFormValues[selectedRow] : ''}
                  onChange={handleAutocompleteOptionChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose 🍄 to open dialog"
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#e1d6dc',
                          },
                          '&:hover fieldset': {
                            borderColor: '#e1d6dc',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#e1d6dc',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: '#e1d6dc',
                        },
                        '& .MuiInputLabel-root': {
                          color: '#e1d6dc',
                        },
                      }}
                    />
                  )}
                />

                {/* Dialog */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                  <DialogTitle>Give me {dialogTitle }</DialogTitle>
                  <DialogContent sx={{ minWidth: 300 }}>
                    <RadioGroup
                      value={selectedRadio}
                      onChange={handleRadioChange}
                      sx={{ mt: 2 }}
                    >
                      {options.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio />}
                          label={`${option.label}: ${option.value}`}
                        />
                      ))}
                    </RadioGroup>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDialogSubmit} variant="contained">
                      Select
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            ) : (
              <Box
                sx={{
                  p: 4,
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  textAlign: 'center',
                  color: '#999',
                }}
              >
                <h3>Select a row from the table to show the form</h3>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default App
