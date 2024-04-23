// import React, { useState, useEffect } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase-config";

// function Signup() {
// //   const [registerEmail, setRegisterEmail] = useState("");
// //   const [registerPassword, setRegisterPassword] = useState("");
// //   const register = async () => {
// //     try {
// //       const user = await createUserWithEmailAndPassword(
// //         auth,
// //         registerEmail,
// //         registerPassword
// //       );
// //     } catch (error) {
// //       console.log(error.message);
// //     }
// //   };

//   return (
//     <>
//       <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//         <div class="sm:mx-auto sm:w-full sm:max-w-sm">
//           <img
//             class="mx-auto h-10 w-auto"
//             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//             alt="Your Company"
//           />
//           <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//             Register account
//           </h2>
//         </div>

//         <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <div class="space-y-6">
//             <div>
//               <label
//                 for="email"
//                 class="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Email address
//               </label>
//               <div class="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autocomplete="off"
//                 //   value={registerEmail}
//                 //   onChange={(e) => setRegisterEmail(e.target.value)}
//                   class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//             <div>
//               <div class="flex items-center justify-between">
//                 <label
//                   for="password"
//                   class="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Password
//                 </label>
//               </div>
//               <div class="mt-2">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                 //   value={registerPassword}
//                 //   onChange={(e) => setRegisterPassword(e.target.value)}
//                   class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 // onClick={register}
//                 class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Signup
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Signup;

import React, { useState, useEffect } from "react";

import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isIncorrectInfo, setIncorrectInfo] = useState(false);
  const { email, password } = user;

  console.log(email, password);

  const inputHandler = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const signup = async () => {
    const enteredEmail = email;
    const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const emailResult = emailPattern.test(enteredEmail);
    const enteredPassword = password;
    const passwordPattern = /^[a-zA-Z0-9]{8,20}$/;
    const passwordResult = passwordPattern.test(enteredPassword);

    console.log(emailResult, passwordResult);

    setEmailValid(!emailResult);
    setPasswordValid(!passwordResult);

    if (!emailResult || !passwordResult) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/attendance");
    } catch (e) {
      if (isEmailValid === false && isPasswordValid === false) {
        setIncorrectInfo(true);
      }
    }
  };

  //   useEffect(() => {
  //     onAuthStateChanged(auth, (currentUser) => {
  //       // currentUser?.uid && navigate("/attendance");
  //     });
  //   }, []);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={inputHandler}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={inputHandler}
                  onFocus={() => {
                    setPasswordValid(false);
                    setIncorrectInfo(false);
                  }}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={signup}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Signup
              </button>
            </div>

            <div className="text-center mb-5">
              <p className="mb-[-5px]">
                Already have an account?{" "}
                <Link to="/" className="text-brandColor font-bold">
                  Login
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-5">
            {isIncorrectInfo && (
              <p className="max-w-xs text-red-700 text-center">
                Sorry, your password was incorrect. Please double-check your
                password.
              </p>
            )}

            {isPasswordValid && (
              <p className="text-red-600 capitalize">
                password must be atleast 8 characters
              </p>
            )}

            {isEmailValid && (
              <p className="text-red-600 capitalize">email is not invalid</p>
            )}
          </div>

          {/* <button onClick={logout}>logout</button> */}
        </div>
      </div>
    </>
  );
}

export default Signup;
