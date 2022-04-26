prediction_1 ="";
prediction_2 ="";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+ data_uri+'"/>';
    });
}

console.log("ml5 version: ", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/18KhOGbAk/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model is loaded");
}

function speak(){
    synth = window.speechSynthesis;
    speakData1= prediction_1;
    utterThis = new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);

}

function gotResult(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion").innerHTML = results[0].label;
    prediction_1 = results[0].label;
    speak();
    if (results[0].label == "thumbs up"){
        document.getElementById("result_emoji").innerHTML = "👍🏻";
    }
    if (results[0].label == "amazing"){
        document.getElementById("result_emoji").innerHTML = "👌🏻";
    }
    if (results[0].label == "peace"){
        document.getElementById("result_emoji").innerHTML = "✌🏻";
    }
    if (results[0].label == "crossed fingers"){
        document.getElementById("result_emoji").innerHTML = "🤞🏻";
    } 
    if (results[0].label == "thumbs down"){
        document.getElementById("result_emoji").innerHTML = "👎🏻";
    } 
    if (results[0].label == "swag"){
        document.getElementById("result_emoji").innerHTML = " 🤘🏻";
    }
    
}

}