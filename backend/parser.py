

def parse_log_file(filepath):
    results = []
    ip_request_count = {}

    with open(filepath, 'r') as file:
        for line in file:
            parts = line.strip().split(',')
            if len(parts) >= 30:
                try:
                    # Fixed index alignment
                    src_ip = parts[21].strip('"')
                    dest_ip = parts[22].strip('"')
                    method = parts[23].strip('"')
                    status = parts[24].strip('"')
                    user_agent = parts[25].strip('"')
                    firewall = parts[28].strip('"')
                    action = parts[4].strip('"')

                    ip_request_count[src_ip] = ip_request_count.get(src_ip, 0) + 1

                    anomaly = False
                    reasons = []
                    confidence = 0.0

                    if action == "Blocked" and status == "403":
                        anomaly = True
                        reasons.append("Blocked request with status 403")
                        confidence = max(confidence, 0.85)

                    if ip_request_count[src_ip] > 5:
                        anomaly = True
                        reasons.append("Unusual number of requests from a single IP")
                        confidence = max(confidence, 0.95)

                    results.append({
                        "timestamp": parts[0].strip('"'),
                        "source_user": parts[1].strip('"'),
                        "protocol": parts[2].strip('"'),
                        "url": parts[3].strip('"'),
                        "action": action,
                        "app_name": parts[5].strip('"'),
                        "category": parts[6].strip('"'),
                        "request_size": parts[7].strip('"'),
                        "response_size": parts[8].strip('"'),
                        "src_ip": src_ip,
                        "dest_ip": dest_ip,
                        "method": method,
                        "status_code": status,
                        "user_agent": user_agent,
                        "firewall": firewall,
                        "anomaly": anomaly,
                        "reason": "; ".join(reasons) if anomaly else None,
                        "confidence": confidence if anomaly else None
                    })
                except IndexError:
                    continue

    
    return results
