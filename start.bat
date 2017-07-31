set MONGO_URL=mongodb://1.255.55.20:30000/teamhub

$는 주석

$아래는 ANDROID_HOME variable이 없다고 실행시에 에러가 날경우 등록 (자신의 안드로이드 sdk 디렉토리를 입력)
$set ANDROID_HOME=C:\SWUAndroid\sdk
$set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools

$아래는 gradle 패키지가 sdk에 포함이 안되어 있다고에러가 날 경우 실시
$https://developer.android.com/studio/index.html#downloads
$위 경로에서 android sdk의 tools 부분을 다운로드 받아서 압축을 풀고, 압축 폴더 내부의 tools 디렉토리를 자신의 sdk디렉토리 내부의 tools 디렉토리와 교체
$자세한 참조문서
$https://stackoverflow.com/questions/42613882/error-could-not-find-gradle-wrapper-within-android-sdk-might-need-to-update-yo

$안드로이드 에뮬레이터 실행
meteor run android

$안드로이드 실제 단말 실행
$meteor run android-device