import paramiko

host = '187.77.185.242'
user = 'root'
password = 'E-fest@2026abi'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(host, username=user, password=password, timeout=10)

def run(cmd):
    print(f"--- Running: {cmd} ---")
    _, stdout, stderr = client.exec_command(cmd)
    st = stdout.read().decode()
    if st:
        print("STDOUT:")
        print(st)
    err = stderr.read().decode()
    if err:
        print("STDERR:")
        print(err)
    print()

run("systemctl stop nginx")
run("systemctl disable nginx")
run("cd /opt/e-shell && docker compose down && docker compose up -d")
run("curl -s -I http://localhost")
run("docker ps")

client.close()
