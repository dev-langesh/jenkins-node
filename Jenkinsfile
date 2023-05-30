pipeline {
  agent any
  stages {
    stage('checkout') {
      steps {
        git(url: 'https://github.com/dev-langesh/jenkins-node.git', branch: 'master')
      }
    }

    stage('building') {
      steps {
        sh 'ls'
        sh 'docker build -t "devlangesh/jenkins-node:${BUILD_NUMBER}" .'
      }
    }

    stage('docker hub login') {
      environment {
        USERNAME = 'devlangesh'
        PASSWORD = 'dev33@FSD'
      }
      steps {
        sh 'docker login -u $USERNAME -p $PASSWORD'
      }
    }

    stage('push') {
      steps {
        sh 'docker push "devlangesh/jenkins-node:${BUILD_NUMBER}"'
      }
    }

    stage('aws') {
      steps {
        sh 'aws ecs update-service --cluster jenkins-node --service jenkins-node-service --force-new-deployment'
      }
    }

  }
}