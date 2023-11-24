import { useState } from "react"
import styled from "@emotion/styled"
import "./App.css"
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

function App() {
  // Style for upload Button
  const Input = styled("input")({
    display: "none",
  })

  // States
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState(null)
  const [st, setSt] = useState("")
  const [gender, setGender] = useState("")
  const [jobLocation, setJobLocation] = useState([])
  const [profileImage, setProfileImage] = useState("")
  const [doc, setDoc] = useState("")
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  })

  // Multi Checkbox
  const getJobLocation = (e) => {
    const { value, checked } = e.target

    if (checked) {
      // User Checks the Box
      setJobLocation([...jobLocation, value])
    } else {
      // User Unchecks the Box
      setJobLocation(jobLocation.filter((e) => e !== value))
    }
  }

  // Clear Form
  const resetForm = () => {
    setName("")
    setEmail("")
    setDob(null)
    setSt("")
    setGender("")
    setJobLocation([])
    setProfileImage("")
    setDoc("")
    document.getElementById("resume-form").reset()
  }

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("name", name)
    data.append("email", email)
    data.append("dob", dob)
    data.append("st", st)
    data.append("gender", gender)
    data.append("jobLocation", jobLocation)
    data.append("profileImage", profileImage)
    data.append("doc", doc)

    if (name && name.length > 5 && email) {
      console.log(data.get("name"))
      console.log(data.get("email"))
      console.log(data.get("dob"))
      console.log(data.get("st"))
      console.log(data.get("gender"))
      console.log(data.get("jobLocation"))
      console.log(data.get("profileImage"))
      console.log(data.get("doc"))
      setError({
        status: true,
        msg: "Success",
        type: "success",
      })
      resetForm()
    } else {
      setError({
        status: true,
        msg: "Name must be greater than 5 character",
        type: "error",
      })
    }
  }

  return (
    <>
      {/* Grid Container */}
      <Grid container justifyContent="center">
        {/* Left Side */}
        <Grid item lg={5} xs={12}>
          {/* Form */}
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{ p: 3 }}
            id="resume-form"
          >
            {/* Name Input */}
            <TextField
              helperText="Please enter your name"
              type="text"
              id="name"
              name="name"
              required
              fullWidth
              margin="normal"
              label="Name"
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email Input */}
            <TextField
              helperText="Please enter your email"
              type="email"
              id="email"
              name="email"
              required
              fullWidth
              margin="normal"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Date Picker */}
            <Grid container>
              <Grid item xs={6}>
                <Box mt={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Birth"
                      value={dob}
                      onChange={(newValue) => setDob(newValue)}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item xs={6}>
                {/* State Dropdown */}
                <FormControl fullWidth margin="normal">
                  <InputLabel id="state-select-label">State</InputLabel>
                  <Select
                    labelId="'state-select-label"
                    id="state-select"
                    value={st}
                    label="st"
                    onChange={(e) => setSt(e.target.value)}
                  >
                    <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                    <MenuItem value="West Bengal">West Bengal</MenuItem>
                    <MenuItem value="Kolkata">Kolkata</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Gender */}
            <FormControl fullWidth margin="normal">
              <FormLabel id="gender-radio">Gender</FormLabel>
              <RadioGroup row name="gender">
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  onChange={(e) => setGender(e.target.value)}
                />
              </RadioGroup>
            </FormControl>

            {/* Job locations checkboxes */}
            <FormControl component="fieldset" fullWidth margin="normal">
              <FormLabel component="legend">Preferred Job Location:</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Delhi"
                  value="Delhi"
                  onChange={(e) => getJobLocation(e)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Mumbai"
                  value="Mumbai"
                  onChange={(e) => getJobLocation(e)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Banglore"
                  value="Banglore"
                  onChange={(e) => getJobLocation(e)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Ranchi"
                  value="Ranchi"
                  onChange={(e) => getJobLocation(e)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Kolkata"
                  value="Kolkata"
                  onChange={(e) => getJobLocation(e)}
                />
              </FormGroup>
            </FormControl>

            {/* Upload Buttons */}
            <Stack direction="row" alignItems="center" spacing={4}>
              {/* Upload profile photo */}
              <label htmlFor="profile-photo">
                <Input
                  accept="image/*"
                  id="profile-photo"
                  type="file"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
                <Button variant="contained" component="span">
                  Upload Photo
                </Button>
              </label>

              {/* Upload resume doc file */}
              <label htmlFor="resume-file">
                <Input
                  accept="doc/*"
                  id="resume-file"
                  type="file"
                  onChange={(e) => setDoc(e.target.files[0])}
                />
                <Button variant="contained" component="span">
                  Upload File
                </Button>
              </label>
            </Stack>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
              color="error"
            >
              Submit
            </Button>

            {/* Alert message */}
            {error.status ? (
              <Alert severity={error.type}>{error.msg}</Alert>
            ) : (
              ""
            )}
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item lg={7} xs={12} padding={5}>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="center"
            sx={{ backgroundColor: "info.light", padding: 1 }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              List of Candidates
            </Typography>
          </Box>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    DOB
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    State
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    Gender
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    Location
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    Profile
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">Raj</TableCell>
                  <TableCell align="center">raj@gmail.com</TableCell>
                  <TableCell align="center">20/10/1995</TableCell>
                  <TableCell align="center">Delhi</TableCell>
                  <TableCell align="center">Male</TableCell>
                  <TableCell align="center">Delhi Ranchi</TableCell>
                  <TableCell align="center">
                    <Avatar src="#"></Avatar>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default App
