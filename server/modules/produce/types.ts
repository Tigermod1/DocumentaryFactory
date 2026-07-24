export interface ProduceRequest {
  projectId: string;
  output: string;
}

export interface ProduceResult {
  success: boolean;
  output: string;
  files: string[];
}