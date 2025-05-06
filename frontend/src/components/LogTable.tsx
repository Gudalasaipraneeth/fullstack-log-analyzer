import React from 'react';

type LogEntry = {
    timestamp: string;
    src_ip: string;
    dest_ip: string;
    url: string;
    action: string;
    method: string;
    status_code: string;
    source_user: string;
    anomaly?: boolean;
    reason?: string;
    confidence?: number;

  };
  
  const LogTable: React.FC<{ data: LogEntry[] }> = ({ data }) => {
    return (
      <table border={1}>
<thead>
  <tr>
    <th>Timestamp</th>
    <th>Src IP</th>
    <th>Dest IP</th>
    <th>URL</th>
    <th>Action</th>
    <th>Method</th>
    <th>Status</th>
    <th>User</th>
    <th>Anomaly Reason</th>

  </tr>
</thead>

        <tbody>
          {data.map((log, i) => (
            <tr key={i} style={{ backgroundColor: log.anomaly ? '#ffe5e5' : 'white' }}>
              <td>{log.timestamp}</td>
              <td>{log.src_ip}</td>
              <td>{log.dest_ip}</td>
              <td>{log.url}</td>
              <td>{log.action}</td>
              <td>{log.method}</td>
              <td>{log.status_code}</td>
              <td>{log.source_user}</td>
              <td>{log.anomaly ? `${log.reason} (Confidence: ${Math.round(log.confidence! * 100)}%)` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  

export default LogTable;
