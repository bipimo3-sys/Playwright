pipeline {
    agent any

    environment {
        PATH = "/usr/bin:${env.PATH}"   // Use system binaries first
        NODE_ENV = "ci"
    }

    options {
        timestamps()
        //ansiColor('xterm')
    }

    stages {

        stage('Checkout code') {
            steps {
                echo 'Checking out repo...'
                checkout scm
            }
        }

        stage('Verify System Tools') {
            steps {
                sh 'which node'
                sh 'node -v'
                sh 'npm -v'
                sh 'which git'
                sh 'git --version'
            }
        }

        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci || npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing Playwright Browsers...'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run All Tests (CI)') {
            steps {
                // 🔒 Use Jenkins credentials securely
                withCredentials([
                    string(credentialsId: 'GOOGLE_EMAIL', variable: 'GOOGLE_EMAIL'),
                    string(credentialsId: 'GOOGLE_PASSWORD', variable: 'GOOGLE_PASSWORD'),
                    string(credentialsId: 'W3S_LOGINEMAIL', variable: 'W3S_LOGINEMAIL'),
                    string(credentialsId: 'W3S_PASSWORD', variable: 'W3S_PASSWORD'),
                    string(credentialsId: 'TS1_USERNAME', variable: 'TS1_USERNAME'),
                    string(credentialsId: 'TS1_PASSWORD', variable: 'TS1_PASSWORD')
                ]) {
                    echo 'Running Playwright test suites...'
                    sh 'npx playwright test --reporter=html'
                }
            }
            post {
                always {
                    echo 'Generating HTML report...'
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
}
