export function incrementQuarter(currentQuarter: string): string {
  const [year, q] = currentQuarter.split("-Q");
  const quarterNum = parseInt(q);
  const yearNum = parseInt(year);

  if (quarterNum === 4) {
    // If it's Q4, move to Q1 of next year
    return `${yearNum + 1}-Q1`;
  } else {
    // Otherwise just increment the quarter
    return `${yearNum}-Q${quarterNum + 1}`;
  }
}

export function quarterToDate(quarter: string): string {
  const [year, q] = quarter.split("-Q");
  const quarterNum = parseInt(q);
  
  // Map quarter numbers to their first day
  const monthMap: { [key: number]: number } = {
    1: 0,  // January (0-based)
    2: 3,  // April
    3: 6,  // July
    4: 9   // October
  };
  
  const date = new Date(parseInt(year), monthMap[quarterNum], 1);
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
}

export function formatInvestorName(name: string): string {
  return name.toLowerCase().replace(" ", "_");
} 