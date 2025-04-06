import React from 'react'

const RegisterPage = () => {
  return (
    <div className="flex justify-center align-middle h-11/12 bg-base-200">
         <div className="card w-96 mt-20 mb-20 h-fit self-center">
            <div className="card-body h-fit">
               <h2 className="card-title justify-center">Register!</h2>
               <div className="flex flex-col items-center mt-2">
                  <label className="input input-bordered flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 opacity-70">
                     <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                  </svg>
                     <input type="text" className="grow" placeholder="Voter Name" />
                  </label>
                  <label className="input input-bordered flex items-center gap-2 mb-2">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                     </svg>
                     <input type="password" className="grow" placeholder="Password" />
                  </label>
               </div>
               <div className="card-actions justify-end">
                  <button className="btn btn-primary w-full">Register</button>
               </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage