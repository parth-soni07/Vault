export const generateMarketData = (risk: string, output: string | null) => {
  const volatility = risk === "Moderate" ? "Medium" : "Low";
  const trend = Math.random() > 0.5 ? "Upward" : "Downward";
  const percentage = (Math.random() * (risk === "Moderate" ? 5 : 2)).toFixed(2);

  return `Market Volatility: ${volatility}
Trend: ${trend}
Absolute Volatility: ${output}
Expected Change: ${percentage}%
Confidence: ${risk === "Moderate" ? "75%" : "92%"}`;
};
