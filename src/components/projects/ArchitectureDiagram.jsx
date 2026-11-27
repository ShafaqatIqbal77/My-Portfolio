const ArchitectureDiagram = () => {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-4 sm:p-6 overflow-x-auto">
      <svg
        viewBox="0 0 920 300"
        className="w-full min-w-[640px] h-auto select-none"
        role="img"
        aria-labelledby="ec2-arch-title ec2-arch-desc"
      >
        <title id="ec2-arch-title">
          Laravel Jobs Portal Deployment Architecture on AWS EC2
        </title>
        <desc id="ec2-arch-desc">
          Traffic flows from Browser through the Internet into an AWS EC2 Security Group allowing ports 22, 80, and 443. Inside EC2 on Ubuntu 26.04 LTS, Nginx routes PHP requests via php8.2-fpm.sock to PHP-FPM 8.2 and Laravel 9, which connects to MySQL 8.4 using a dedicated database user.
        </desc>

        <defs>
          <marker
            id="arch-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
          </marker>
          <marker
            id="arch-arrow-accent"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#06b6d4" />
          </marker>
        </defs>

        {/* Browser */}
        <g>
          <rect
            x="16"
            y="108"
            width="112"
            height="76"
            rx="14"
            fill="var(--bg-card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="72"
            y="141"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="13"
            fontWeight="700"
          >
            Browser
          </text>
          <text
            x="72"
            y="161"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="10.5"
          >
            HTTP / HTTPS
          </text>
        </g>

        {/* Arrow Browser -> Internet */}
        <line
          x1="128"
          y1="146"
          x2="168"
          y2="146"
          stroke="#6366f1"
          strokeWidth="2"
          markerEnd="url(#arch-arrow)"
        />

        {/* Internet */}
        <g>
          <rect
            x="174"
            y="108"
            width="106"
            height="76"
            rx="14"
            fill="var(--bg-card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="227"
            y="141"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="13"
            fontWeight="700"
          >
            Internet
          </text>
          <text
            x="227"
            y="161"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="10.5"
          >
            Public Traffic
          </text>
        </g>

        {/* Arrow Internet -> Security Group / EC2 */}
        <line
          x1="280"
          y1="146"
          x2="326"
          y2="146"
          stroke="#6366f1"
          strokeWidth="2"
          markerEnd="url(#arch-arrow)"
        />
        <text
          x="303"
          y="134"
          textAnchor="middle"
          fill="#6366f1"
          fontSize="10"
          fontWeight="700"
        >
          :80
        </text>

        {/* Security Group Boundary around EC2 */}
        <rect
          x="332"
          y="20"
          width="572"
          height="260"
          rx="20"
          fill="none"
          stroke="#6366f1"
          strokeWidth="1.75"
          strokeDasharray="6 5"
        />
        <rect
          x="348"
          y="10"
          width="244"
          height="22"
          rx="8"
          fill="var(--bg-primary)"
        />
        <text
          x="356"
          y="25"
          fill="#6366f1"
          fontSize="11"
          fontWeight="700"
        >
          Security Group (Inbound: 22, 80, 443)
        </text>

        {/* EC2 Instance Container */}
        <rect
          x="354"
          y="46"
          width="528"
          height="214"
          rx="16"
          fill="var(--bg-secondary)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <text
          x="372"
          y="71"
          fill="var(--text-primary)"
          fontSize="12.5"
          fontWeight="700"
        >
          AWS EC2 (ap-southeast-2 • Ubuntu 26.04 LTS)
        </text>
        <text
          x="864"
          y="71"
          textAnchor="end"
          fill="var(--text-muted)"
          fontSize="10.5"
        >
          /var/www (www-data)
        </text>

        {/* Nginx */}
        <g>
          <rect
            x="374"
            y="102"
            width="104"
            height="86"
            rx="12"
            fill="var(--bg-card)"
            stroke="#06b6d4"
            strokeWidth="1.5"
          />
          <text
            x="426"
            y="135"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="13"
            fontWeight="700"
          >
            Nginx
          </text>
          <text
            x="426"
            y="154"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="10"
          >
            Port 80 • /public
          </text>
          <text
            x="426"
            y="170"
            textAnchor="middle"
            fill="#06b6d4"
            fontSize="9.5"
            fontWeight="600"
          >
            try_files
          </text>
        </g>

        {/* Arrow Nginx -> PHP-FPM */}
        <line
          x1="478"
          y1="145"
          x2="514"
          y2="145"
          stroke="#06b6d4"
          strokeWidth="2"
          markerEnd="url(#arch-arrow-accent)"
        />
        <text
          x="496"
          y="133"
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="9"
        >
          .sock
        </text>

        {/* PHP-FPM */}
        <g>
          <rect
            x="520"
            y="102"
            width="106"
            height="86"
            rx="12"
            fill="var(--bg-card)"
            stroke="#8b5cf6"
            strokeWidth="1.5"
          />
          <text
            x="573"
            y="135"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="13"
            fontWeight="700"
          >
            PHP-FPM
          </text>
          <text
            x="573"
            y="154"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="10"
          >
            PHP 8.2
          </text>
          <text
            x="573"
            y="170"
            textAnchor="middle"
            fill="#8b5cf6"
            fontSize="9.5"
            fontWeight="600"
          >
            Sury repo
          </text>
        </g>

        {/* Arrow PHP-FPM -> Laravel */}
        <line
          x1="626"
          y1="145"
          x2="656"
          y2="145"
          stroke="#6366f1"
          strokeWidth="2"
          markerEnd="url(#arch-arrow)"
        />

        {/* Laravel */}
        <g>
          <rect
            x="662"
            y="102"
            width="92"
            height="86"
            rx="12"
            fill="var(--bg-card)"
            stroke="#6366f1"
            strokeWidth="1.5"
          />
          <text
            x="708"
            y="135"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="13"
            fontWeight="700"
          >
            Laravel 9
          </text>
          <text
            x="708"
            y="154"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="10"
          >
            Jobs Portal
          </text>
          <text
            x="708"
            y="170"
            textAnchor="middle"
            fill="#6366f1"
            fontSize="9.5"
            fontWeight="600"
          >
            .env + 775
          </text>
        </g>

        {/* Arrow Laravel -> MySQL */}
        <line
          x1="754"
          y1="145"
          x2="780"
          y2="145"
          stroke="#6366f1"
          strokeWidth="2"
          markerEnd="url(#arch-arrow)"
        />

        {/* MySQL */}
        <g>
          <rect
            x="786"
            y="102"
            width="82"
            height="86"
            rx="12"
            fill="var(--bg-card)"
            stroke="#06b6d4"
            strokeWidth="1.5"
          />
          <text
            x="827"
            y="135"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="13"
            fontWeight="700"
          >
            MySQL
          </text>
          <text
            x="827"
            y="154"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="10"
          >
            v8.4
          </text>
          <text
            x="827"
            y="170"
            textAnchor="middle"
            fill="#06b6d4"
            fontSize="9.5"
            fontWeight="600"
          >
            Least-priv
          </text>
        </g>

        {/* Bottom Legend inside EC2 */}
        <text
          x="374"
          y="236"
          fill="var(--text-muted)"
          fontSize="10.5"
        >
          Deployed manually over SSH using git clone • Dedicated MySQL user (no root in .env) • Default Nginx site removed
        </text>
      </svg>
    </div>
  );
};

export default ArchitectureDiagram;
