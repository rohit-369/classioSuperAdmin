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
    TextField, MenuItem,
    Alert
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const EditInstituteModal = ({handleClose}) => {

    const [instituteName, setInstituteFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [audio, setAudio] = useState(null);
    const [thumb, setThumb] = useState(null);
    const [imageIsInRatio, setImageIsInRatio] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const getFileImageUrl = ({handleClose}) => {
        // if (thumb === undefined || thumb === "") {
        //   return "";
        // } else {
        //   return URL.createObjectURL(thumb);
        // }
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
                        label="Institute Name"
                        name="instituteName"
                        value={instituteName}
                        onChange={(e) => setInstituteFirstName(e.target.value)}
                        sx={{ margin: "1rem", width: "400px" }}
                    />
                </Stack>
                <Stack spacing={0} direction="row" alignItems={"center"}>
                    <TextField
                        id="outlined-basic"
                        type="text"
                        label="Address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ margin: "1rem", width: "400px" }}
                    />
                </Stack>
                <Stack spacing={0} direction="row" alignItems={"center"}>
                    <TextField
                        id="outlined-basic"
                        type="text"
                        label="E-Mail"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ margin: "1rem", width: "400px" }}
                    />
                </Stack>
                <Stack spacing={0} direction="row" alignItems={"center"}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        type="number"
                        label="Contact"
                        name="contact"
                        InputProps={{ maxLength: 12 }}
                        value={contact}
                        // onChange={handleContactChange}
                        sx={{ gridColumn: "span 12", margin: "1rem", width: "200px" }}
                    />
                </Stack>
                <Stack sx={{ width: "100%" }} spacing={"1rem"} justifyContent={"start"} alignItems={'start'} marginLeft={'15px'}>
                    {thumb && (
                        <div
                            style={{
                                display: "flex",
                                justifyItems: "center",
                                justifyContent: "center",
                                position: "relative",
                            }}
                        >
                            <img width={300} height={150} src={getFileImageUrl()} alt="" />
                            <ChangeCircleIcon
                                onClick={() =>
                                    document.querySelector(".logoUploadInput").click()
                                }
                                sx={{
                                    position: "absolute",
                                    color: "blueviolet",
                                    fontSize: "40px",
                                    top: "60px",
                                    right: "-40px",
                                }}
                            />
                            <input
                                className="logoUploadInput"
                                width={"100%"}
                                height={"100%"}
                                type="file"
                                hidden
                                // onChange={handleSelectLogo}
                                onChange={(e) => setThumb(e.target.files[0])}
                                accept=".jpg, .png, .jpeg"
                                multiple
                            />
                        </div>
                    )}
                    {!thumb && (
                        <button
                            onClick={() => document.querySelector(".logoUploadInput").click()}
                            type="button"
                            style={{
                                width: "300px",
                                minHeight: "132px",
                                height: "100px",
                                border: "2px dashed #ccc",
                                borderRadius: "1rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <CloudUploadIcon fontSize="large" />
                                Upload Thumbnail
                            </div>
                            <input
                                className="logoUploadInput"
                                width={"100%"}
                                height={"100%"}
                                type="file"
                                hidden
                                // onChange={handleSelectLogo}
                                onChange={(e) => setThumb(e.target.files[0])}
                                accept=".jpg, .png, .jpeg"
                            />
                        </button>
                    )}

                    {
                        imageIsInRatio === true || imageIsInRatio === null ? "" :
                            <Alert severity="error">{errorMsg}</Alert>
                    }
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
                                Update
                            </Button>
                            <Button
                                onClick={handleClose}
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

export default EditInstituteModal