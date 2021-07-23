import GoogleLogin from "react-google-login";
import cookie from "react-cookies";

const Google = ({text}) => {
  const handleLogin = async (googleData) => {

    const body = JSON.stringify({ tokenId: googleData.tokenId })

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    }

    await fetch("https://doc-diff.herokuapp.com/users/google", requestOptions).then((response) => {
      const data = response.json();
      if(response.status===200)
          {
            cookie.save("key", googleData.profileObj.email, { path: "/" });
            window.location.href = "https://flamboyant-meitner-14e281.netlify.app/projects"
          }
      return data;
    }).then((data) => {

      if (data.status === 200) {
        // Redirect here
        console.log("Login Successful");
      } else {
        // Error handling
        console.log("Login Unsuccessful");
      }
    })
      .catch((error) => { console.log(error.message); });
  };

  return (
    <GoogleLogin
      clientId="386647217720-lmsafghdplskeosdav51kdh0tu6c2sdq.apps.googleusercontent.com"
      buttonText={text}
      onSuccess={handleLogin}
      className="google"
      onFailure={(error) => { console.log(error) }}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default Google;
