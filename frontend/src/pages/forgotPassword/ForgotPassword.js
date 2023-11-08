import { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { forgotPassword } from "../../Api/ServerAPI";
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
    marginTop: "16px",
  },
  formField: {
    width: "100%",
    marginBottom: "16px",
  },
  submitButton: {
    backgroundColor: "#1775ee",
    margin: "16px 0",
    "&:hover": {
      backgroundColor: "#b20710",
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await forgotPassword(email);
      toast.success(data.message);
    } catch (error) {
      const { response } = error;
      console.log(error);
      if (response?.status === 400) {
        toast.error(response?.data?.message);
      }
    }
  };

  return (
    <div style={useStyles.root}>
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Enter your email address and we'll send you a link to reset your
          password.
        </Typography>
        <form style={useStyles.form} onSubmit={handleSubmit}>
          <TextField
            style={useStyles.formField}
            variant="outlined"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <EmailOutlinedIcon style={{ color: "#1775ee" }} />
              ),
              placeholder: "Enter Email",
            }}
            InputLabelProps={{
              style: { color: "white" },
              shrink: true,
            }}
          />

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button
              style={!email ? useStyles.disabledButton : useStyles.submitButton}
              variant="contained"
              type="submit"
              disabled={!email}
            >
              Send Email
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              style={useStyles.submitButton}
              type="submit"
            >
              Back To Login
            </Button>
          </Stack>
        </form>
      </Container>
    </div>
  );
};

export default ForgotPassword;
