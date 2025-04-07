import React from 'react'
import { UserIcon } from '../components/icons'
import { getVoter } from '../lib/dbUtils'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  return (
   <div className="flex justify-center align-middle h-11/12 bg-base-200">
   <div className="card w-96 mt-20 mb-20 h-fit self-center">
      <form 
      action={async (formData: FormData) => {
         "use server"
         const voterID = formData.get('voterID') as string;
         const res = await getVoter(voterID);
         if (res == null) {
            redirect('/login/?status=error&message=Voter%20login%20failed! Try again.');
         } else {
            if (!res.verified) {
               redirect('/login/?status=error&message=Voter%20is%20not%20verified!');
            } else if (!res.voted) {
               redirect('/login/?status=error&message=Voter%20has%20already%20voted!');
            }
            redirect('/vote/?id=' + res.id);
         }
      }}
      className="card-body h-fit">
         <h2 className="card-title justify-center">Voter Login</h2>
         <div className="flex flex-col items-center mt-2">
            <label className="input input-bordered flex items-center gap-2 mb-2">
               <UserIcon/>
               <input name="voterID" type="text" className="grow" placeholder="Voter ID" />
            </label>
         </div>
         <div className="card-actions justify-end">
            <button type='submit' className="btn btn-primary w-full">Login</button>
         </div>
      </form>
  </div>
</div>
  )
}

export default LoginPage