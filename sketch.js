let sounds = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
//let durations = [1/2, 1/4, 1/6, 1/8, 3/8];

let noteMap = new Map();

let playArray = [];

let systemArray = [];
let activeSystem;

let syllableArray = [];
let syllableCounter = 0;

let cnvWidth;
let headingHeight;

let recorder;
let soundFile;

let percentage = 0;

let clef;

let cnv;

function onSoundLoadSuccess(e){
    percentage += 1/390*100;
}
function onSoundLoadError(e){
}

function whileLoading(e){
}

function preload(){
    clef = loadImage("notenschluessel.png")
}

function setup()
{    
    // load sound files
    loadSounds();
    // create new file for recording
    soundFile = new p5.SoundFile();
    // set font
    textFont("monospace", 20);
    
    // create canvas
    cnvWidth = document.getElementById("sketch").offsetWidth-10;
    headingHeight = document.getElementById("heading").offsetHeight;
    cnv = createCanvas(cnvWidth, windowHeight-headingHeight);
    cnv.parent('sketch');
    
    
    systemArray[0] = new System(0, 50);
    systemArray[0].activate();
}

function onPlayBtnClick()
{
    document.getElementById("saveSoundBtn").disabled = true;
    let letterArray = collectText();
    playSound(letterArray);
}

function onStopBtnClick()
{
    for (let i=0; i<playArray.length; i++)
    {
        clearTimeout(playArray[i]);
    }
    document.getElementById("saveSoundBtn").disabled = false;
}

function onRandomNotesBtnClick()
{
    chooseRandomNotes(document.getElementById("randomSlider").value);
    setLetterPositions();
}

function onResetNotesBtnClick()
{
    resetRandomNotes();
}

function onAddSystemBtnClick()
{
    addSystem();
}

function onRemoveSystemBtnClick()
{
    removeSystem();
}

function onSaveSoundBtnClick()
{
    save(soundFile, 'mySound.wav');
}

function onSaveCanvasBtnClick()
{
    saveCanvas(cnv);
}

function onClearTextBtnClick()
{
    clearText();
}

/* Set the width of the sidebar to 250px (show it) */
function openCloseInfo()
{
    let width = document.getElementById("sidepanel").style.width;
    if (width == '' || width == "0px")
        document.getElementById("sidepanel").style.width = "15%";
    else
        document.getElementById("sidepanel").style.width = "0px";
}

function draw()
{    
    background(255);
    for(let i=0; i<systemArray.length; i++)
    {
        systemArray[i].draw();
        systemArray[i].writeText();
    }
    
    if (percentage < 99)
    {
        textAlign(LEFT);
        noStroke();
        fill(0);
        text("Sounds loading: " + round(percentage) + "%", 0, 20);
    }
}

function addSystem()
{
    let systemY = 50 + systemArray.length*(100+100);
    if (systemY > cnv.height)
        cnv.resize(cnvWidth, cnv.height+200);
    systemArray[systemArray.length] = new System(0, systemY)
    systemArray[systemArray.length-1].activate();
}

function removeSystem()
{
    if (systemArray.length > 1)
        systemArray.pop();
}

/**
 * set the y value of each letter to its value from noteMap
 */
function setLetterPositions()
{
    for(let i=0; i<systemArray.length; i++)
    {
        systemArray[i].setLetterPositions();
    }
}

/**
 * resets all letter y positions to current cursor height
 */
function resetRandomNotes()
{
    noteMap = new Map();
    
    for(let i=0; i<systemArray.length; i++)
    {
        systemArray[i].resetLetterPositions();
    }
}

/**
 * clears the text array
 */
function clearText()
{
    for (let i=0; i<systemArray.length; i++)
    {
        systemArray[i].clearText();
    }
}

function collectText()
{
    let letterArray = [];
    
    for (let i=0; i<systemArray.length; i++)
    {
        for(let j=0; j<systemArray[i].getText().length; j++)
        {
            letterArray[letterArray.length] = systemArray[i].getText()[j];
        }
        letterArray[letterArray.length] = new LetterBlock(0, 0, ' ', 0, 0);
    }
    return letterArray;
}

/**
 * set random note value to each letter
 */
