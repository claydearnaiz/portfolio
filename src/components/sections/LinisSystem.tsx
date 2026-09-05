/** Conceptual relationships from the résumé; no unverified deployment topology. */
export function LinisSystem() {
  return (
    <figure className="linis-system" aria-labelledby="linis-system-caption">
      <figcaption id="linis-system-caption">Two inputs. One connected view.</figcaption>
      <div className="system-inputs">
        <div className="system-node" data-system-node="0"><span>Physical readings</span><strong>ESP32</strong><small>Bin sensors</small></div>
        <div className="system-node" data-system-node="1"><span>Camera data</span><strong>Raspberry Pi</strong><small>YOLOv8n · NCNN</small></div>
      </div>
      <div className="system-merge" aria-hidden="true"><span /><span /></div>
      <div className="system-node system-center" data-system-node="2"><span>Synchronized data</span><strong>Firebase</strong></div>
      <div className="system-split" aria-hidden="true"><span /><span /></div>
      <div className="system-outputs">
        <div className="system-node" data-system-node="3"><span>Forecasting</span><strong>Random Forest</strong><small>Python · bin fill levels</small></div>
        <div className="system-node" data-system-node="4"><span>Monitoring</span><strong>Android app</strong><small>React Native</small></div>
      </div>
    </figure>
  );
}
