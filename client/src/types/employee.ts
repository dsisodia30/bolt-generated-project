
interface Employee {
  address: string;
  location: string;
  employmentType: string;
  phone: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  department: string;
  status: 'ACTIVE' | 'INACTIVE';
}


export type { Employee };