function chooseRandomNotes(sliderValue)
{
    lowerBound = 0.5 - (0.5 * sliderValue);
    upperBound = 0.5 + (0.5 * sliderValue);
    noteMap.set('a', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('b', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('c', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('d', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('e', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('f', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('g', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('h', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('i', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('j', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('k', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('l', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('m', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('n', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('o', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('p', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('q', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('r', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('s', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('t', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('u', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('v', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('w', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('x', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
    noteMap.set('y', round(random(lowerBound, upperBound) * (sounds[0].length-1)));noteMap.set('z', round(random(lowerBound, upperBound) * (sounds[0].length-1)));
}

/**
 * play the sound to the curent input word
 */
function playSound(letterArray)
{
    recorder = new p5.SoundRecorder();
    recorder.setInput();
    recorder.record(soundFile);
    
    playArray = [];
    
    for (let index=0; index < letterArray.length; index++)
    {
        playSingleNote(index, letterArray);
    }
}

/**
 * plays a single note from soundsArray at the given index
 */
function playSingleNote(index, letterArray)
{
    playArray[playArray.length] = setTimeout(function() {
        let note;
        let noteIndex;
        let letter;
        let letterIndex;
        
        letter = letterArray[index].getLetter();

        
        if (letter != ' ')
        {
            noteIndex = 14-((letterArray[index].getY()/12.5-1)%16);

            letterIndex = (letter.charCodeAt(0))%97;
            
            note = sounds[letterIndex][noteIndex];
            note.setVolume((letterArray[index].getWidth()*0.08)-1.1);
            note.play();
                        
            console.log("index: " + playArray.length + " letter: " +letter);
            console.log("note: " + noteIndex);
        }
        if (index == letterArray.length-1)
        {
            setTimeout(function() {
                recorder.stop();
                document.getElementById("saveSoundBtn").disabled = false;
            }, 400*2);
        }
    }, 400*index);
}

function keyTyped()
{
    background(255);
    System.activeSystem.addLetter(key);

    System.activeSystem.draw();
    System.activeSystem.writeText();
}

function keyPressed()
{
    if (keyCode === BACKSPACE)
    {
        System.activeSystem.getText().pop();
    }
    if (keyCode === UP_ARROW)
    {
        if (LetterBlock.activeBlock != null) {
            
            if (LetterBlock.activeBlock.getY() > System.activeSystem.getY()-3*12.5)
                LetterBlock.activeBlock.move(-12.5);
        } 
        else
        {
            System.activeSystem.moveTextPosition(-12.5);
        }
        return false;
    }

    else if (keyCode === DOWN_ARROW)
    {

        if (LetterBlock.activeBlock != null) {
            
            if (LetterBlock.activeBlock.getY() < System.activeSystem.getY()+100+3*12.5)
                LetterBlock.activeBlock.move(12.5);
        } 
        else
        {
            System.activeSystem.moveTextPosition(12.5);
        }
        return false;
    }
    
    else if (keyCode === LEFT_ARROW)
    {
        if (LetterBlock.activeBlock != null) {
            if (LetterBlock.activeBlock.getWidth() > 15)
                LetterBlock.activeBlock.changeWidth(-5);
        }
        return false;
    }
    
    else if (keyCode === RIGHT_ARROW)
    {
        if (LetterBlock.activeBlock != null) {
            if (LetterBlock.activeBlock.getWidth() < 25)
                LetterBlock.activeBlock.changeWidth(5);
        }
        return false;
    }
}

function mouseClicked()
{
    let letterClicked = false;
    let letterArray = System.activeSystem.getText();
    
    for (let i=0; i<letterArray.length; i++)
    {
         if (mouseX > letterArray[i].getX()-5 && mouseX < letterArray[i].getX()+5 && mouseY > letterArray[i].getY()-10 && mouseY < letterArray[i].getY()+10) {
             letterClicked = true;
             letterArray[i].activate();
        }   
    }
    if (!letterClicked)
    {
        if (LetterBlock.activeBlock != null)
        {
            LetterBlock.activeBlock.deactivate();
        }
    }

    for (let i=0; i<systemArray.length; i++)
    {
        if (mouseX > 0 && mouseX < 1000 && mouseY > systemArray[i].getY() && mouseY < systemArray[i].getY()+100) {
            systemArray[i].activate();
        }
        if (mouseX > cnvWidth-50 && mouseX < cnvWidth && mouseY > systemArray[i].getY()+30 && mouseY < systemArray[i].getY()+70) {
            document.getElementById("saveSoundBtn").disabled = true;
            playSound(systemArray[i].getText());
        }
    }
}

class System
{
    static activeSystem;
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.text = [];
        this.textPosition = this.y + 5*12.5;
        this.active = false;
        this.strokeColor = 200;
    }
    
    draw() {
    
        stroke(this.strokeColor);
        // vertical lines
        line(this.x, this.y, this.x, this.y+100);
        line(this.x+cnvWidth-50, this.y, this.x+cnvWidth-50, this.y+100);
        // horizontal lines
        line(this.x, this.y, this.x+cnvWidth-50, this.y);
        line(this.x, this.y+25, this.x+cnvWidth-50, this.y+25);
        line(this.x, this.y+50, this.x+cnvWidth-50, this.y+50);
        line(this.x, this.y+75, this.x+cnvWidth-50, this.y+75);
        line(this.x, this.y+100, this.x+cnvWidth-50, this.y+100);

        fill(0);
        ellipse(this.x + 2.5, this.textPosition, 5, 5)

        image(clef, 0, this.y-25, 80, 160);
        
        triangle(this.x+cnvWidth-40, this.y+30, this.x+cnvWidth-40, this.y+70, this.x+cnvWidth, this.y+50);

    }
    
    getY() {
        return this.y;
    }
    
    writeText() {
        for (let i=0; i<this.text.length; i++) {
            this.text[i].display();
        }
    }
    
    setLetterPositions() {
        for (let i=0; i<this.text.length; i++) {
            let noteIndex = noteMap.get(this.text[i].getLetter());
            this.text[i].setY(this.y - 3*12.5 + noteIndex*12.5);
        }
    }
    
    resetLetterPositions() {
        for (let i=0; i<this.text.length; i++) {
            this.text[i].setY(this.textPosition);
        }
    }
    
    getText() {
        return this.text;
    }
    
    clearText() {
        this.text = [];
    }
    
    addLetter(key) {
        if (noteMap.size > 0)
        {
            let noteIndex = noteMap.get(key);
            this.text[this.text.length] = new LetterBlock(100+10*this.text.length, this.y - 3*12.5 + noteIndex*12.5, key, 0, 20);
        }
        else
        {
            this.text[this.text.length] = new LetterBlock(100+10*this.text.length, this.textPosition, key, 0, 20);
        }
    }
    
    moveTextPosition(value) {
        if (this.textPosition+value > this.y - 4*12.5 && this.textPosition+value < this.y + 100 + 4*12.5)
            this.textPosition = this.textPosition+value;
    }
    
    isActive() {
        return this.active;
    }
    
    activate() {
        if (System.activeSystem != null)
            System.activeSystem.deactivate();
        System.activeSystem = this;
        this.active = true;
        this.strokeColor = 100;
    }
    
    deactivate() {
        System.activeSystem = null;
        this.active = false;
        this.strokeColor = 200;
    }
}

class LetterBlock
{
    static activeBlock;
    
    constructor(x, y, letter, strokeColor, width) {
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.strokeColor = strokeColor;
        this.width = width;
        this.active = false;
    }
    
    display() {
        rectMode(CENTER);
        stroke(this.strokeColor);
        noFill();
        //rect(this.x, this.y, 10, 20);
        noStroke();
        fill(this.strokeColor);
        textAlign(CENTER);
        textSize(this.width)
        text(this.letter, this.x, this.y+5);
    }
    
    move(y) {
        this.y += y;
    }
    
    changeWidth(width) {
        this.width += width;
    }
    
    getLetter() {
        return this.letter;
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    getWidth() {
        return this.width;
    }
    
    setY(y) {
        this.y = y;
    }
    
    isActive() {
        return this.active;
    }
    
    activate() {
        if (LetterBlock.activeBlock != null)
            LetterBlock.activeBlock.deactivate();
        this.strokeColor = '#FF0000';
        LetterBlock.activeBlock = this;
        this.active = true;
    }
    
    deactivate() {
        this.strokeColor = 0;
        LetterBlock.activeBlock = null;
        this.active = false;
    }
}

function loadSounds()
{ 
    for (let i = 65; i<=90; i++)
    {
        let l = String.fromCharCode(i);
        sounds[i%65][0] = loadSound('sounds/' + l + '/B3.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][1] = loadSound('sounds/' + l + '/C3.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][2] = loadSound('sounds/' + l + '/D3.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][3] = loadSound('sounds/' + l + '/E3.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][4] = loadSound('sounds/' + l + '/F3.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][5] = loadSound('sounds/' + l + '/G3.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][6] = loadSound('sounds/' + l + '/A4.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][7] = loadSound('sounds/' + l + '/B4.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][8] = loadSound('sounds/' + l + '/C4.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][9] = loadSound('sounds/' + l + '/D4.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][10] = loadSound('sounds/' + l + '/E4.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][11] = loadSound('sounds/' + l + '/F4.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][12] = loadSound('sounds/' + l + '/G4.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][13] = loadSound('sounds/' + l + '/A5.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
        sounds[i%65][14] = loadSound('sounds/' + l + '/B5.wav',onSoundLoadSuccess,onSoundLoadError,whileLoading);
    }
}

