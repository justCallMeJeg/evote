import React from 'react'
import RealtimeTally from './realtime-tally';
import { getVotes } from '../lib/dbUtils';

export default async function RealtimeTallyPage () {
    const voteList = await getVotes();
    
  return <RealtimeTally voteList={voteList ?? []} />
}
