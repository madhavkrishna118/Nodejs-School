pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'school-MCP/school-form'
        DOCKER_CREDENTIALS_ID = 'DockerID'
        SONARQUBE_URL = 'http://3.130.196.50:9000/'
        SONARQUBE_CREDENTIALS_ID = 'Sonarqube'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://your-git-repo-url.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'SonarQube Scanner'
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=school-form -Dsonar.sources=. -Dsonar.host.url=${SONARQUBE_URL} -Dsonar.login=${SONARQUBE_CREDENTIALS_ID}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push()
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
