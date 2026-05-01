export interface Alumnus {
  id: number;
  name: string;
  batch: number;
  role: string;
  city: string;
  initials: string;
}

export const alumni: Alumnus[] = [
  { id: 1, name: "Ramesh Kumar", batch: 2009, role: "Software Engineer, Infosys", city: "Hyderabad", initials: "RK" },
  { id: 2, name: "Priya Rao", batch: 2011, role: "Civil Engineer, TSTRANSCO", city: "Warangal", initials: "PR" },
  { id: 3, name: "Ali Hussain", batch: 2010, role: "Lecturer, JNTUH", city: "Hyderabad", initials: "AH" },
  { id: 4, name: "Kavita Sharma", batch: 2008, role: "Data Analyst, Accenture", city: "Bangalore", initials: "KS" },
  { id: 5, name: "Arjun Yadav", batch: 2009, role: "Founder, AgriTech Startup", city: "Peddapalli", initials: "AY" },
  { id: 6, name: "Deepika Reddy", batch: 2009, role: "Doctor, NIMS", city: "Peddapalli", initials: "DR" },
  { id: 7, name: "Rahul Sharma", batch: 2010, role: "Product Manager, Microsoft", city: "Hyderabad", initials: "RS" },
  { id: 8, name: "Sneha Gupta", batch: 2009, role: "Architect, Studio Nine", city: "Warangal", initials: "SG" },
  { id: 9, name: "Manish Patel", batch: 2011, role: "Civil Servant, IAS", city: "New Delhi", initials: "MP" },
  { id: 10, name: "Lakshmi Nair", batch: 2008, role: "VP Engineering, Flipkart", city: "Bangalore", initials: "LN" },
  { id: 11, name: "Suresh Goud", batch: 2012, role: "Chartered Accountant", city: "Karimnagar", initials: "SG" },
  { id: 12, name: "Anitha Verma", batch: 2013, role: "Teacher, Govt. School", city: "Peddapalli", initials: "AV" },
];
