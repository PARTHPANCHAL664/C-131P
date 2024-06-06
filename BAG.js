Status = "";
BAG_image = "";
objects = [];

function preload()
{
    BAG_image = loadImage("bag.jpg");
}

function setup()
{
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    Status = true;
    object_detector.detect(BAG_image,gotResults);
}

function gotResults(error,results)
{
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(BAG_image,0,0,640,350);
    if (Status == true) {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x -  500, objects[i].y - 5000);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x - 220, objects[i].y - 1, objects[i].width - 800, objects[i].height - 1200);
        }
    }
}