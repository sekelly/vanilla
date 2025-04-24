ZoomMtg.setZoomJSLib('https://source.zoom.us/3.12.0/lib', '/av')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

// setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
var signatureEndpoint = 'https://yckfd07uph.execute-api.us-east-1.amazonaws.com/latest'
var sdkKey = 'PfPapLCavJc2ZBjMkssNeqboLdBOpoAEXQTc'
var meetingNumber = '95160050210'
var role = 1
var disablePreview = 'true'
var leaveUrl = 'https://sekelly.github.io/vanilla'
var userName = 'ClientView'
var userEmail = 'client@kelkel.com'
var passWord = '123'
// pass in the registrant's token if your meeting or webinar requires registration. More info here:
// Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-meeting-with-registration-required
// Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-webinar-with-registration-required
var registrantToken = ''

function getSignature() {
  fetch(signatureEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    startMeeting(data.signature)
  }).catch((error) => {
  	console.log(error)
  })
}

function startMeeting(signature) {

  document.getElementById('zmmtg-root').style.display = 'block'

  ZoomMtg.init({
    leaveUrl: leaveUrl,
    success: (success) => {
      console.log(success)
      ZoomMtg.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        userName: userName,
        userEmail: userEmail,
        passWord: passWord,
        tk: registrantToken,
        success: (success) => {
          console.log(success)
          
// Add virtual background options here
          ZoomMtg.updateVirtualBackgroundList({
            virtualBackgroundList: [
              {
                id: 'vb1',
                name: ’S’creenshot 2023-10-16 at 11.21.28 AM.png,
                path: 'blob:https://zoom.us/c7c8efc2-d296-4edc-9590-30e94450fa6a',  // Replace with your hosted image
                default: true
              },
              {
                id: 'vb2',
                name: ‘Magaoay’ sun,
                path: 'blob:https://zoom.us/85b0cfa2-5751-4589-a8a1-96b7a4f3a645'
              }
            ]
          })

        },
        error: (error) => {
          console.log(error)
        },
      })

    },
    error: (error) => {
      console.log(error)
    }
  })
}
