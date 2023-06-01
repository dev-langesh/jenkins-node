pipeline {
  agent {
    label 'ja1'
  }
  stages {
    stage('checkout') {
      steps {
        git(url: 'https://github.com/dev-langesh/jenkins-node.git', branch: 'master')
      }
    }

    stage('build') {
      steps {
        sh 'sudo docker build -t "devlangesh/jenkins-node:latest" .'
      }
    }

    stage('test') {
      environment {
        PORT = 9000
      }
      steps {
        sh '''

        sudo docker stop $(sudo docker ps -q)
        sudo docker run --name test-jenkins-node --rm -d -e PORT=$PORT -p $PORT:$PORT devlangesh/jenkins-node
        npm i
        npm run test

        '''
      }
    }

    stage('docker push') {
      steps {
        withCredentials(bindings: [[$class: 'UsernamePasswordMultiBinding', credentialsId:'auth_dockerhub',
                                                                                          usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']
                                                                                                                ]) {
          sh 'sudo docker login -u $USERNAME -p $PASSWORD'
        }

        sh 'sudo docker push "devlangesh/jenkins-node:latest"'
      }
    }

  }
}