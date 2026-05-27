export interface EducationEntry {
  dates: string;
  school: string;
  degree: string;
  schoolUrl?: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    dates: "August 2013 to May 2017",
    school: "Whitworth University",
    degree: "B.S. Biochemistry",
    schoolUrl: "https://www.whitworth.edu/",
  },
];
