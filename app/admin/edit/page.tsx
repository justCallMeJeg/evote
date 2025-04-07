import { Candidate, deleteCandidate, deleteVoter, getCandidate, getPositions, getVoter, updateCandidate, updateVoter } from '@/app/lib/dbUtils';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AdminEditPage ({searchParams}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
  const { candidate, voter } = await searchParams
  const candidateId = candidate ? parseInt(candidate as string) : null;
  const voterId = voter ? parseInt(voter as string) : null;
  let data = null;
  let posData = null;
  if (!candidateId && voterId) {
    data = await getVoter(voterId);
    if (!data) {
      redirect('/admin/?status=error&message=Voter%20not%20found!');
    }
  } else if (!voterId && candidateId) {
    data = await getCandidate(candidateId);
    posData = await getPositions() || [];
    if (!data) {
      redirect('/admin/?status=error&message=Candidate%20not%20found!');
    }
  }

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
        if (!candidateId && voterId) {
          res = await updateVoter({
            id: voterId,
            name: dataName, 
            group: dataGroup,
            verified: dataVerified == 'on' ? true : false,
          });
        } else if (!voterId && candidateId) {
          const positionId = formData.get('voterPosition') as string

          res = await updateCandidate({
            id: candidateId,
            name: dataName,
            position_id: parseInt(positionId),
            group: dataGroup,
            verified: dataVerified == 'on' ? true : false,
          });
        }
        console.log(res)
        if (res) {
          if (candidateId && !voterId) {
            redirect('/admin/?status=success&message=Candidate%20updated%20successfully!');
          } else if (!candidateId && voterId) {
            redirect('/admin/?status=success&message=Voter%20updated%20successfully!');
          }
        } else {
          if (candidateId && !voterId) {
            redirect('/admin/?status=error&message=Candidate%20update%20failed!%20Try%20again.');
          } else if (!candidateId && voterId) {
            redirect('/admin/?status=error&message=Voter%20update%20failed!%20Try%20again.');
          }
        }
      }}
      className="card w-96 mt-20 mb-20 h-fit self-center">
         <div className="card-body h-fit">
            <h2 className="card-title justify-center">Edit {candidateId && !voterId ? 'Candidate' : 'Voter'} Details</h2>
            <div className="flex flex-col items-center mt-2">
               <label className="input input-bordered flex items-center gap-2 mb-2">
                  <input name="voterName" type="text" className="grow" placeholder="Voter Name" defaultValue={data?.name}/>
               </label>
               <label className='flex items-center gap-2 mb-2'>
                 <>
                 {candidateId && !voterId ?
                    <select className="select" name="voterPosition" defaultValue={(data as Candidate)?.position_id}>
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
                  <input name="voterGroup" type="text" className="grow" placeholder="Group" defaultValue={data?.group}/>
               </label>
               <label className="flex items-center gap-2 mb-2">
                  <input name="voterVerified" type="checkbox" className="checkbox checkbox-primary" defaultChecked={data?.verified}/> Verified
               </label>
            </div>
            <div className="card-actions justify-end">
               <button className="btn btn-primary w-full">Confirm Edit</button>
               <button 
               onClick={async () => {
                'use server'
                let res = false;

                if (candidateId && !voterId) {
                  res = await deleteCandidate(data?.id as number);
                } else if (!candidateId && voterId) {
                  res = await deleteVoter(data?.id as number);
                }

                if (res) {
                  if (candidateId && !voterId) {
                    redirect('/admin/?status=success&message=Candidate%20deleted%20successfully!');
                  } else if (!candidateId && voterId) {
                    redirect('/admin/?status=success&message=Voter%20deleted%20successfully!');
                  }
                } else {
                  if (candidateId && !voterId) {
                    redirect('/admin/?status=error&message=Candidate%20deletion%20failed!%20Try%20again.');
                  } else if (!candidateId && voterId) {
                    redirect('/admin/?status=error&message=Voter%20deletion%20failed!%20Try%20again.');
                  }
                }
               }}
               className='btn bg-red-400 w-full'>Delete</button>
            </div>
         </div>
      </form>
    </div>
  )
}
