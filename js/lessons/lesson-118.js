/**
 * Robot Framework Academy - Lesson 118
 * WebRTC testing
 */

const LESSON_118 = {
    id: 118,
    title: "Interacciones Avanzadas 118",
    duration: "7 min",
    level: "intermediate",
    section: "section-08",
    content: `
        <h2>📹 WebRTC testing</h2>
        <p>Probar aplicaciones WebRTC, video calls, screen sharing y peer-to-peer connections.</p>
        
        <h3>💻 Tests WebRTC:</h3>
        <pre><code class="robot">*** Variables ***
\${URL}                https://webrtc.ejemplo.com
\${BROWSER}            chrome
\${VIDEO_ELEMENT}      css=video#localVideo
\${REMOTE_VIDEO}       css=video#remoteVideo
\${CALL_BUTTON}        id=start-call
\${SHARE_BUTTON}       id=share-screen
\${MUTE_BUTTON}        id=mute-audio
\${CAMERA_BUTTON}      id=toggle-camera
\${ROOM_ID}            test-room-123

*** Test Cases ***
Test WebRTC Support
    Open Browser              \${URL}        \${BROWSER}
    \${rtc_support}=     Execute JavaScript    return typeof RTCPeerConnection !== 'undefined'
    Should Be True            \${rtc_support}
    \${media_support}=   Execute JavaScript    return typeof navigator.mediaDevices !== 'undefined'
    Should Be True            \${media_support}
    \${getUserMedia}=    Execute JavaScript    return typeof navigator.mediaDevices.getUserMedia !== 'undefined'
    Should Be True            \${getUserMedia}
    Page Should Contain       WebRTC compatible
    \${ice_servers}=     Execute JavaScript    
    ...    return window.iceServers ? window.iceServers.length : 0
    Should Be True            \${ice_servers} >= 1
    Close Browser

Test Camera Access
    Open Browser              \${URL}        \${BROWSER}
    Click Button              id=request-camera
    Handle Alert              ACCEPT
    Wait Until Element Is Visible    \${VIDEO_ELEMENT}    timeout=10s
    Element Should Be Visible \${VIDEO_ELEMENT}
    \${video_playing}=   Execute JavaScript    
    ...    var video = document.querySelector('\${VIDEO_ELEMENT}');
    ...    return video.videoWidth > 0 && video.videoHeight > 0 && !video.paused;
    Should Be True            \${video_playing}
    \${stream_active}=   Execute JavaScript    
    ...    return window.localStream ? window.localStream.active : false
    Should Be True            \${stream_active}
    Page Should Contain       cámara activada
    Close Browser

Test Audio Controls
    Open Browser              \${URL}        \${BROWSER}
    Click Button              id=request-audio
    Handle Alert              ACCEPT
    Wait Until Page Contains  micrófono activado
    Click Element             \${MUTE_BUTTON}
    Page Should Contain       audio silenciado
    \${audio_muted}=     Execute JavaScript    
    ...    return window.localStream ? !window.localStream.getAudioTracks()[0].enabled : false
    Should Be True            \${audio_muted}
    Click Element             \${MUTE_BUTTON}
    Page Should Contain       audio activado
    \${audio_enabled}=   Execute JavaScript    
    ...    return window.localStream ? window.localStream.getAudioTracks()[0].enabled : false
    Should Be True            \${audio_enabled}
    Close Browser

Test Screen Sharing
    Open Browser              \${URL}        \${BROWSER}
    Click Button              \${SHARE_BUTTON}
    Handle Alert              ACCEPT
    Wait Until Page Contains  pantalla compartida
    \${screen_stream}=   Execute JavaScript    
    ...    return window.screenStream ? window.screenStream.active : false
    Should Be True            \${screen_stream}
    \${video_track}=     Execute JavaScript    
    ...    return window.screenStream ? window.screenStream.getVideoTracks()[0].kind : null
    Should Be Equal           \${video_track}    video
    Click Button              id=stop-sharing
    Wait Until Page Contains  compartir detenido
    \${stream_stopped}=  Execute JavaScript    
    ...    return window.screenStream ? !window.screenStream.active : true
    Should Be True            \${stream_stopped}
    Close Browser

Test Peer Connection
    Open Browser              \${URL}        \${BROWSER}
    Input Text                name=room    \${ROOM_ID}
    Click Button              id=join-room
    Wait Until Page Contains  conectando
    \${peer_connection}= Execute JavaScript    
    ...    return window.peerConnection ? window.peerConnection.connectionState : null
    Should Be Equal           \${peer_connection}    connected
    \${ice_state}=       Execute JavaScript    
    ...    return window.peerConnection ? window.peerConnection.iceConnectionState : null
    Should Be Equal           \${ice_state}    connected
    \${signaling_state}= Execute JavaScript    
    ...    return window.peerConnection ? window.peerConnection.signalingState : null
    Should Be Equal           \${signaling_state}    stable
    Page Should Contain       conexión establecida
    Close Browser

Test Video Call
    Open Browser              \${URL}        \${BROWSER}
    Input Text                name=caller    TestUser1
    Click Button              \${CALL_BUTTON}
    Handle Alert              ACCEPT
    Wait Until Element Is Visible    \${VIDEO_ELEMENT}
    Wait Until Element Is Visible    \${REMOTE_VIDEO}    timeout=15s
    \${local_video}=     Execute JavaScript    
    ...    var video = document.querySelector('\${VIDEO_ELEMENT}');
    ...    return video.videoWidth > 0 && video.videoHeight > 0;
    Should Be True            \${local_video}
    \${remote_video}=    Execute JavaScript    
    ...    var video = document.querySelector('\${REMOTE_VIDEO}');
    ...    return video.videoWidth > 0 && video.videoHeight > 0;
    Should Be True            \${remote_video}
    \${call_duration}=   Execute JavaScript    return window.callStartTime ? Date.now() - window.callStartTime : 0
    Should Be True            \${call_duration} > 0
    Click Button              id=end-call
    Page Should Contain       llamada terminada
    Close Browser</code></pre>
        
        <h3>🎯 Práctica WebRTC (5 min):</h3>
        <p>1. Verifica soporte WebRTC con RTCPeerConnection</p>
        <p>2. Usa Execute JavaScript para detectar mediaDevices API</p>
        <p>3. Valida que getUserMedia está disponible</p>
        <p>4. Configura acceso a cámara con Handle Alert ACCEPT</p>
        <p>5. Verifica que video element muestra stream activo</p>
        <p>6. Usa videoWidth y videoHeight para validar video</p>
        <p>7. Implementa controles de audio mute/unmute</p>
        <p>8. Verifica estado de audio tracks con getAudioTracks()</p>
        <p>9. Testa screen sharing con getDisplayMedia</p>
        <p>10. Valida que screen stream está activo</p>
        <p>11. Verifica que video track type es correcto</p>
        <p>12. Implementa testing de peer connections</p>
        <p>13. Usa connectionState para verificar estado</p>
        <p>14. Valida iceConnectionState y signalingState</p>
        <p>15. Testa establecimiento de video calls</p>
        <p>16. Verifica que tanto local como remote video funcionan</p>
        <p>17. Mide duración de calls con timestamps</p>
        <p>18. Implementa cleanup con end call functionality</p>

        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4>✅ Objetivos:</h4>
            <ul>
                <li>Validar soporte WebRTC y APIs de media</li>
                <li>Probar acceso a cámara, audio y screen sharing</li>
                <li>Implementar testing de peer connections</li>
                <li>Verificar funcionalidad completa de video calls</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <h4>💡 Tip:</h4>
            <p>WebRTC requiere HTTPS y permisos de usuario. Usa Handle Alert ACCEPT para permisos y verifica stream.active para confirmar funcionamiento.</p>
        </div>
        
        <h3>🚀 Siguiente: Lección 119 - Proyecto web automation completo</h3>
        <p>Integrarás todas las técnicas avanzadas en un proyecto completo de automatización web enterprise.</p>
    `,
    topics: ["advanced", "javascript", "files"],
    hasCode: true,
    hasExercise: true,
    estimatedTime: 7,
    difficulty: "intermediate",
    prerequisites: ["lesson-117"],
    type: "standard"
};

// Registro global para uso en browser
if (typeof window !== 'undefined') {
    window.LESSON_118 = LESSON_118;
}