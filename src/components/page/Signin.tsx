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
import { InputAdornment } from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/Visibility";
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

export default function SignIn() {
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // パスワード表示切替
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

  // api通信返事処理
  const login = async (email: any, password: any) => {
    await axios
      .post("http://localhost:3333/login", {
        email: email,
        password: password
      })
      .then((response) => {
        const result = response.data.result;
        if(result.length === 1) {
          console.log("ログイン成功")
          navigate("/blog-list")
        } else {
          alert("ログインに失敗しました。\n入力された情報が間違っています。")
        }
      })
      .catch((error) => {
        console.log("ログイン失敗")
        console.log(error);
      })
  }

  // DBのデータと照合チェック
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if(email === "" || password === "") {
      setMsg("未入力箇所があります。")
    } else {
      console.log("DBに値送信します")
      login(email, password);
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
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {/* password */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
  );
}