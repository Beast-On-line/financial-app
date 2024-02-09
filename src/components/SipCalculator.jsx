import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import "../css/sip.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
import Navbar from "./Navbar";
import IconButton from "@mui/material/IconButton";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Input = styled(MuiInput)`
  width: 100px;
`;
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
ChartJS.register(ArcElement, Tooltip, Legend);
function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

export default function SipCalculator() {
  const sipData = {
    amount: 1000,
    returns: 8,
    timePeriod: 10,
  };

  const [input, setInput] = useState(sipData);

  //Dark Mode
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  //Formulas
  const amounts = input.amount * input.timePeriod * 12;
  const months = input.timePeriod * 12;

  const totalamount =
    (input.amount * (Math.pow(1 + input.returns / 100 / 12, months) - 1)) /
    (input.returns / 100 / 12);
  const finalValue = parseInt(totalamount, 10);

  const estimatedReturns = finalValue - amounts;

  //   ******* Handle Eventsss
  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleSliderChange = (event, newValue) => {
    setInput((prevInput) => ({ ...prevInput, amount: newValue }));
  };
  const handleSliderChange2 = (event, newValue) => {
    setInput((prevInput) => ({ ...prevInput, returns: newValue }));
  };
  const handleSliderChange3 = (event, newValue) => {
    setInput((prevInput) => ({ ...prevInput, timePeriod: newValue }));
  };

  // Chart JS Data
  const data = {
    labels: ["Invested Amount", "Estimated Returns"],
    datasets: [
      {
        data: [amounts, estimatedReturns],
        backgroundColor: ["#CBF3F0", "#2EC4B9"],
        hoverBackgroundColor: ["#CBF3F0", "#2EC4B9"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {};

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <MyApp />
        </ThemeProvider>
      </ColorModeContext.Provider>
      <Navbar />
      <div className="main-container">
        <h1 style={{ letterSpacing: "2px" }}>SIP Calculator</h1>
        <div></div>{" "}
        <div className="container-sip">
          <div>
            <Box className="boxes">
              <Typography id="input-slider" gutterBottom>
                Monthly Investment
              </Typography>
              <Grid
                container
                spacing={2}
                alignItems="space-between"
                className="box-1"
              >
                <Grid item xs>
                  <Slider
                    className="sliders"
                    style={{
                      color: "#FF9F1C",
                      display: "flex",
                      gap: "5rem",
                    }}
                    value={input.amount}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    min={500}
                    max={100000}
                    step={500}
                  />
                </Grid>

                <Grid item>
                  <span
                    style={{
                      fontSize: "19px",
                      fontWeight: "800",
                      marginLeft: "2px",
                    }}
                  >
                    &#x20B9;
                  </span>

                  <Input
                    name="amount"
                    value={input.amount}
                    size="small"
                    onChange={handleChange}
                    inputProps={{
                      step: 500,
                      min: 500,
                      max: 1000000,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <br />

            <Box className="boxes">
              <Typography id="input-slider" gutterBottom>
                Return Rate
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    style={{
                      color: "#FF9F1C",
                      display: "flex",
                      gap: "5rem",
                    }}
                    value={input.returns}
                    onChange={handleSliderChange2}
                    aria-labelledby="input-slider"
                    min={1}
                    max={30}
                    step={0.1}
                  />
                </Grid>
                <Grid item>
                  <Input
                    name="returns"
                    value={input.returns}
                    size="small"
                    onChange={handleChange}
                    inputProps={{
                      step: 0.1,
                      min: 1,
                      max: 30,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <br />
            <Box className="boxes">
              <Typography id="input-slider" gutterBottom>
                Time Period
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    style={{
                      color: "#FF9F1C",
                      display: "flex",
                      gap: "5rem",
                    }}
                    value={input.timePeriod}
                    onChange={handleSliderChange3}
                    aria-labelledby="input-slider"
                    min={1}
                    max={50}
                    step={1}
                  />
                </Grid>

                <Grid item>
                  <Input
                    name="timePeriod"
                    value={input.timePeriod}
                    size="small"
                    onChange={handleChange}
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: 50,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <h1>
              Invested Amount : <span>&#x20B9;</span> {amounts}
            </h1>
            <h1>
              Estimated Returns : <span>&#x20B9;</span> {estimatedReturns}
            </h1>
            <h1>
              Total Amount in {input.timePeriod} years : <span>&#x20B9;</span>{" "}
              {finalValue}{" "}
            </h1>
          </div>
          <div className="doughnut">
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
