import React from 'react'
import { Candidate, getCandidates, getPositions, getVoters, Position, Voter } from '../lib/dbUtils'
import Link from 'next/link';

export default async function AdminPage(){

  // const voterList: Voter[] = [];
  const voterList: Voter[] = (await getVoters()) || [];
  const candidateList: Candidate[] = (await getCandidates()) || [];
  const positionList: Position[] = await getPositions() || [];


  return (
    <div className="flex flex-1 py-4 h-screen sm:h-fit flex-col space-y-2 px-4">
      <div className="flex items-center justify-between p-2">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button className='btn btn-primary'>Start Election</button>
      </div>
      <div className="bg-base-200 rounded-lg shadow-md p-4 flex flex-col space-y-2">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-xl font-bold">Voter List</h2>
          <button className='btn btn-secondary'>Add New Voter</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Voter ID</th>
                <th>Name</th>
                <th>Verified?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <>
              {voterList && voterList.map((voter) => (
                <tr key={voter.id}>
                  <td>{voter.id}</td>
                  <td>{voter.name}</td>
                  <td>{voter.verified ? 'TRUE' : 'FALSE'}</td>
                  <td className='flex space-x-2'>
                    <button className='btn'>Edit</button>
                  </td>
                </tr>
              ))}
              </>
            </tbody>
          </table>
        </div>
      </div>
        <div className="bg-base-200 rounded-lg shadow-md p-4 flex flex-col space-y-2">
          <div className="flex items-center justify-between p-2">
            <h2 className="text-xl font-bold">Candidate List</h2>
            <button className='btn btn-secondary'>Add New Candidate</button>
          </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Candidate ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Group</th>
                <th>Verified?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <>
              {candidateList && candidateList.map((candidate) => (
                <tr key={candidate.id}>
                  <td>{candidate.id}</td>
                  <td>{candidate.name}</td>
                  <td>{positionList.find((position) => position.id === candidate.position_id)?.name}</td>
                  <td>{candidate.group}</td>
                  <td>{candidate.verified ? 'TRUE' : 'FALSE'}</td>
                  <td className='flex space-x-2'>
                    <Link href={"./admin/edit/?candidate=" + candidate.id} className='btn'>Edit</Link>
                  </td>
                </tr>
              ))}
              </>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
