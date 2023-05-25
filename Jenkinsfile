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
      steps {
        withCredentials(bindings: [usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh 'docker login -u $USERNAME -p $PASSWORD'
        }

        sh 'docker push "devlangesh/jenkins-node:${BUILD_NUMBER}"'
      }
    }

    stage('deploy ') {
      environment {
        ACCESS_KEY = 'credentials(\'AWS_ACCESS_KEY\')'
      }
      steps {
        sh 'sudo apt-get install awscli'
        sh '''echo "${ACCESS_KEY}"

aws configure set access_key_id ${ACCESS_KEY}'''
      }
    }

  }
}