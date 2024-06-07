const Logout = () => {
  console.log("logoutページ来たよ")

  localStorage.clear();
   window.location.href = "/"

  return (
    <div></div>
  )
}

export default Logout;