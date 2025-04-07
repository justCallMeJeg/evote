'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getPositions, Vote } from '../lib/dbUtils';

interface Candidate {
    id: number;
    name: string;
    position_id: number;
}

interface Position {
    id: number;
    name: string;
    group: string | null; // Add group field
}

interface Tally {
    [candidateId: number]: number;
}

interface PositionTally {
    [positionId: number]: Tally;
}

export default function RealtimeTally({ voteList }: { voteList: Vote[] }) {
    const [votes, setVotes] = useState(voteList);
    const [tally, setTally] = useState<PositionTally>({});
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        const fetchCandidatesAndPositions = async () => {
            try {
                const { data: candidatesData, error: candidatesError } = await supabase
                    .from('candidates')
                    .select('id, name, position_id');
                if (candidatesError) {
                    console.error("Error fetching candidates:", candidatesError.message || candidatesError);
                } else {
                    console.log("Fetched candidates:", candidatesData);
                    setCandidates(candidatesData || []);
                }

                const candidatePositions = (await getPositions() || []).map(position => ({
                    ...position,
                    group: position.name || null,
                }));
                setPositions(candidatePositions);
            } catch (error) {
                console.error("Unexpected error during fetch:", error);
            }
        };
        fetchCandidatesAndPositions();
    }, []);

    useEffect(() => {
        const calculateTally = (currentVotes: Vote[]) => {
            const newTally: PositionTally = {};

            currentVotes.forEach(vote => {
                const ballot = typeof vote.ballot === 'string' ? JSON.parse(vote.ballot) : vote.ballot;

                for (const positionIdStr in ballot) {
                    const positionId = parseInt(positionIdStr);
                    const candidateId = parseInt(ballot[positionIdStr]);

                    if (!newTally[positionId]) {
                        newTally[positionId] = {};
                    }
                    if (!newTally[positionId][candidateId]) {
                        newTally[positionId][candidateId] = 0;
                    }
                    newTally[positionId][candidateId]++;
                }
            });
            setTally(newTally);
        };

        calculateTally(votes);
        setLoading(false);

        const channel = supabase.channel('realtime-votes').on('postgres_changes', {
            event: '*', schema: 'public', table: 'votes'
        }, (payload) => {
            if (payload.new) {
                setVotes(prevVotes => [...prevVotes, payload.new as Vote]);
            }
        }).subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
        };
    }, [votes, setVotes]);

    const getCandidateName = (candidateId: number) => {
        const candidate = candidates.find(c => c.id === candidateId);
        return candidate ? candidate.name : `Candidate ${candidateId}`;
    };

    const getPositionName = (positionId: number) => {
        const position = positions.find(p => p.id === positionId);
        return position ? position.name : `Position ${positionId}`;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6 text-white">Real-time Tally</h1>

                {loading ? (
                    <div className="text-center text-gray-400">Loading...</div>
                ) : Object.keys(tally).length === 0 ? (
                    <div className="text-center text-gray-400">No votes recorded yet.</div>
                ) : (
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full bg-gray-800 border border-gray-700 shadow-md rounded-lg">
                            <thead className="bg-gray-700 text-gray-200">
                                <tr>
                                    <th className="text-left p-4">Position</th>
                                    <th className="text-left p-4">Candidate</th>
                                    <th className="text-right p-4">Votes</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-900">
                                {Object.entries(tally).map(([positionId, candidateTally]) => (
                                    Object.entries(candidateTally).map(([candidateId, count]) => (
                                        <tr key={`${positionId}-${candidateId}`} className="hover:bg-gray-800/50 transition-colors">
                                            <td className="p-4 text-gray-300 font-medium">{getPositionName(parseInt(positionId))}</td>
                                            <td className="p-4 text-white">{getCandidateName(parseInt(candidateId))}</td>
                                            <td className="p-4 text-xl font-bold text-green-400 text-right">{count as number}</td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
