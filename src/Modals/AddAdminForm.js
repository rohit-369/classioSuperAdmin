import React, { useState } from 'react';
import {
    Box,
    Backdrop,
    Button,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Paper, Select,
    Stack,
    Switch,
    TextField, MenuItem
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Female, Visibility, VisibilityOff } from "@mui/icons-material";


function AddAdminForm() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [role, setRole] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('male');
    const [cityList, setCityList] = useState([]);
    const [selectedCity, setSelectedCity] = useState({});
    const [formPasswordShow, setFormPasswordShow] = useState(false);
    const genderList = ['male', 'female', 'other']
    const roleList = ['UI/UX Designer', 'Software Developer', 'React Developer', 'Python Developer', 'Flutter Developer', 'Full Stack Developer']

    const handleFormClickShowPassword = () => {
        setFormPasswordShow(!formPasswordShow);
    }

    const handleChangeRole = (e) => {
        setRole(e.target.value)
    }

    const handleCityChange = (e) => {
        setCityList(e.target.value)
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }

    const handleContactChange = (e) => {
        setContact(e.target.value)
    }

    const handleDobChange = (newValue) => {
        console.log(newValue.format('YYYY-MM-DD'));

        setDob(newValue);
    }

    return (
        <>
            <form style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "start",
                padding: "2rem",
            }}>
                <Stack spacing={0} direction="row" alignItems={"center"}>
                    <TextField
                        id="outlined-basic"
                        type="text"
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        sx={{ margin: "1rem", width: "200px" }}
                    />
                    <TextField
                        id="outlined-basic"
                        type="text"
                        label="last Name"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        sx={{ margin: "1rem", width: "200px" }}
                    />
                </Stack>
                <Stack spacing={0} direction="row" alignItems={"center"}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        type="text"
                        label="Address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ margin: "1rem", width: "430px" }}
                    />
                </Stack>
                <Stack spacing={0} direction="row" alignItems={"center"}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        type="text"
                        label="User Name"
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        sx={{ gridColumn: "span 12", margin: "1rem", width: "200px" }}
                    />

                    <TextField
                        fullWidth
                        id="outlined-basic"
                        type={formPasswordShow ? "text" : "password"}
                        label="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ gridColumn: "span 12", margin: "1rem", width: "200px" }}
                        InputProps={{
                            endAdornment:
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleFormClickShowPassword}
                                >
                                    {formPasswordShow ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                        }}
                    />
                </Stack>
                <Stack spacing={0} direction="row" alignItems={"center"}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        type="text"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ gridColumn: "span 12", margin: "1rem", width: "430px" }}
                    />
                </Stack>
                <Stack>
                    <Stack spacing={0} direction="row" alignItems={"center"}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            type="number"
                            label="Contact"
                            name="contact"
                            InputProps={{ maxLength: 12 }}
                            value={contact}
                            onChange={handleContactChange}
                            sx={{ gridColumn: "span 12", margin: "1rem", width: "160px" }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Dob"
                                inputFormat="YYYY-MM-DD"
                                value={dob}
                                variant="outlined"
                                id="dob"
                                onChange={handleDobChange}
                            // renderInput={(params) => <TextField variant="outlined" {...params} />}
                            />
                        </LocalizationProvider>
                    </Stack>
                    {/* {isContactAvailable ? "" : <p style={{ paddingLeft: '1rem', color: '#ef4444', fontWeight: 'bold' }}>{contactErrorMessage}</p>} */}
                </Stack>
                <Stack>
                    <InputLabel id="gender" sx={{ left: '12px', margin: '6px' }}>Gender</InputLabel>
                    <Select
                        value={gender}
                        labelId='gender'
                        label="Gender"
                        onChange={handleGenderChange}
                        sx={{ minWidth: 430, ml: 2.3 }}
                        disableUnderline
                    >
                        {genderList.map((gender) => {
                            return (
                                <MenuItem value={gender} key={gender}>
                                    {gender}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Stack>
                <Stack>
                    <InputLabel id="city-label" sx={{ left: '12px', margin: '6px' }}>City</InputLabel>
                    <Select
                        value={selectedCity}
                        label="city"
                        labelId='city-label'
                        onChange={handleCityChange}
                        sx={{ minWidth: 430, ml: 2.3 }}
                        disableUnderline
                    >
                        {cityList.map((city) => {
                            return (
                                <MenuItem value={city} key={city.id}>
                                    {city}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Stack>
                <Stack>
                    <InputLabel id="role" sx={{ left: '12px', margin: '6px' }}>Role</InputLabel>
                    <Select
                        value={role}
                        label="role"
                        labelId='role'
                        onChange={handleChangeRole}
                        sx={{ minWidth: 430, ml: 2.3 }}
                        disableUnderline
                    >
                        {roleList.map((role) => {
                            return (
                                <MenuItem value={role} key={role.id}>
                                    {role}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Stack>
                <Box width={'100%'} display={'flex'} justifyContent={'end'} marginTop={'1rem'}>
                    <Box>
                        <FormLabel sx={{ margin: "1rem", width: "350px" }}>
                            <Button
                                // disabled={firstName === "" || lastName === "" || address === "" || userName === "" || password === "" || email === "" || contact === false ? true : false}
                                variant="contained"
                                color="success"
                                component="label"
                                // onClick={registerStudent}
                                style={{ marginRight: "1rem" }}>
                                Save
                            </Button>
                            <Button
                                // onClick={handleClose}
                                variant="contained" color="error" component="label">
                                Cancel
                            </Button>
                        </FormLabel>
                    </Box>
                </Box>

            </form>
        </>
    )
}

export default AddAdminForm