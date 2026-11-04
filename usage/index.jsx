// Grok Bot weekly usage widget for Übersicht (https://tracesof.net/uebersicht/)
// Reads usage.json in this folder every 5 minutes.
export const command = "cat \"$HOME/Library/Application Support/Übersicht/widgets/usage/usage.json\"";
export const refreshFrequency = 300000;
export const className = {
  top: "60px", right: "30px", width: "270px", padding: "14px 16px",
  background: "rgba(20,20,24,0.85)", borderRadius: "14px", color: "#f2f2f2",
  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "12px",
  zIndex: 10
};
export const render = ({ output, error }) => {
  if (error) return <div>Usage widget error: {String(error)}</div>;
  if (!output) return <div>Loading usage...</div>;
  let d;
  try { d = JSON.parse(output); } catch (e) { return <div>usage.json is not valid JSON</div>; }
  const left = (100 - d.poolUsed).toFixed(1);
  const color = d.poolUsed < 60 ? "#4ade80" : d.poolUsed < 85 ? "#facc15" : "#f87171";
  return (
    <div>
      <div style={{fontWeight: 600, fontSize: "13px"}}>Weekly usage pool</div>
      <div style={{height: "8px", background: "rgba(255,255,255,0.15)", borderRadius: "4px", overflow: "hidden", margin: "6px 0 4px"}}>
        <div style={{width: d.poolUsed + "%", height: "100%", background: color}} />
      </div>
      <div style={{fontSize: "20px", fontWeight: 600}}>{left}% left</div>
      <div style={{opacity: 0.8}}>{d.poolUsed}% used · Grok Bot {d.grokBot}% · Other apps {d.otherApps}%</div>
      <div style={{opacity: 0.8, marginBottom: "8px"}}>Resets {d.resets}</div>
      {d.bots && d.bots.length > 0 && <div style={{fontWeight: 600, marginBottom: "4px"}}>Grok Bot by bot</div>}
      {(d.bots || []).map((b) => (
        <div key={b[0]} style={{display: "flex", justifyContent: "space-between"}}><span>{b[0]}</span><span>{b[1]}%</span></div>
      ))}
      <div style={{opacity: 0.55, marginTop: "8px", fontSize: "10px"}}>As of {d.asOf}</div>
    </div>
  );
};
