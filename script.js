const video = document.getElementById('video');

// Khoi tao model
async function init(){

  // doi cho load xong 2 model
  await Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  ])
  
}
function faceRecognition() {
  video.src = 'video.mp4';
  video.addEventListener('loadedmetadata', async () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const size = { 
      width: video.videoWidth,
      height: video.videoHeight
    };
    faceapi.matchDimensions(canvas, size);


    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
      const resizedDetections = faceapi.resizeResults(detections, size);

      //xoa di khung ve cu~
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

      //ve khung moi cho khuon mat
      faceapi.draw.drawDetections(canvas, resizedDetections);
    }, 100);
  });
}
init()
faceRecognition()
