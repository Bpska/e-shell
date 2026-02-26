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
    print("STDOUT:")
    print(st)
    err = stderr.read().decode()
    if err:
        print("STDERR:")
        print(err)
    print()

run("curl -s -I http://localhost")
run("curl -s -I -k https://localhost")
run("curl -s http://localhost | grep title")

client.close()
