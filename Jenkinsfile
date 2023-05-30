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

    stage('docker publish') {
      environment {
        USERNAME = 'devlangesh'
        PASSWORD = 'dev33@FSD'
      }
      steps {
        withCredentials(bindings: [usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh 'docker login -u $USERNAME -p $PASSWORD'
        }

        sh 'docker push "devlangesh/jenkins-node:${BUILD_NUMBER}"'
      }
    }

  }
}