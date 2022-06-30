import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  useEffect(() => {
    async function check() {
      const response = await getRedirectResult(auth);
      // console.log(response);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    }
    check();
  }, []);
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(user);
  };
  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
