import { signInWithGoogle } from "../../../services/firebase"; 

const GButton = (props) => {
  return (
    <div className={`"googleBtn" + ${props.className}`}>
      <button className="google" onClick={signInWithGoogle}>
      <svg width="27" height="24" viewBox="0 0 51 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M43.1588 22.8833C43.1588 21.6868 43.039 20.5362 42.8166 19.4316H25.0922V25.9592H35.2204C34.7842 28.0686 33.4583 29.8558 31.4651 31.0524V35.2865H37.5472C41.1057 32.3487 43.1588 28.0225 43.1588 22.8833Z" fill="#4285F4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.0926 39.3748C30.1739 39.3748 34.4339 37.8637 37.5476 35.2864L31.4655 31.0524C29.7804 32.0649 27.6247 32.6632 25.0926 32.6632C20.1911 32.6632 16.0423 29.6947 14.5624 25.7061H8.27502V30.0782C11.3717 35.5933 17.736 39.3748 25.0926 39.3748Z" fill="#34A853"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5623 25.7061C14.1859 24.6936 13.9721 23.612 13.9721 22.4998C13.9721 21.3876 14.1859 20.306 14.5623 19.2935V14.9214H8.27494C7.00036 17.1995 6.27325 19.7768 6.27325 22.4998C6.27325 25.2228 7.00036 27.8001 8.27494 30.0782L14.5623 25.7061Z" fill="#FBBC05"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.0926 12.3366C27.8557 12.3366 30.3364 13.1881 32.2868 14.8602L37.6845 10.0202C34.4253 7.29716 30.1653 5.625 25.0926 5.625C17.736 5.625 11.3717 9.40654 8.27502 14.9216L14.5624 19.2938C16.0423 15.3051 20.1911 12.3366 25.0926 12.3366Z" fill="#EA4335"/>
</svg>

        {/* <i class="bi bi-google">Continue with Google</i> */}
        <span className="texts">{props.text}</span>
      </button>
    </div>
  );
};

export default GButton;
