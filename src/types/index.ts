export type Campaign = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  goalAmount: number;
  raisedAmount: number;
  images: string[];
  deadline: string; // ISO string
  ngo: {
    name: string;
    logo: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // Should be handled securely on a real backend
  role: 'donor' | 'ngo';
};
