# SonarQube Setup on Windows

This project uses SonarQube to inspect JavaScript quality, duplicated code,
security issues, and maintainability across all microservices.

Docker is not required.

## 1. Requirements

Install or verify:

- Java 21 or newer
- Node.js 18 or newer
- SonarQube Community Edition
- SonarScanner CLI

Check Java:

```powershell
java -version
```

If Java is missing, install Microsoft OpenJDK 21 or newer, then
restart PowerShell.

## 2. Install SonarQube Server

Download the Community Edition ZIP from the official SonarQube website:

```text
https://www.sonarsource.com/products/sonarqube/downloads/
```

Extract it to a folder such as:

```text
C:\sonarqube
```

The extracted folder normally contains a versioned directory, for example:

```text
C:\sonarqube\sonarqube-26.9.0.129388\bin\windows-x86-64
```

Open PowerShell in that `bin\windows-x86-64` folder and start SonarQube:

```powershell
.\StartSonar.bat
```

Wait until the console reports that SonarQube is running. Open:

```text
http://localhost:9000
```

Default login for a new local installation:

```text
Username: admin
Password: admin
```

SonarQube will ask you to change the password after the first login.

Keep the SonarQube terminal open while analyzing the project.
new password:
Welcome@1234
## 3. Install SonarScanner CLI

Download the SonarScanner CLI ZIP from:

```text
https://docs.sonarsource.com/sonarqube-server/latest/analyzing-source-code/scanners/sonarscanner/
```

The scanner is installed here:

```text
C:\sonar-scanner\sonar-scanner-8.1.0.6389-windows-x64
```

Its `bin` directory has been added to the Windows user PATH:

```text
C:\sonar-scanner\sonar-scanner-8.1.0.6389-windows-x64\bin
```

Close and reopen PowerShell, then verify:

```powershell
sonar-scanner.bat --version
```

## 4. Create a SonarQube Project

1. Open `http://localhost:9000`.
2. Select **Create project**.
3. Choose **Manually**.
4. Use this project key:

```text
evidence-management-microservices
```

5. Create a project analysis token.
6. Copy the token somewhere secure. Do not commit it to the repository.

## 5. Project Configuration

The project already contains this file:

```text
microservices/sonar-project.properties
```

It scans:

- `api-gateway`
- `case-service`
- `criminal-service`
- `evidence-service`
- `shared`
- `user-service`

It excludes:

- `node_modules`
- `package-lock.json`
- uploaded evidence files
- runtime logs
- Markdown documentation

## 6. Run an Analysis

Open a new PowerShell window and run:

```powershell
cd "C:\Users\Prashil Singh\OneDrive\Desktop\Nodejs\Microservices_Arch_developement\microservices"
sonar-scanner -D"sonar.host.url=http://localhost:9000" -D"sonar.token=YOUR_TOKEN"
```

Replace `YOUR_TOKEN` with the token created in SonarQube.

Do not put the token in `sonar-project.properties`.

After the scan completes, open the project dashboard:

```text
http://localhost:9000/dashboard?id=evidence-management-microservices
```

## 7. PowerShell Token Variable

To avoid writing the token directly in the command history, set it for the
current PowerShell window:

```powershell
$env:SONAR_TOKEN = "YOUR_TOKEN"
sonar-scanner -D"sonar.host.url=http://localhost:9000" -D"sonar.token=$env:SONAR_TOKEN"
```

Remove it when finished:

```powershell
Remove-Item Env:SONAR_TOKEN
```

## 8. What SonarQube Checks

SonarQube analyzes the source code for:

- JavaScript bugs
- Security hotspots
- Vulnerability patterns
- Code smells
- Duplicated code
- Maintainability issues
- Reliability issues
- Complexity

It does not replace runtime testing. Continue to verify the services with their
health endpoints:

```powershell
$urls = @(
  'http://localhost:3000/health',
  'http://localhost:3001/health',
  'http://localhost:3002/health',
  'http://localhost:3003/health',
  'http://localhost:4000/health'
)
foreach ($url in $urls) {
  try { Invoke-RestMethod $url } catch { Write-Error $_.Exception.Message }
}
```

## 9. Current Coverage Status

The project currently does not have an automated test runner or an LCOV
coverage file. SonarQube can still analyze source quality, but coverage will
not be shown until tests generate a report.

When tests later generate this file:

```text
coverage/lcov.info
```

Uncomment this line in `sonar-project.properties`:

```properties
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

## 10. Troubleshooting

### `sonar-scanner` is not recognized

The scanner `bin` folder is not on PATH. Add it, restart PowerShell, and run:

```powershell
sonar-scanner --version
```

### Cannot connect to SonarQube

Verify the server is running:

```powershell
Invoke-WebRequest http://localhost:9000/api/system/status
```

A healthy server returns a response containing:

```text
"status":"UP"
```

### Authentication failed

Create a new project token in SonarQube and run the scanner with that token.
Never use the admin password as the scanner token.

### Java error while starting SonarQube

SonarQube requires a supported JDK. Check:

```powershell
java -version
$env:JAVA_HOME
```

Install a supported JDK and set `JAVA_HOME` if necessary.

## 11. Stop SonarQube

In the PowerShell window running SonarQube, press:

```text
Ctrl+C
```

The SonarQube Windows service, if configured later, can also be stopped from
Windows Services.
