interface commentType {
  userAvaterUrl: string;
  releaseTime: string;
  text: string;
  isDeleted: boolean;
  replies: commentType[];
}

export default commentType;
