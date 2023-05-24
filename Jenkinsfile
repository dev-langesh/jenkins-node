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
        sh 'docker push devlangesh/jenkins-node'
      }
    }

  }
}