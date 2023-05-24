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
        sh 'npm i'
      }
    }

    stage('run') {
      steps {
        sh 'npm start'
      }
    }

  }
}