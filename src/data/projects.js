export const projects = [
  {
    id: 7,
    title: "Laravel Jobs Portal on AWS EC2",
    category: "DevOps",
    status: "In Progress",
    featured: true,
    description: "Deployed an existing Laravel 9 jobs portal on a single AWS EC2 instance from scratch over SSH — Nginx, PHP-FPM 8.2, MySQL 8.4, a least-privilege database user, and a locked-down security group. Includes a full case study: architecture, deployment timeline, troubleshooting log, and lessons learned.",
    tech: ["AWS EC2", "Ubuntu 26.04", "Nginx", "PHP-FPM 8.2", "MySQL 8.4", "Laravel 9", "SSH", "Git"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    github: "https://github.com/ShafaqatIqbal77",
    demo: null,
    caseStudy: {
      region: "ap-southeast-2",
      os: "Ubuntu 26.04 LTS",
      steps: [
        {
          title: "Launch the EC2 instance",
          detail: "Provisioned an Ubuntu 26.04 LTS instance in ap-southeast-2 and connected over SSH using a key pair."
        },
        {
          title: "Install the application stack",
          detail: "Installed Nginx, MySQL 8.4, Composer and Git, then added the packages.sury.org repository to install PHP 8.2-FPM — the newest PHP version Laravel 9 supports."
        },
        {
          title: "Create the database",
          detail: "Created a dedicated MySQL database and a least-privilege user instead of using root, with credentials stored in .env."
        },
        {
          title: "Clone and configure the app",
          detail: "Cloned the repository with git into /var/www so updates can be pulled, installed Composer dependencies, and generated the application key."
        },
        {
          title: "Set ownership and permissions",
          detail: "Set ownership to www-data and 775 permissions on storage and bootstrap/cache so PHP-FPM can write logs and cache files."
        },
        {
          title: "Configure Nginx",
          detail: "Wrote a server block pointing to /public with try_files and the PHP 8.2-FPM socket, and removed the default site that conflicted on port 80."
        },
        {
          title: "Verify and harden",
          detail: "Opened only ports 22, 80 and 443 in the security group and verified the site end-to-end in the browser."
        }
      ],
      troubleshooting: [
        {
          problem: "\"Unable to locate package php8.3-*\"",
          cause: "Ubuntu 26.04 ships only PHP 8.5, and Laravel 9 supports up to PHP 8.2 — PHP 8.3 packages simply don't exist for this release.",
          fix: "Added the packages.sury.org repository and installed PHP 8.2 with the required extensions.",
          code: "sudo add-apt-repository ppa:ondrej/php\nsudo apt update\nsudo apt install php8.2-fpm php8.2-mysql php8.2-xml php8.2-mbstring php8.2-curl"
        },
        {
          problem: "composer install failed on the lock file",
          cause: "Old locked packages (nette/schema, nette/utils, phpspec/prophecy) only support PHP versions below 8.2.",
          fix: "Updated only those packages instead of regenerating the whole lock file.",
          code: "composer update nette/schema nette/utils phpspec/prophecy"
        },
        {
          problem: "HTTP 500 — Carbon::setLastErrors() TypeError",
          cause: "The locked version of nesbot/carbon is incompatible with PHP 8.2.",
          fix: "Updated nesbot/carbon to 2.73.0.",
          code: "composer update nesbot/carbon"
        },
        {
          problem: "HTTP 500 — \"Access denied for user 'root'@'localhost'\"",
          cause: "The .env file still pointed at the MySQL root user.",
          fix: "Created a dedicated least-privilege database user and updated .env to use it.",
          code: "CREATE USER 'jobs_user'@'localhost' IDENTIFIED BY 'your_db_password';\nGRANT ALL PRIVILEGES ON your_database.* TO 'jobs_user'@'localhost';\nFLUSH PRIVILEGES;"
        },
        {
          problem: "\"Permission denied\" writing to storage/logs/laravel.log",
          cause: "The storage directory wasn't writable by the web user (www-data).",
          fix: "Set ownership to www-data, relaxed permissions on storage and bootstrap/cache, and ran artisan commands as www-data.",
          code: "sudo chown -R www-data:www-data /var/www/jobs-portal\nsudo chmod -R 775 storage bootstrap/cache\nsudo -u www-data php artisan config:clear"
        },
        {
          problem: "Nginx \"conflicting server name\" and PHP-FPM socket mismatch",
          cause: "The default site was still enabled on port 80, and the config pointed at a php8.3-fpm socket that doesn't exist.",
          fix: "Removed the default site and corrected the socket path to php8.2-fpm.sock.",
          code: "sudo rm /etc/nginx/sites-enabled/default\nsudo nginx -t && sudo systemctl reload nginx\n\n# Nginx server block (excerpt)\nlocation / {\n    try_files $uri $uri/ /index.php?$query_string;\n}\nlocation ~ \\.php$ {\n    fastcgi_pass unix:/run/php/php8.2-fpm.sock;\n    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;\n    include fastcgi_params;\n}"
        }
      ],
      learned: [
        "Always read the logs first — storage/logs/laravel.log plus the Nginx and PHP-FPM error logs pinpointed every failure faster than guessing.",
        "Match the runtime to the framework — Laravel 9 caps at PHP 8.2, so installing the distro's default PHP would never have worked.",
        "Least privilege matters — a dedicated database user with scoped grants limits the blast radius compared to using root."
      ],
      planned: [
        "HTTPS with a domain via Certbot",
        "An automated deployment script",
        "GitHub Actions CI/CD pipeline",
        "Scheduled database backups to S3",
        "Containerizing the app with Docker"
      ]
    }
  },
  {
    id: 8,
    title: "AWS ALB Lab — Load Balancing across EC2",
    category: "Cloud & AWS",
    description: "Hands-on lab in ap-southeast-2: launched two EC2 instances behind an Application Load Balancer with a target group, configured health checks, and used separate security groups for the ALB and the web servers.",
    tech: ["AWS EC2", "Application Load Balancer", "Target Groups", "Security Groups", "ap-southeast-2"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200",
    github: "https://github.com/ShafaqatIqbal77",
    demo: null
  },
  {
    id: 9,
    title: "EC2 Security Hardening & Static Hosting",
    category: "Cloud & AWS",
    description: "Hardened an EC2 instance by enforcing IMDSv2, allocated an Elastic IP for a stable address, and hosted a static site with Nginx on Ubuntu. Planned next: restricting SSH access, attaching an IAM role to the instance, and scheduling EBS snapshots.",
    tech: ["AWS EC2", "IMDSv2", "Elastic IP", "Nginx", "Ubuntu", "EBS"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    github: "https://github.com/ShafaqatIqbal77",
    demo: null
  }
];
