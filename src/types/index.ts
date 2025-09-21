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
