import React from 'react';
import { alreadyVoted, Candidate, getCandidates, getPositions, getVoter, registerVote } from '../lib/dbUtils';
import { redirect } from 'next/navigation';

export default async function VotePage({searchParams}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
    const { id } = await searchParams;
    const voterId = id ? parseInt(id as string) : null;

    if (!voterId) {
        redirect('/login?status=error&message=You%20must%20login%20to%20vote!');
    }

    const voterData = await getVoter(voterId);
    if (!voterData) {
        redirect('/login?status=error&message=Voter%20not%20found!');
    }

    if (!voterData.verified) {
        redirect('/login?status=error&message=Voter%20not%20verified!');
    }

    if (await alreadyVoted(voterId)) {
        redirect('/login?status=error&message=You%20have%20already%20voted!');
    }
    
    const candidateList = await getCandidates() || [];
    const candidatePositions = await getPositions() || [];

    // Filter and sort candidates
    const filteredCandidates = candidateList.filter((candidate: Candidate) => 
        candidate.verified === true && candidate.group === voterData.group || candidate.group === null
    );

    if (filteredCandidates.length === 0) {
        redirect('/admin/?status=error&message=Candidates%20not%20found!');
    }

    const sortedCandidates = filteredCandidates.sort((a: Candidate, b: Candidate) => 
        a.position_id - b.position_id
    );

    // Group candidates by position
    const groupedCandidates = sortedCandidates.reduce((groups, candidate) => {
        const positionId = candidate.position_id;
        if (!groups[positionId]) {
            groups[positionId] = {
                positionName: candidatePositions.find((pos) => pos.id === positionId)?.name || 'N/A',
                candidates: [],
            };
        }
        groups[positionId].candidates.push(candidate);
        return groups;
    }, {} as Record<number, { positionName: string; candidates: Candidate[] }>);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="rounded-lg shadow-md w-full max-w-xl p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Welcome, {voterData.name}!</h2>
                <p className="text-sm text-center mb-6">Please select one candidate per position</p>
                <form
                    action={async (formData: FormData) => {
                        'use server';
                        console.log('Form data:', formData);
                        const vote = await registerVote({
                            id: voterId,
                            group: voterData.group,
                        }, JSON.stringify(Object.fromEntries(formData.entries())));

                        if (vote) {
                            redirect('/login?status=success&message=Vote%20submitted%20successfully!');
                        } else {
                            redirect('/login?status=error&message=Vote%20submission%20failed!');
                        }
                    }}
                    className="space-y-4"
                >
                    {Object.values(groupedCandidates).map((positionGroup) => (
                        <div key={positionGroup.positionName} className="p-4 rounded-md shadow-sm bg-base-200">
                            <h3 className="text-lg font-semibold mb-2">{positionGroup.positionName}</h3>
                            <div className="space-y-2">
                                {positionGroup.candidates.map((candidate) => (
                                    <label
                                        key={candidate.id}
                                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-base-300 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name={`${candidate.position_id}`}
                                            value={candidate.id}
                                            className="radio radio-blue"
                                        />
                                        <span className="flex-1 font-medium">{candidate.name}</span>
                                        <span className="text-sm text-gray-500">{candidate.group || ''}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="w-full font-bold py-2 px-4 rounded-md btn btn-primary">
                        Submit Vote
                    </button>
                </form>
            </div>
        </div>
    );
}
