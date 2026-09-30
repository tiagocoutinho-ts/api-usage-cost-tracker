export interface ApiLogStruct {
  id: string;
  projectId: string;
  tokens: number;
  cost: number;
  endpoint: string;
  createdAt: Date | string;
}

export interface ProjectsDataStruct {
  id: string;
  name: string;
  budget: number;
  createdAt: Date | string;
  logs?: ApiLogStruct[];
}