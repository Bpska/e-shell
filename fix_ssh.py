import paramiko

host = '187.77.185.242'
user = 'root'
password = 'E-fest@2026abi'

docker_compose_content = """version: "3.9"

services:
  # ─── PostgreSQL Database ───
  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD:-bps}
      POSTGRES_DB: eshell
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./server/db/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U postgres" ]
      interval: 5s
      timeout: 5s
      retries: 10

  # ─── Express Backend ───
  backend:
    build:
      context: ./server
      dockerfile: Dockerfile
    restart: always
    depends_on:
      db:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql://postgres:${DB_PASSWORD:-bps}@db:5432/eshell
      PORT: 5000
      CORS_ORIGIN: ${CORS_ORIGIN:-*}
    volumes:
      - uploads:/app/uploads
    ports:
      - "5000:5000"

  # ─── React Frontend (nginx) ───
  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile
      args:
        VITE_API_URL: /api
    restart: always
    depends_on:
      - backend
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./client/nginx-ssl.conf:/etc/nginx/conf.d/default.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro

volumes:
  pgdata:
  uploads:
"""

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
print("Connecting...")
client.connect(host, username=user, password=password, timeout=10)
print("Connected. Updating docker-compose.yml...")

sftp = client.open_sftp()
with sftp.file('/opt/e-shell/docker-compose.yml', 'w') as f:
    f.write(docker_compose_content)
sftp.close()

print("Restarting frontend container...")
stdin, stdout, stderr = client.exec_command('cd /opt/e-shell && docker compose up -d --build --force-recreate frontend')

exit_status = stdout.channel.recv_exit_status()
print("STDOUT:")
print(stdout.read().decode())
print("STDERR:")
print(stderr.read().decode())

print("Done. Exit status:", exit_status)
client.close()
