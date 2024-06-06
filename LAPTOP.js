Status = "";
LAPTOP_image = "";
objects = [];

function preload() {
    LAPTOP_image = loadImage("LAPTOP.jpg");
}

function setup() {
    canvas = createCanvas(640, 350);
    canvas.position(315, 200);
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    object_detector.detect(LAPTOP_image, gotResults);
}

function gotResults(error,results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(LAPTOP_image, 0, 0, 640, 350);
    if (Status == true) {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x - 800 , objects[i].y - 175);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x - 300, objects[i].y - 250, objects[i].width - 880, objects[i].height - 100);
        }
    }
}