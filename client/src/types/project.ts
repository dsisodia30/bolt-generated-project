interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'On Hold';
}

export type { Project };


export interface Leave {
  id: number;
  employee: {
    firstName: string;
    lastName: string;
  };
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: string;
}

