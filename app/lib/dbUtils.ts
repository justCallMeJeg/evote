import { supabase } from './supabaseClient';

// Define types for your database data
export interface Voter {
    id: number;
    name: string;
    group: string;
    verified: boolean;
    voted: boolean;
    created_at: string;
}

export interface Candidate {
    id: number;
    name: string;
    position_id: number;
    group: string;
    verified: boolean;
    created_at: string;
}

export interface Position {
    id: number;
    name: string;
    created_at: string;
}

export interface Election {
    id: number;
    name: string;
    ongoing: boolean;
    finished: boolean;
    created_at: string;
}

export interface Vote {
    id: number;
    voter_id: string;
    ballot: Buffer;
    position_id: number;
    group: string;
    created_at: string;
}

// Utility Functions
export async function getVoter(id: number): Promise<Voter | null> {
    const { data, error } = await supabase
        .from('voters')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching voter:', error);
        return null;
    }
    return data ? data as Voter : null;
}

export async function registerVoter(voter: Omit<Voter, 'id' | 'created_at' | 'verified' | 'voted'>): Promise<Voter | null> {
    const { data, error} = await supabase.from('voters').insert([voter]).select();

    if (error) {
        console.error('Error registering voter:', error.message);
        return null;
    } else {
        console.log('Registering voter:', data);
        return data ? data[0] as Voter : null;
    }
}

export async function addVoter(voter: Omit<Voter, 'id' | 'created_at' | 'voted'>): Promise<Voter | null> {
    const { data, error } = await supabase
        .from('voters')
        .insert([voter])
        .select();
    
    if (error) {
        console.error('Error adding voter:', error.message);
        return null;
    }
    return data ? data[0] as Voter : null;
}

export async function updateVoter(voter: Omit<Voter, | 'created_at' | 'voted'>): Promise<Voter | null> {
    const { data, error } = await supabase
        .from('voters')
        .update(voter)
        .eq('id', voter.id)
        .select();
    
    if (error) {
        console.error('Error updating voter:', error.message);
        return null;
    }
    return data ? data[0] as Voter : null;
}

export async function deleteVoter(voterId: number): Promise<boolean> {
    const { error } = await supabase
        .from('voters')
        .delete()
        .eq('id', voterId);

    if (error) {
        console.error('Error deleting candidate:', error.message);
        return false;
    }
    return true;
}

export async function getVoters(): Promise<Voter[] | null> {
    const { data, error } = await supabase
        .from('voters')
        .select('*');

    if (error) {
        console.error('Error fetching voters:', error);
        return null;
    }
    return data ? data as Voter[] : null;
}

export async function getCandidate(candidateId: number): Promise<Candidate | null> {
    const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', candidateId)
        .single();

    if (error) {
        console.error('Error fetching candidate:', error);
        return null;
    }
    return data ? data as Candidate : null;
}

export async function getCandidates(): Promise<Candidate[] | null> {
    const { data, error } = await supabase
        .from('candidates')
        .select('*');

    if (error) {
        console.error('Error fetching candidates:', error);
        return null;
    }
    return data ? data as Candidate[] : null;
}

export async function getCandidatesByPosition(positionId: number): Promise<Candidate[] | null> {
    const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('position_id', positionId);

    if (error) {
        console.error('Error fetching candidates:', error);
        return null;
    }
    return data ? data as Candidate[] : null;
}

export async function registerCandidate(candidate: Omit<Candidate, 'id' | 'created_at'>): Promise<boolean> {
    const { data, error } = await supabase
        .from('candidates')
        .insert([candidate]);

    if (error) {
        console.error('Error registering candidate:', error);
        return false;
    }
    return data ? true : false;
}

export async function addCandidate(candidate: Omit<Candidate, 'id' | 'created_at'>): Promise<Candidate | null> {
    const { data, error } = await supabase
        .from('candidates')
        .insert([candidate])
        .select();
    
    if (error) {
        console.error('Error adding candidate:', error.message);
        return null;
    }
    return data ? data[0] as Candidate : null;
}

export async function updateCandidate(candidate: Omit<Candidate, 'created_at'>): Promise<Candidate | null> {
    const { data, error } = await supabase
        .from('candidates')
        .update(candidate)
        .eq('id', candidate.id)
        .select();
    
    if (error) {
        console.error('Error updating candidate:', error.message);
        return null;
    }
    return data ? data[0] as Candidate : null;
}

export async function deleteCandidate(candidateId: number): Promise<boolean> {
    const { error } = await supabase
        .from('candidates')
        .delete()
        .eq('id', candidateId);

    if (error) {
        console.error('Error deleting candidate:', error.message);
        return false;
    }
    return true;
}

export async function getPosition(positionId: number): Promise<Position | null> {
    const { data, error } = await supabase
        .from('positions')
        .select('*')
        .eq('id', positionId)
        .single();

    if (error) {
        console.error('Error fetching position:', error);
        return null;
    }
    return data ? data as Position : null;
}

export async function getPositions(): Promise<Position[] | null> {
    const { data, error } = await supabase
        .from('positions')
        .select('*');

    if (error) {
        console.error('Error fetching positions:', error);
        return null;
    }
    return data ? data as Position[] : null;
}

export async function getElection(electionId: number): Promise<Election | null> {
    const { data, error } = await supabase
        .from('elections')
        .select('*')
        .eq('id', electionId)
        .single();

    if (error) {
        console.error('Error fetching election:', error);
        return null;
    }
    return data ? data as Election : null;
}

export async function getElections(): Promise<Election[] | null> {
    const { data, error } = await supabase
        .from('elections')
        .select('*');

    if (error) {
        console.error('Error fetching elections:', error);
        return null;
    }
    return data ? data as Election[] : null;
}

export async function registerVote(vote: Pick<Voter, 'id' | 'group'>, ballot: string): Promise<boolean | null> {
    const { error } = await supabase.from('votes').insert([{
        voter_id: vote.id,
        ballot: ballot,
        group: vote.group,
    }]);

    if (error) {
        console.error('Error registering vote:', error);
        return false;
    }
    return true;
}

export async function getVotes(): Promise<Vote[] | null> {
    const { data, error } = await supabase
        .from('votes')
        .select('*')

    if (error) {
        console.error('Error fetching votes:', error);
        return null;
    }
    return data ? data as Vote[] : null;
}

export async function alreadyVoted(voterId: number): Promise<boolean> {
    const { error } = await supabase
        .from('votes')
        .select('*')
        .eq('voter_id', voterId)
        .single();

    if (error) {
        console.error('Error fetching vote:', error);
        return false;
    }
    return true;
}


export async function tallyVotes(): Promise<Record<number, Record<number, number>> | null> {
    const { data, error } = await supabase
        .from('votes')
        .select('candidate_id, position_id')

    if (error) {
        console.error('Error fetching election results:', error);
        return null;
    }

    const tally: Record<number, Record<number, number>> = {};
    (data as { candidate_id: number; position_id: number }[]).forEach(vote => {
        if (!tally[vote.position_id]) {
            tally[vote.position_id] = {};
        }
        if (!tally[vote.position_id][vote.candidate_id]) {
            tally[vote.position_id][vote.candidate_id] = 0;
        }
        tally[vote.position_id][vote.candidate_id]++;
    });
    return tally;
}
