import * as React from 'react';
import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Home from '../parts/Home';

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

export default function SignIn() {
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const { register, watch, formState: { errors } } = useForm();

  // パスワード表示切替
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

  // tokenからユーザー情報を取得
  const tokenCheck = async (e: string) => {
    const successToken = e
    await axios
      .post("http://localhost:3333/token",{
        successToken: successToken
      })
      .then((response) => {
        const user = response.data.result;
        const passedToken = response.data.passedToken;
        const userName = user[0].name
        setEmail("");
        setPwd("");

        if (user) {
          console.log("ログイン成功")
          // console.log(user)
          // console.log(passedToken)

          // localStarageへ保存
          localStorage.setItem(user.id, passedToken);
          navigate(`/home`)
        } else {
          alert(response.data.message)
        }
      })
      .catch((error) => {
        console.log("ログイン失敗")
        alert(error.response.data.message);
      })
  }

  // api通信処理
  const login = async (email: any, pwd: any) => {
    await axios
      .post("http://localhost:3333/login",{
        email: email,
        pwd: pwd
      })
      .then((response) => {
        const successToken = response.data.token;
        setEmail("");
        setPwd("");
        if (successToken) {
          tokenCheck(successToken)
        } else {
          alert(response.data.message)
        }
      })
      .catch((error) => {
        console.log("ログイン失敗")
        alert(error.response.data.message);
      })
  }

  // 入力箇所チェック
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, pwd);

    if (email === "" || pwd === "") {
      setMsg("未入力箇所があります。")
    } else {
      console.log("DBに値送信します")
      login(email, pwd);
    }
  };

  return (
    <>
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <div style={{ color: "red" }}>{msg}</div>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                {/* email */}
                <TextField
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete="off"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                />

                {/* password */}
                <TextField
                  id="password"
                  label="Password"
                  name="password"
                  type={isRevealPassword ? "text" : "password"}
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  autoComplete="off"
                  margin="normal"
                  required
                  fullWidth
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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link />
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 4, mb: 4 }} />
          </Container>
      </ThemeProvider>
    </>
  );
}