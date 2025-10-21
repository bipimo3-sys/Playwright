pipeline {
    agent any

    tools {
        nodejs 'Node25'
    }

    options {
        timestamps()
        //ansiColor('xterm')
    }

    stages {
        // CI stage
        stage('Checkout code') {
            steps {
                ansiColor('xterm'){
                    echo 'Checking out repo...'
                    checkout scm
                }
            }
        }

        stage('Install dependencies') {
            steps {
                ansiColor('xterm'){
                    echo 'Installing depedencies...'
                    bat 'npm ci'
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                ansiColor('xterm'){
                    echo 'Installing Playwright Browsers...'
                    bat 'npx playwright install --with-deps'
                }
            }
        }

        stage('Run All test (CI)') {
            steps {
                // Wrap multiple credentials
                withCredentials([
                    string(credentialsId: 'GOOGLE_EMAIL', variable: 'bipi6067@gmail.com'),
                    string(credentialsId: 'GOOGLE_PASSWORD', variable: 'bipi6067bipi6067'),
                    string(credentialsId: 'W3S_LOGINEMAIL', variable: 'bipi6067@gmail.com'),
                    string(credentialsId: 'W3S_PASSWORD', variable: 'Bipi6067@Bipi6067'),
                    string(credentialsId: 'TS1_USERNAME', variable: 'admin'),
                    string(credentialsId: 'TS1_PASSWORD', variable: 'password')
                ]) {
                    ansiColor('xterm') {
                        echo 'Running Playwright test suites...'
                        bat 'npx playwright test --reporter=html'
                    }
                }
            }
            post {
                always {
                    ansiColor('xterm'){
                        echo 'Generating HTML report'
                        publishHTML(target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'playwright-report',
                            reportFiles: 'index.html',
                            reportName: 'Playwright Test Report'
                        ])
                    }
                }
            }
        }

        // CD stage
    }
}