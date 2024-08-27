export interface Candidate {
  candidateId: number;
  candidateName: string;
}

export interface VoteRoom {
  voteRoomVC: number;
  voteRoomId: number;
  voteRoomName: string;
  candidates: Candidate[];
}
