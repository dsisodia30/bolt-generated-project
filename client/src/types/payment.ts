interface Employee {
  firstName: string;
  lastName: string;
}

interface Payment {
  id: string;
  employee: Employee;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

export type { Payment };
