import { UserIcon, UsersIcon } from '../components/icons'
import { registerVoter } from '../lib/dbUtils'
import { redirect } from 'next/navigation';
import CardResponse from '../components/ui/CardResponse';

export default async function RegisterPage({searchParams}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
   const { status, message } = await searchParams

  return (
    <div className="flex justify-center align-middle h-11/12 bg-base-200">
         <div className='card w-96 mt-20 mb-20 h-fit self-center'>
            <form
            action={async (formData: FormData) => {
               'use server'
               const voterName = formData.get('voterName') as string
               const voterGroup = formData.get('voterGroup') as string
               if (!voterName || !voterGroup) {
                  redirect('/register/?status=error&message=Please%20fill%20all%20fields!');
               }
               const res = await registerVoter({ name: voterName, group: voterGroup });
               if (res) {
                  redirect('/register/?status=success&message=Voter%20registered%20successfully! Login with Voter ID: ' + res.id);
               } else {
                  redirect('/register/?status=error&message=Voter%20registration%20failed! Try again.');
               }
            }}
            className="card w-96 mt-20 mb-20 h-fit self-center">
               <div className="card-body h-fit">
                  <h2 className="card-title justify-center">Voter Registration</h2>
                  <div className="flex flex-col items-center mt-2">
                     <label className="input input-bordered flex items-center gap-2 mb-2">
                        <UserIcon/>
                        <input name="voterName" type="text" className="grow" placeholder="Voter Name" />
                     </label>
                     <label className="input input-bordered flex items-center gap-2 mb-2">
                        <UsersIcon/>
                        <input name="voterGroup" type="text" className="grow" placeholder="Group" />
                     </label>
                  </div>
                  <div className="card-actions justify-end">
                     <button className="btn btn-primary w-full">Register</button>
                  </div>
               </div>
               <>
               {status === 'error' && message && CardResponse(message as string, 'error')}
               {status === 'success' && message && CardResponse(message as string, 'success')}
               </>
                    </form>
         </div>
    </div>
  )
}
