// Change the messages
const messages=[
    "Optical Sensing Division has 8 openings for PhD researchers! Develop next-gen imaging systems.",
    "Bio-Sensing Group offers 5 internship positions in medical sensor development for researchers!",
    "Smart Sensing IoT Networks has 6 openings for researchers! Join cutting-edge projects."
];
let promo=document.querySelector('.promo-message');
let message_index=Math.floor(Math.random()*(messages.length));
promo.innerHTML=messages[message_index];

function get_message(){
    message_index=(message_index+1)%messages.length;
    promo.innerHTML=messages[message_index];
}
setInterval(get_message,3000);

// Switch the video
const sources=[
    ["https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video1.mp4","https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video1.webm"],
    ["https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video2.mp4","https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video2.webm"]
];
const src1=document.querySelector('#src1');
const src2=document.querySelector('#src2');
const video=document.querySelector('#video');
let src_index=1;
src1.src=sources[src_index][0];
src2.src=sources[src_index][1];
video.load();
video.play();
video.addEventListener('ended',()=>{
    src_index+=1;
    src_index%=sources.length;
    src1.src=sources[src_index][0];
    src2.src=sources[src_index][1];
    video.load();
    video.play();
});