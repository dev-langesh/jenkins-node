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
        sh 'docker build -t "devlangesh/jenkins-node:latest" .'
      }
    }

    stage('docker hub push') {
      steps {
        withCredentials(bindings: [[$class: 'UsernamePasswordMultiBinding', credentialsId:'auth_dockerhub',
                                                                          usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']
                                                                                                ]) {
          sh 'docker login -u $USERNAME -p $PASSWORD'
        }

        sh 'docker push "devlangesh/jenkins-node:latest"'
      }
    }

    stage('aws') {
      environment {
        AWS_ACCESS_KEY_ID = credentials('aws_access_key_id')
        AWS_SECRET_ACCESS_KEY = credentials('aws_secret_access_key')
        AWS_DEFAULT_REGION = 'ap-south-1'
      }
      steps {
        sh '''aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}
aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}
aws configure set default.region ${AWS_DEFAULT_REGION}'''
        sh '''#aws ecs update-service --cluster jenkins-node --service jenkins-node-service --force-new-deployment --region ap-south-1


# aws ec2 run-instances --image-id ami-0607784b46cbe5816 --count 1 --instance-type t2.micro'''
        sh '''ssh -o StrictHostKeyChecking=no -i /var/jenkins_home/aws/aws_key.pem ubuntu@test.langesh.in

docker build --no-cache -t test:${BUILD_NUMBER} .

docker run --name test --rm -d -e PORT=8000 -p 8000:8000 test:${BUILD_NUMBER}

'''
      }
    }

  }
}