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
        sh 'sudo docker build -t "devlangesh/jenkins-node:$BUILD_NUMBER" .'
      }
    }

    stage('test') {
      environment {
        PORT = 9000
      }
      steps {
        sh '''sudo docker run --rm -d -e PORT=$PORT -p $PORT:$PORT devlangesh/jenkins-node
npm i
npm run test
sudo docker stop $(sudo docker ps -q)


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

        sh 'sudo docker push "devlangesh/jenkins-node:$BUILD_NUMBER"'
      }
    }

    stage('deploy') {
      steps {
        sh 'sudo kubectl set image deployment/jenkins-node-deployment jenkins-node=devlangesh/jenkins-node:$BUILD_NUMBER'
      }
    }

  }
}