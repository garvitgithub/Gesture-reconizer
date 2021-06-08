Webcam.set({
    width:350,height:350,image_format:"png",png_quality:90
    });
    camera=document.getElementById("camera");
    Webcam.attach("#camera");
    function snapshot()
    {
    Webcam.snap(function(data_uri)
    {
    document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'"/>';
    }
    );
    }
    console.log("ml5: ",ml5.version);
    classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/fuVzUh_ja/",modelLoaded);
    function modelLoaded()
    {
    console.log("modelhasloaded");
    }
    prediction1="";
    prediction2="";
    function speak(){
    var synth=window.speechSynthesis;
    data1="first prediction is "+prediction1;
    data2="second prediction is "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(data1+data2);
    synth.speak(utterThis);
    }
    function check()
    {
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
    }
    function gotResult(error,results)
    {
    if(error)
    {
    console.log(error);
    }
    else
    {
    console.log(results);
    document.getElementById("gesturename").innerHTML=results[0].label;
    document.getElementById("gesturename2").innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();
    if(results[0].label=="Best")
    {
    document.getElementById("emojiname").innerHTML="&#128077;";
    }
    if(results[0].label=="Victory")
    {
    document.getElementById("emojiname").innerHTML="&#9996;";
    }
    if(results[0].label=="Amazing")
    {
    document.getElementById("emojname").innerHTML="&#128076;";
    }
    }
    }