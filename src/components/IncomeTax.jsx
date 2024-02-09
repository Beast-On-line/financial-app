import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function IncomeTax() {
  const Income = {
    salary: "",
    others: "",
    interest: "",
    rentalIncome: "",
  };

  const Deductions = {
    basicDeduction: "",
    NPS: "",
    medicalInsurance: "",
    charity: "",
    educationLoan: "",
    savingDeposits: "",
  };

  const HRAexemption = {
    salaryPerAnnum: "",
    HRAreceived: "",
    totalRentPaid: "",
  };

  const [incomeInput, setIncomeInput] = useState(Income);
  const [DeductionInput, setDeductionInput] = useState(Deductions);
  const [HRAexempt, setHRAexemption] = useState(HRAexemption);
  const [tax, setTax] = useState(0);
  const [ntax, setntax] = useState(0);

  //Handle Evemts
  function handleIncome(e) {
    setIncomeInput({ ...incomeInput, [e.target.name]: e.target.value });
  }
  function handleDeduction(e) {
    setDeductionInput({ ...DeductionInput, [e.target.name]: e.target.value });
  }
  function handleHRA(e) {
    setHRAexemption({ ...HRAexempt, [e.target.name]: e.target.value });
  }

  //Calculations
  //   function CalculateTax(e) {
  //     //hra calculations
  //     let actualHRA = HRAexempt.HRAreceived;
  //     let rentpaid = HRAexempt.totalRentPaid - HRAexempt.salaryPerAnnum * 0.1;
  //     let fiftyOfBasic = HRAexempt.salaryPerAnnum * 0.5;

  //     let Exempted = Math.min(actualHRA, rentpaid, fiftyOfBasic);
  //     let Taxable = actualHRA - Exempted;
  //     //hra calculations

  //     let totalIncome =
  //       Income.salary + Income.others + Income.interest + Income.rentalIncome;

  //     let totalDeductions =
  //       Deductions.NPS +
  //       Deductions.basicDeduction +
  //       Deductions.charity +
  //       Deductions.educationLoan +
  //       Deductions.medicalInsurance +
  //       Deductions.savingDeposits;

  //     let taxAmount = totalIncome - totalDeductions + Taxable;

  //     if (taxAmount <= 250000) {
  //       setTax(0);
  //     } else if (taxAmount <= 300000) {
  //       setTax((taxAmount - 2500000) * 0.05);
  //     } else if (taxAmount <= 500000) {
  //       setTax((300000 - 250001) * 0.05 + (taxAmount - 300000) * 0.05);
  //     } else if (taxAmount <= 1000000) {
  //       setTax(
  //         (300000 - 250001) * 0.05 +
  //           (500000 - 300001) * 0.05 +
  //           (taxAmount - 500000) * 0.2
  //       );
  //     } else {
  //       setTax(
  //         (300000 - 250001) * 0.05 +
  //           (500000 - 300001) * 0.05 +
  //           (1000000 - 500000) * 0.2 +
  //           (taxAmount - 1000000) * 0.3
  //       );
  //     }
  //   }

  function CalculateTax(e) {
    //hra calculations
    let actualHRA = HRAexempt.HRAreceived;
    let rentpaid = HRAexempt.totalRentPaid - incomeInput.salary * 0.1;
    let fiftyOfBasic = HRAexempt.salaryPerAnnum * 0.5;

    let Exempted = Math.min(actualHRA, rentpaid, fiftyOfBasic);
    let Taxable = actualHRA - Exempted;

    let totalIncome =
      incomeInput.salary +
      incomeInput.others +
      incomeInput.interest +
      incomeInput.rentalIncome;

    let totalDeductions =
      DeductionInput.NPS +
      DeductionInput.basicDeduction +
      DeductionInput.charity +
      DeductionInput.educationLoan +
      DeductionInput.medicalInsurance +
      DeductionInput.savingDeposits;

    let taxAmount = totalIncome - totalDeductions - Taxable - 50000;

    if (taxAmount <= 250000) {
      setTax(0);
    } else if (taxAmount <= 300000) {
      setTax((taxAmount - 250000) * 0.05);
    } else if (taxAmount <= 500000) {
      setTax((300000 - 250001) * 0.05 + (taxAmount - 300000) * 0.05);
    } else if (taxAmount <= 1000000) {
      setTax(
        (300000 - 250001) * 0.05 +
          (500000 - 300001) * 0.05 +
          (taxAmount - 500000) * 0.2
      );
    } else {
      setTax(
        (300000 - 250001) * 0.05 +
          (500000 - 300001) * 0.05 +
          (1000000 - 500000) * 0.2 +
          (taxAmount - 1000000) * 0.3
      );
    }
    if (taxAmount <= 300000) {
      setntax(0);
    } else if (taxAmount <= 600000) {
      setntax((taxAmount - 300000) * 0.05);
    } else if (taxAmount <= 900000) {
      setntax((600000 - 300001) * 0.05 + (taxAmount - 600000) * 0.1);
    } else if (taxAmount <= 1200000) {
      setntax(
        (600000 - 300001) * 0.05 +
          (900000 - 600000) * 0.1 +
          (taxAmount - 300000) * 0.15
      );
    } else {
      setntax(
        (600000 - 300001) * 0.05 +
          (900000 - 600001) * 0.1 +
          (1200000 - 900001) * 0.15 +
          (1500000 - 1200001) * 0.2 +
          (taxAmount - 1500001) * 0.3
      );
    }
  }

  return (
    <>
      <Navbar />
      {/* <FormGroup>
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
          label="MUI switch"
        />
      </FormGroup> */}
      <div className="main-container">
        <h1>Income Tax Calculator 2023-2024</h1>
        {/* Income  */}

        <div className="container-income">
          <div className="cards">
            <div className="Income">
              <h1>Income</h1>
              <TextField
                className="text-field"
                label="Gross Salary"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleIncome}
                type="number"
                name="salary"
                value={incomeInput.salary}
              />
              <TextField
                label="Annual income from other sources"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleIncome}
                type="number"
                name="others"
                value={incomeInput.others}
              />
              <TextField
                label="Annual income from interest"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleIncome}
                type="number"
                name="interest"
                value={incomeInput.interest}
              />

              <TextField
                label="Annual income from house property (rental income)"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleIncome}
                type="number"
                name="rentalIncome"
                value={incomeInput.rentalIncome}
              />
            </div>

            <div className="Deductions">
              <h1>Deductions</h1>
              <TextField
                className="text-field"
                label="Basic deduction u/s 80C"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleDeduction}
                type="number"
                name="basicDeduction"
                value={DeductionInput.basicDeduction}
              />
              <TextField
                label="Contribution to NPS u/s 80CCD(1B)"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleDeduction}
                type="number"
                name="NPS"
                value={DeductionInput.NPS}
              />
              <TextField
                label="Medical insurance premium u/s 80D"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleDeduction}
                type="number"
                name="medicalInsurance"
                value={DeductionInput.medicalInsurance}
              />
              <TextField
                label="Donation to Charity u/s 80G"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleDeduction}
                type="number"
                name="charity"
                value={DeductionInput.charity}
              />
              <TextField
                label="Interest on educational loan u/s 80E"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleDeduction}
                type="number"
                name="educationLoan"
                value={DeductionInput.educationLoan}
              />
              <TextField
                label="Interest on deposits in saving account u/s 80TTA/TTB"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleDeduction}
                type="number"
                name="savingDeposits"
                value={DeductionInput.savingDeposits}
              />
            </div>
            <div className="HRA">
              <h1>HRA Exemption</h1>
              <TextField
                className="text-field"
                label="Basic Salary"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleHRA}
                type="number"
                name="salaryPerAnnum"
                value={HRAexempt.salaryPerAnnum}
              />
              <TextField
                label="HRA Received"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleHRA}
                type="number"
                name="HRAreceived"
                value={HRAexempt.HRAreceived}
              />

              <TextField
                label="Total Rent Paid"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleHRA}
                type="number"
                name="totalRentPaid"
                value={HRAexempt.totalRentPaid}
              />
            </div>
          </div>
          <div className="cards2">
            <div className="answers">
              <h1>Total Tax (Old regime) {parseInt(tax, 10)}</h1>
              <h1>Total Tax (New regime) {parseInt(ntax, 10)}</h1>{" "}
              <Button
                variant="contained"
                size="medium"
                style={{ color: "black", backgroundColor: "#ffbf69" }}
                onClick={(e) => CalculateTax(e)}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
