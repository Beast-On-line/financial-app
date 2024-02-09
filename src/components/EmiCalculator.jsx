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

const Input = styled(MuiInput)`
  width: 100px;
`;
ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmiCalculator() {
  const sipData = {
    LoanAmount: 1000,
    interest: 8,
    tenure: 10,
  };

  const [input, setInput] = useState(sipData);

  //Formulas
  const monthlyIR = input.interest / 12 / 100;
  const numberOfPayments = input.tenure * 12;

  const emi =
    (input.LoanAmount *
      (monthlyIR * Math.pow(1 + monthlyIR, numberOfPayments))) /
    (Math.pow(1 + monthlyIR, numberOfPayments) - 1);

  const finalemi = parseInt(emi, 10);
  const totalInterest = finalemi * numberOfPayments - input.LoanAmount;
  const totalAmount = input.LoanAmount + totalInterest;
  //   ******* Handle Eventsss
  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleSliderChange = (event, newValue) => {
    setInput((prevInput) => ({ ...prevInput, LoanAmount: newValue }));
  };
  const handleSliderChange2 = (event, newValue) => {
    setInput((prevInput) => ({ ...prevInput, interest: newValue }));
  };
  const handleSliderChange3 = (event, newValue) => {
    setInput((prevInput) => ({ ...prevInput, tenure: newValue }));
  };

  // Chart JS Data
  const data = {
    labels: ["Principal Amount", "Interest Amount"],
    datasets: [
      {
        data: [input.LoanAmount, totalInterest],
        backgroundColor: ["#CBF3F0", "#2EC4B9"],
        hoverBackgroundColor: ["#CBF3F0", "#2EC4B9"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {};

  return (
    <>
      <Navbar />
      <div className="main-container">
        <h1 style={{ letterSpacing: "2px" }}>EMI Calculator</h1>

        <div className="container-sip">
          <div>
            <Box sx={{ width: 500 }}>
              <Typography id="input-slider" gutterBottom>
                Loan Amount
              </Typography>
              <Grid
                container
                spacing={2}
                alignItems="space-between"
                className="box-1"
              >
                <Grid item xs>
                  <Slider
                    style={{
                      color: "#FF9F1C",
                      display: "flex",
                      gap: "5rem",
                    }}
                    value={input.LoanAmount}
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
                    name="LoanAmount"
                    value={input.LoanAmount}
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

            <Box sx={{ width: 500 }}>
              <Typography id="input-slider" gutterBottom>
                Interest Rate
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    style={{
                      color: "#FF9F1C",
                      display: "flex",
                      gap: "5rem",
                    }}
                    value={input.interest}
                    onChange={handleSliderChange2}
                    aria-labelledby="input-slider"
                    min={1}
                    max={30}
                    step={0.1}
                  />
                </Grid>
                <Grid item>
                  <Input
                    name="interest"
                    value={input.interest}
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
            <Box sx={{ width: 500 }}>
              <Typography id="input-slider" gutterBottom>
                Loan Tenure
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    style={{
                      color: "#FF9F1C",
                      display: "flex",
                      gap: "5rem",
                    }}
                    value={input.tenure}
                    onChange={handleSliderChange3}
                    aria-labelledby="input-slider"
                    min={1}
                    max={50}
                    step={1}
                  />
                </Grid>

                <Grid item>
                  <Input
                    name="tenure"
                    value={input.tenure}
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
              Monthly EMI : <span>&#x20B9;</span> {finalemi}
            </h1>
            <h1>
              Principal Amount : <span>&#x20B9;</span> {input.LoanAmount}
            </h1>
            <h1>
              Total Interest : <span>&#x20B9;</span> {totalInterest}{" "}
            </h1>
            <h1>
              Total Amount : <span>&#x20B9;</span> {totalAmount}
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
