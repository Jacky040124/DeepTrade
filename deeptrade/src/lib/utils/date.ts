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