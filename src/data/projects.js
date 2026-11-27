export const projects = [
  {
<<<<<<< HEAD
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
=======
    id: 1,
    featured: true,
    title: "Laravel Jobs Portal on AWS EC2",
    category: "DevOps",
    status: "[PLACEHOLDER: LIVE or IN PROGRESS]",
    region: "ap-southeast-2",
    description:
      "Deployed an existing Laravel 9 jobs-portal application manually from scratch over SSH onto an AWS EC2 Ubuntu 26.04 LTS instance in ap-southeast-2 with Nginx, PHP-FPM 8.2, and MySQL 8.4.",
    tech: [
      "AWS EC2",
      "Ubuntu 26.04 LTS",
      "Nginx",
      "PHP-FPM 8.2",
      "MySQL 8.4",
      "Laravel 9",
      "Composer",
      "Git",
    ],
    github: "[PLACEHOLDER: REPO LINK]",
    // Live link omitted unless public
    caseStudy: {
      summary:
        "Manual, end-to-end production-style deployment of an existing Laravel 9 jobs portal onto a fresh AWS EC2 instance running Ubuntu 26.04 LTS in ap-southeast-2. Provisioned the LEMP stack over SSH, resolved PHP 8.5 vs. Laravel 9 version incompatibility via packages.sury.org, locked down MySQL with a dedicated least-privilege user, and fixed real Composer, Carbon, permission, and Nginx socket errors from server logs.",
      facts: [
        "Deployed an existing Laravel 9 jobs-portal app on an AWS EC2 instance in ap-southeast-2 running Ubuntu 26.04 LTS, manually from scratch over SSH.",
        "Stack: Nginx, PHP-FPM 8.2, MySQL 8.4, Composer, Git.",
        "Ubuntu 26.04 ships only PHP 8.5, whereas Laravel 9 supports up to PHP 8.2, so the packages.sury.org repository was added to install PHP 8.2 and required extensions.",
        "Created a dedicated MySQL database and least-privilege user instead of using root; configured credentials via .env.",
        "Moved the app to /var/www and set ownership to www-data with 775 permissions on storage and bootstrap/cache.",
        "Wrote an Nginx server block pointing to /public with try_files and PHP-FPM socket, and removed the default site that conflicted on port 80.",
        "Opened only ports 22, 80, and 443 via the EC2 Security Group.",
        "Used git clone for deployment so future updates can be pulled cleanly.",
      ],
      timeline: [
        {
          step: 1,
          title: "Launch EC2 Instance",
          detail:
            "Provisioned an Ubuntu 26.04 LTS instance in ap-southeast-2 and configured the Security Group to allow only SSH (22), HTTP (80), and HTTPS (443).",
        },
        {
          step: 2,
          title: "Install Stack & PHP 8.2",
          detail:
            "Ubuntu 26.04 defaults to PHP 8.5, which exceeds Laravel 9's max supported PHP 8.2. Added packages.sury.org and installed PHP 8.2, PHP-FPM 8.2, required PHP extensions, Nginx, MySQL 8.4, Composer, and Git.",
          snippetLang: "bash",
          snippet: `sudo apt update && sudo apt install -y nginx mysql-server git composer\n# Added packages.sury.org repo for PHP 8.2\nsudo apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip`,
        },
        {
          step: 3,
          title: "Configure MySQL Database",
          detail:
            "Avoided using MySQL root in the application by creating a dedicated database and a least-privilege application user.",
          snippetLang: "sql",
          snippet: `CREATE DATABASE jobs_portal;\nCREATE USER '<db_user>'@'localhost' IDENTIFIED BY '<strong_password>';\nGRANT ALL PRIVILEGES ON jobs_portal.* TO '<db_user>'@'localhost';\nFLUSH PRIVILEGES;`,
        },
        {
          step: 4,
          title: "Clone & Configure Application",
          detail:
            "Cloned the repository into /var/www so updates can be pulled via Git, updated locked PHP dependencies incompatible with 8.2, and configured .env with database credentials.",
          snippetLang: "bash",
          snippet: `cd /var/www && sudo git clone <repo-url> jobs-portal\ncd /var/www/jobs-portal\ncomposer update nette/schema nette/utils phpspec/prophecy nesbot/carbon\ncomposer install --no-dev --optimize-autoloader`,
        },
        {
          step: 5,
          title: "Set Ownership & Permissions",
          detail:
            "Assigned /var/www/jobs-portal ownership to www-data, applied 775 permissions on storage and bootstrap/cache, and ran artisan commands as www-data.",
          snippetLang: "bash",
          snippet: `sudo chown -R www-data:www-data /var/www/jobs-portal\nsudo chmod -R 775 /var/www/jobs-portal/storage /var/www/jobs-portal/bootstrap/cache\nsudo -u www-data php artisan migrate`,
        },
        {
          step: 6,
          title: "Configure Nginx Virtual Host",
          detail:
            "Created an Nginx server block pointing document root to /public with try_files and the php8.2-fpm.sock FastCGI socket, and removed the conflicting default site on port 80.",
          snippetLang: "nginx",
          snippet: `server {\n    listen 80;\n    server_name _;\n    root /var/www/jobs-portal/public;\n    index index.php;\n\n    location / {\n        try_files $uri $uri/ /index.php?$query_string;\n    }\n\n    location ~ \\.php$ {\n        include snippets/fastcgi-php.conf;\n        fastcgi_pass unix:/run/php/php8.2-fpm.sock;\n    }\n}`,
        },
        {
          step: 7,
          title: "Verify Deployment",
          detail:
            "Validated Nginx configuration syntax, reloaded Nginx and PHP-FPM 8.2, verified database queries and Laravel routes, and inspected Nginx/Laravel logs to confirm zero runtime errors.",
          snippetLang: "bash",
          snippet: `sudo rm -f /etc/nginx/sites-enabled/default\nsudo nginx -t && sudo systemctl reload nginx\nsudo systemctl status php8.2-fpm nginx mysql`,
        },
      ],
      troubleshooting: [
        {
          id: "php-repo",
          problem: '"Unable to locate package php8.3-*"',
          rootCause:
            "Ubuntu 26.04 LTS ships only PHP 8.5 in its default repositories and has no PHP 8.3 packages, while Laravel 9 supports up to PHP 8.2.",
          fix: "Added the packages.sury.org repository and installed PHP 8.2 along with PHP-FPM 8.2 and the required extensions.",
          snippetLang: "bash",
          snippet: `# After adding packages.sury.org repository\nsudo apt update\nsudo apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip`,
        },
        {
          id: "composer-lock",
          problem: "composer install failed on lock file",
          rootCause:
            "Old locked packages (nette/schema, nette/utils, phpspec/prophecy) in composer.lock only supported PHP versions below 8.2.",
          fix: "Updated only the incompatible packages selectively with composer update <package>, then ran composer install.",
          snippetLang: "bash",
          snippet: `composer update nette/schema nette/utils phpspec/prophecy\ncomposer install --no-dev --optimize-autoloader`,
        },
        {
          id: "carbon-typeerror",
          problem: "HTTP 500: Carbon::setLastErrors() TypeError",
          rootCause:
            "The locked version of nesbot/carbon was incompatible with PHP 8.2's stricter DateTime::getLastErrors() return types.",
          fix: "Updated nesbot/carbon to version 2.73.0.",
          snippetLang: "bash",
          snippet: `composer require nesbot/carbon:2.73.0 --with-all-dependencies`,
        },
        {
          id: "mysql-access-denied",
          problem: 'HTTP 500: "Access denied for user root"',
          rootCause:
            "The application .env file was still configured to connect as the MySQL root user.",
          fix: "Created a dedicated MySQL database and least-privilege user, then updated DB_USERNAME and DB_PASSWORD in .env.",
          snippetLang: "env",
          snippet: `DB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=jobs_portal\nDB_USERNAME=<db_user>\nDB_PASSWORD=<strong_password>`,
        },
        {
          id: "laravel-log-permission",
          problem: '"Permission denied" writing laravel.log',
          rootCause:
            "The storage directory was not writable by the Nginx/PHP-FPM web user (www-data).",
          fix: "Changed ownership to www-data, set 775 permissions on storage and bootstrap/cache, and ran artisan commands as www-data.",
          snippetLang: "bash",
          snippet: `sudo chown -R www-data:www-data /var/www/jobs-portal\nsudo chmod -R 775 /var/www/jobs-portal/storage /var/www/jobs-portal/bootstrap/cache\nsudo -u www-data php artisan config:clear`,
        },
        {
          id: "nginx-socket-conflict",
          problem: 'Nginx "conflicting server name" and PHP-FPM socket mismatch',
          rootCause:
            "The default Nginx site remained enabled on port 80 and the FastCGI config pointed at a php8.3 socket instead of php8.2.",
          fix: "Removed the default site from sites-enabled and updated fastcgi_pass to unix:/run/php/php8.2-fpm.sock.",
          snippetLang: "nginx",
          snippet: `# Remove conflicting default site:\n# sudo rm /etc/nginx/sites-enabled/default\n\nlocation ~ \\.php$ {\n    include snippets/fastcgi-php.conf;\n    fastcgi_pass unix:/run/php/php8.2-fpm.sock;\n}`,
        },
      ],
      learned: [
        {
          title: "Read logs first",
          detail:
            "Checking Nginx error logs and storage/logs/laravel.log immediately isolated PHP package, database auth, and permission issues instead of guessing.",
        },
        {
          title: "Match PHP version to framework",
          detail:
            "Ubuntu 26.04's default PHP 8.5 exceeded Laravel 9's supported ceiling (8.2), requiring packages.sury.org and targeted lock-file updates.",
        },
        {
          title: "Apply least privilege",
          detail:
            "Using a dedicated MySQL user scoped to the app database and running web/artisan processes as www-data keeps root credentials out of the app.",
        },
      ],
      plannedNext: [
        "HTTPS with Certbot and a domain",
        "Automated deploy script",
        "GitHub Actions CI/CD",
        "Scheduled database backups to S3",
        "Dockerizing the app",
      ],
    },
  },
  {
    id: 2,
    title: "AWS ALB Lab",
    category: "DevOps",
    status: "Completed (Lab)",
    region: "ap-southeast-2",
    description:
      "Deployed two EC2 instances behind an Application Load Balancer in ap-southeast-2 with target group health checks and separate security groups for the ALB and web servers.",
    tech: [
      "AWS EC2",
      "Application Load Balancer",
      "Target Groups",
      "Security Groups",
    ],
    github: "[PLACEHOLDER: REPO LINK]",
    highlights: [
      "Provisioned two EC2 instances in ap-southeast-2 behind an Application Load Balancer.",
      "Configured Target Group health checks to route traffic only to healthy instances.",
      "Separated network access using distinct Security Groups for the ALB and backend web servers.",
    ],
  },
  {
    id: 3,
    title: "EC2 Security Hardening & Static Hosting",
    category: "DevOps",
    status: "Completed (Lab)",
    description:
      "Hardened an AWS EC2 Ubuntu instance by enforcing IMDSv2, allocating an Elastic IP, and hosting a static portfolio with Nginx.",
    tech: ["AWS EC2", "IMDSv2", "Elastic IP", "Nginx", "Ubuntu"],
    github: "[PLACEHOLDER: REPO LINK]",
    highlights: [
      "Enforced IMDSv2 on the EC2 instance metadata service.",
      "Allocated and associated a static Elastic IP.",
      "Hosted a static portfolio site with Nginx on Ubuntu.",
    ],
    plannedNext: [
      "SSH restriction to trusted IP ranges",
      "Least-privilege IAM role attachment",
      "Automated EBS snapshots",
    ],
  },
  {
    id: 4,
    title: "Enterprise College CMS",
    category: "Full Stack",
    description:
      "An ultra-premium, production-ready College Management System (CMS) featuring role-based portals for Admins, Faculty, and Students. Includes real-time attendance, result management, and automated fee processing.",
    tech: ["React 18", "Node.js", "MongoDB", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224b94?auto=format&fit=crop&q=80&w=1200",
    github: "https://github.com/ShafaqatIqbal77",
    demo: "#",
    stars: 85,
    forks: 32,
  },
  {
    id: 5,
    title: "Advanced Doctor Appointment App",
    category: "Full Stack",
    description:
      "A high-end healthcare platform allowing patients to book consultations, manage prescriptions, and consult via integrated video calls. Features a sleek dashboard for doctors and patient history tracking.",
    tech: ["React", "Express", "Socket.io", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=1200",
    github: "https://github.com/ShafaqatIqbal77",
    demo: "#",
    stars: 64,
    forks: 21,
  },
  {
    id: 6,
    title: "Hospital Operations System",
    category: "Full Stack",
    description:
      "A robust ERP solution for modern hospitals, managing everything from bed allocation and pharmacy inventory to patient billing and emergency room coordination.",
    tech: ["React", "Redux", "Node.js", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1538108149393-fdfd81895907?auto=format&fit=crop&q=80&w=1200",
    github: "https://github.com/ShafaqatIqbal77",
    demo: "#",
    stars: 45,
    forks: 15,
  },
  {
    id: 7,
    title: "AI Health Assistant",
    category: "AI & Web",
    description:
      "An intelligent health monitoring platform that uses AI to analyze patient symptoms and provide preliminary health advice and doctor recommendations.",
    tech: ["React", "Python", "TensorFlow", "FastAPI"],
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
    github: "https://github.com/ShafaqatIqbal77",
    demo: "#",
    stars: 120,
    forks: 45,
  },
  {
    id: 8,
    title: "Real-time Chat Platform",
    category: "Full Stack",
    description:
      "A high-performance messaging app supporting group channels, file sharing, and end-to-end encryption with zero-latency communication.",
    tech: ["React", "Socket.io", "Redis", "Node.js"],
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=1200",
    github: "https://github.com/ShafaqatIqbal77",
    demo: "#",
    stars: 92,
    forks: 28,
  },
  {
    id: 9,
    title: "Premium E-Commerce Experience",
    category: "Frontend",
    description:
      "A visually stunning shopping platform with advanced micro-interactions, smooth page transitions, and a fully responsive design for high-end retail.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    github: "https://github.com/ShafaqatIqbal77",
    demo: "#",
    stars: 110,
    forks: 35,
  },
>>>>>>> 0bac050 (change location just)
];
