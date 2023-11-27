---
title: Jenkins
has_children: false
nav_order: 3
---

## Jenkins?

✏️ 빌드, 테스트, 배포와 관련된 모든 종류의 작업을 자동화하는데 사용할 수 있는 독립형 오픈 소스 자동화 서버, 대부분의 CI/CD 배포 라이브러리들의 기본적인 구조는 Jenkins와 비슷합니다.<br/>

<br/>

프론트엔드 페이지를 배포하거나, 내부 SDK를 배포할 때 배포 단계를 자동화 시키고 싶어서 사용해보게 됐습니다. 사내 git 저장소로는 bitbucket을 사용하고 있어서 bitbucket pipeline을 사용할 수도 있지만 오히려 Jenkins로 설정하는게 추후 확장성에 좋을 것 같아서 Jenkins를 선택했습니다. <br/>

<br/>

![젠킨스를 이용한 배포 단계](<./img/jenkins(2).png>)

젠킨스를 이용한 배포 단계를 크게보면 이렇습니다.

1. 개발자가 특정 저장소에 push
2. 저장소와 연결된 web hook이 해당 push 이벤트를 젠킨스에게 전달
3. push 이벤트를 전달받은 젠킨스가 작성된 스크립트에 따라 빌드, 테스트, 배포 진행

세부사항은 물론 저장소마다, 배포하려는 프로젝트마다 다르겠지만 이렇게 이해하고 다가가야 장벽이 좀 낮아지는 느낌이고, 어디에 뭘 연결해서 무슨 데이터를 보내는지 이해가 됩니다.

<br/>

### 1. 연결하기

✏️ 이벤트가 흘러가는 흐름을 따라 연결해줍니다.

![무엇과 무엇을 연결해야하는지](<./img/jenkins(3).png>)

<br/>

### 2. 파이프라인 시나리오 작성하기

✏️ 확장성이 좋다는 말은, 플러그인도 많고 옵션도 많고 이런저런 선택지가 많아서 그 중에 프로젝트에 맞는 선택을 해야한다는 뜻입니다. 개발자가 원하는 시나리오를 먼저 정확히 알고 있어야 스크립트 작성 중간에 파이프라인 종류를 바꿔야하거나 하는 불상사를 막을 수 있습니다.<br/>

<br/>

### 3. 스크립트 작성하기

✏️ push 이벤트를 받아서 젠킨스가 트리거된 후, 젠킨스가 실행시킬 파이프라인을 작성합니다. 파이프라인 문법에는 선언적 파이프라인과 스크립트 파이프라인이 있습니다. 구조는 비슷합니다. 저는 선언적 파이프라인 안에 스크립트 파이프라인을 작성했습니다. <br/>

<br/>

- 스크립트 예시

1.  git message와 npm version을 체크해서 배포하려고 고군분투 했던 JenkinsFile ....

```
pipeline {
    agent any

    environment {
        GIT_MESSAGE = get_commit_msg()
    }

    tools {nodejs "NodeJS"}

    stages {
        stage('Hello') {
            steps {
                echo 'Hello...'
            }
        }

        stage('Build') {
            steps {
                    sh "git log -1"

            script {

                def npmVersion = get_npm_version()
                echo "${npmVersion}"
                echo "${env.GIT_MESSAGE}"
                echo "${env.GIT_MESSAGE}"
                echo "${env.GIT_COMMIT}"
                echo "${GIT_COMMIT}"
                def isUpdate = get_commit_subject("Update")
                def isFeature = get_commit_subject("Feature")
                def isMajor = isFeature == 0
                echo "${isUpdate}"
                echo "${isFeature}"
                echo "${isMajor}"
                if(isMajor){
                sh "npm version major"
                } else {
                sh "npm version minor"
                }
                echo "${npmVersion}"
                sh "git pull"
                sh "git pull origin ${BRANCH_NAME}"
                sh "git fetch origin ${BRANCH_NAME}"

                sh "git status"
                sh "git push --set-upstream origin ${BRANCH_NAME} --force"
                sh "git tag"
                sh "git config --list"

                sh "git push origin --tags"
                sh "npm publish"
              }
              }
          }
      }
  }

  def get_commit_msg(){
  script{
  return sh(script:"git show -s --format=%B ${env.GIT_COMMIT}", returnStdout:true).trim()
  }
  }

  def get_commit_subject(subject){
  script{
  return sh(script:"git show -s --format=%B ${env.GIT_COMMIT}", returnStdout:true).trim().indexOf(subject)
  }
  }

  def get_commit_author(){
  script{
  return sh(script:"git --no-pager show -s --format=%an ${env.GIT_COMMIT}",returnStdout:true).trim()
  }
  }

  def get_npm_version(){
  script{
  return sh(script:"npm show dummy-jenkins version",returnStdout:true).trim()
  }
  }
```

<br/>

2.  처음에 젠킨스 설정 후 테스트하려고 작성했던 Jenkins file

```
pipeline {

    agent any

    tools {nodejs "NodeJS"}

    stages {

        stage('Hello') {
            steps {
                echo 'Hello..'
            }
        }

        stage('for the fix branch') {
            when {
                branch "fix-*"
            }
            steps {
                echo 'this only runs for the fix branches'
            }
        }

        stage('for the PR branch') {
            when {
                branch "PR-*"
            }
            steps {
                echo 'this only runs for the PR branches'
            }
        }
    }

}
```

<br/>

### 4. 저장소에 push해서 테스트하기

✏️ 설정한 저장소에 새 push commit을 넣어서 실제로 테스트해봅시다! <br/>

<br/>

새 push commit을 넣고 Jenkins에서 Stage 별로 진행되는 것을 UI로 확인해볼 수 있습니다.

- Stage View <br/>
  파이프라인에서 설정한 Stage 별 경과 시간과 실행한 step을 간결하게 확인할 수 있습니다. Stage 'for the fix branch'에서는 브랜치 명이 fix로 시작할 때만 step을 실행하도록 파이프라인을 작성했기 때문에 현재 브랜치인 PR-1에서는 건너뛴 모습입니다.

  ![stage별 진행](<./img/jenkins(4).png>)

- Scan Oragnization Folder Log (위의 UI에서 소비 시간을 클릭하면 log를 볼 수 있습니다) <br/>
  처음에 연결하는 단계에서 잘못되거나, 스크립트가 잘못된 경우 로그를 확인하면서 따라가면 디버깅할 수 있습니다.

  ![scan log](https://velog.velcdn.com/images/sparrowscout/post/6cb84399-e293-4ca5-8a47-442cc2ef7a1a/image.png)
