pipeline {
    agent { label 'JenkinsSlave03' }

    stages {
        stage('Build and Deploy with Docker Compose') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        always {
            echo 'Multi-service pipeline completed!'
        }
    }
}
