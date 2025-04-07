import { addCandidate, addVoter, getPositions } from '@/app/lib/dbUtils';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AdminAddPage ({searchParams}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
  const { type } = await searchParams
  const addType = type ? type : null;
  const posData = await getPositions() || [];   
  
  return (
    //Edit Form
    <div className="flex justify-center align-middle h-11/12 bg-base-200">
      <form 
      action={async (formData: FormData) => {
        'use server'
        const dataName = formData.get('voterName') as string
        const dataGroup = formData.get('voterGroup') as string
        const dataVerified = formData.get('voterVerified')
        let res = null;
        if (addType == "voter") {
          res = await addVoter({
            name: dataName, 
            group: dataGroup,
            verified: dataVerified == 'on' ? true : false,
          });
        } else if (addType == "candidate") {
            const positionId = formData.get('voterPosition') as string
          res = await addCandidate({
            name: dataName,
            position_id: parseInt(positionId),
            group: dataGroup,
            verified: dataVerified == 'on' ? true : false,
          });
        }
        console.log(res)
        if (res) {
          if (addType == "voter") {
            redirect('/admin/?status=success&message=Voter%20added%20successfully!');
          } else if (addType == "candidate") {
            redirect('/admin/?status=success&message=Candidate%20added%20successfully!');
          }
        } else {
          if (addType == "voter") {
            redirect('/admin/?status=error&message=Voter%20registration%20failed!%20Try%20again.');
          } else if (addType == "candidate") {
            redirect('/admin/?status=error&message=Candidate%20registration%20failed!%20Try%20again.');
          }
        }
      }}
      className="card w-96 mt-20 mb-20 h-fit self-center">
         <div className="card-body h-fit">
            <h2 className="card-title justify-center">Add {addType == 'candidate' ? 'Candidate' : 'Voter'}</h2>
            <div className="flex flex-col items-center mt-2">
               <label className="input input-bordered flex items-center gap-2 mb-2">
                  <input name="voterName" type="text" className="grow" placeholder="Voter Name"/>
               </label>
               <label className='flex items-center gap-2 mb-2'>
                 <>
                 {addType == 'candidate'?
                    <select className="select" name="voterPosition">
                      {posData && posData.map((pos) => (
                        <option key={pos.id} value={pos.id}>
                          {pos.name}
                        </option>
                      ))}
                    </select>
                    : null
                  }
                 </>
               </label>
               <label className="input input-bordered flex items-center gap-2 mb-2">
                  <input name="voterGroup" type="text" className="grow" placeholder="Group"/>
               </label>
               <label className="flex items-center gap-2 mb-2">
                  <input name="voterVerified" type="checkbox" className="checkbox checkbox-primary"/> Verified
               </label>
            </div>
            <div className="card-actions justify-end">
               <button className="btn btn-primary w-full">Register</button>
            </div>
         </div>
      </form>
    </div>
  )
}
