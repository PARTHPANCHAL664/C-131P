img = ""
Status1 = ""

function setup()
{
    canvas = createCanvas(640,430)
    canvas.center()

    ObjectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "STATUS: DETECTING OBJECTS";
}

function modelLoaded()
{
    console.log("Model Is Loaded!")
    Status1 = true
    ObjectDetector.detect(img , gotResult);
}


function preload()
{
    img = loadImage('Tv.jpg')
}

function draw()
{
    image(img , 0 , 0 , 640 , 430);

    if (Status1 != "")
    {
        for (i = 0; i < objects.length; i++)
        {

        document.getElementById("status").innerHTML = " Status : Object Detected";

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x , objects [i].y);
        console.log(objects[i].label);
        noFill()
        stroke("#0a8af7");
        strokeWeight(2)
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }

    }

}

function gotResult(error,results)
{
    if(error) {
        console.log(error)
    }
        console.log(results);
        objects = results;
    
}