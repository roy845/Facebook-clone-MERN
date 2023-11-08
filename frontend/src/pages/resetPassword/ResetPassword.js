import { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { resetPassword } from "../../Api/ServerAPI";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const useStyles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formField: {
    width: "100%",
    marginBottom: "16px",
  },
  submitButton: {
    backgroundColor: "#1775ee",
    width: "100%",
    "&:hover": {
      backgroundColor: "#1775ee",
    },
  },
  input: {
    "&::placeholder": {
      color: "white",
      opacity: 1,
    },
  },
  labelRoot: {
    color: "white",
  },
  inputRoot: {
    color: "white",
    borderColor: "white",
  },
  disabledButton: {
    color: "gray",
  },
};

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmedPasswordValid, setIsConfirmedPasswordValid] =
    useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsConfirmedPasswordValid(confirmPassword === e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsConfirmedPasswordValid(password === e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(token, password);

      toast.success("Reset password successfully", "success");
      navigate("/");
    } catch (err) {
      console.log(err);
      if (!err || !err.response) {
        toast.error("No Server Response");
      } else if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Send Mail Failed");
      }
    }

    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div style={useStyles.root}>
      <Container maxWidth="xs">
        <Box sx={useStyles.form}>
          <Typography variant="h4" align="center" gutterBottom>
            Reset Password
          </Typography>
          <form style={useStyles.form} onSubmit={handleSubmit}>
            <TextField
              style={useStyles.formField}
              variant="outlined"
              label="New Password"
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                startAdornment: (
                  <LockOutlinedIcon style={{ color: "#1775ee" }} />
                ),
                placeholder: "Enter New Password",
              }}
              InputLabelProps={{
                style: { color: "white" },
                shrink: true,
              }}
            />

            <TextField
              style={useStyles.formField}
              variant="outlined"
              label="Confirm Password"
              type="password"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              InputProps={{
                startAdornment: (
                  <LockOutlinedIcon style={{ color: "#1775ee" }} />
                ),
                placeholder: "Confirm Password",
              }}
              InputLabelProps={{
                style: { color: "white" },
                shrink: true,
              }}
            />
            {confirmPassword && (
              <Typography variant="caption">
                {isConfirmedPasswordValid ? (
                  <span className="success">
                    <span className="icon">
                      <CheckIcon style={{ color: "green" }} />
                    </span>
                    <span className="text">{"Passwords match"}</span>
                  </span>
                ) : (
                  <span className="error">
                    <span className="icon">
                      <ClearIcon style={{ color: "red" }} />
                    </span>
                    <span className="text">{"Passwords Don't match"}</span>
                  </span>
                )}
              </Typography>
            )}

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Button
                style={
                  !password || !confirmPassword || !isConfirmedPasswordValid
                    ? useStyles.disabledButton
                    : useStyles.submitButton
                }
                variant="contained"
                type="submit"
                disabled={
                  !password || !confirmPassword || !isConfirmedPasswordValid
                }
              >
                Reset Password
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default ResetPassword;
