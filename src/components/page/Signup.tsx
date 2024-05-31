import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 最下部のコピーライト情報
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://www.instagram.com/timufumi">
        Fumiya.O
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // パスワード表示切替
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }
  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  }

  // apiからの返事処理
  const addSignUp = async (fullName: string, email: any, pass: any) => {
    await axios
      .post("http://localhost:3333/signup", {
        fullName: fullName,
        email: email,
        password: pass
      })
      .then((response) => {
        console.log("登録成功")
        console.log(response.data);
        navigate("/signin")
      })
      .catch((error) => {
        console.log("登録失敗")
        console.log(error);
      })
  }

  // sign upボタン押下時イベント
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lastName = data.get("lastName");
    const firstName = data.get("firstName");
    const fullName = (`${lastName} ${firstName}`);
    const email = data.get('email');
    const pass = data.get('password');
    const repass = data.get('repassword')

    if (firstName !== "" && lastName !== "" && email !== "" && pass !== "" && repass !== "") {
      if (pass !== repass) {
        setMsg("パスワードが一致しません。")
      } else {
        setMsg("");
        addSignUp(fullName, email, pass);
      }
    } else {
      setMsg("未入力箇所があります。")
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* title */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {/* body */}
          <div style={{ color: "red" }}>{msg}</div>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              {/* mail */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              {/* password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={isRevealPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  className='password'
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        {isRevealPassword ? (
                          // 表示
                          <VisibilityOffIcon
                            onClick={togglePassword}
                            className="Password__visual"
                            sx={{
                              ":hover": {
                                cursor: "default",
                              }
                            }}
                          />
                        ) : (
                          // 非表示
                          <VisibilityIcon
                            onClick={togglePassword}
                            className="Password__visual"
                            sx={{
                              ":hover": {
                                cursor: "default",
                              }
                            }}
                          />
                        )}
                      </InputAdornment>
                  }}
                />
              </Grid>
              {/* confirm */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repassword"
                  label="Confirm Password"
                  type={isRevealConfirmPassword ? "text" : "password"}
                  id="rePassword"
                  autoComplete="new-password"
                  className='repassword'
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        {isRevealConfirmPassword ? (
                          // 表示
                          <VisibilityOffIcon
                            onClick={toggleConfirmPassword}
                            className="Password__visual"
                            sx={{
                              ":hover": {
                                cursor: "default",
                              }
                            }}
                          />
                        ) : (
                          // 非表示
                          <VisibilityIcon
                            onClick={toggleConfirmPassword}
                            className="Password__visual"
                            sx={{
                              ":hover": {
                                cursor: "default",
                              }
                            }}
                          />
                        )}
                      </InputAdornment>
                  }}
                />
              </Grid>
              {/* check box */}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="isAgree" color="primary" />}
                  label="I agree with anything."
                />
              </Grid> */}
            </Grid>
            {/* button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {/* signin url */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}