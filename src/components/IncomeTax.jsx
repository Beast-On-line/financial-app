import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";

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
                className="text-field"
                label="Annual income from other sources"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleIncome}
                type="number"
                name="others"
                value={incomeInput.others}
              />
              <TextField
                className="text-field"
                label="Annual income from interest"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleIncome}
                type="number"
                name="interest"
                value={incomeInput.interest}
              />

              <TextField
                className="text-field"
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
                className="text-field"
                label="Contribution to NPS u/s 80CCD(1B)"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleDeduction}
                type="number"
                name="NPS"
                value={DeductionInput.NPS}
              />
              <TextField
                className="text-field"
                label="Medical insurance premium u/s 80D"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleDeduction}
                type="number"
                name="medicalInsurance"
                value={DeductionInput.medicalInsurance}
              />
              <TextField
                className="text-field"
                label="Donation to Charity u/s 80G"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleDeduction}
                type="number"
                name="charity"
                value={DeductionInput.charity}
              />
              <TextField
                className="text-field"
                label="Interest on educational loan u/s 80E"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleDeduction}
                type="number"
                name="educationLoan"
                value={DeductionInput.educationLoan}
              />
              <TextField
                className="text-field"
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
                className="text-field"
                label="HRA Received"
                variant="filled"
                style={{ color: "black" }}
                onChange={handleHRA}
                type="number"
                name="HRAreceived"
                value={HRAexempt.HRAreceived}
              />

              <TextField
                className="text-field"
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
