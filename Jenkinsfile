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
        sh 'docker login -u devlangesh -p dev33@FSD'
        sh 'docker push "devlangesh/jenkins-node:${BUILD_NUMBER}"'
      }
    }

    stage('deploy ') {
      environment {
        ACCESS_KEY = 'credentials(\'AWS_ACCESS_KEY\')'
      }
      steps {
        sh '''curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip

sudo ./aws/install'''
        sh '''echo "${ACCESS_KEY}"

aws configure set access_key_id ${ACCESS_KEY}'''
      }
    }

  }
}