
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const replay = document.querySelector(".replay");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  //time-display
  const timeDisplay = document.querySelector(".time-display");
  //Get the length of the outline
  const outlineLength = outline.getTotalLength();
  const timeSelect = document.querySelectorAll(".time-select button");
  let fakeDuration = 600;



  outline.style.strokeDashoffset = outlineLength;
    //再生ボタンのsvgの丸い線のアニメーション
    //stroke-width	線の太さを指定する
    //stroke-dasharray	線の間隔を指定する
    //stroke-dashoffset	線の位置を指定する
  outline.style.strokeDasharray = outlineLength;
    //時間表示　秒数を◯：◯に直すために60で割った時の商とあまりをかく
  timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
  )}`;


  //音楽選択のボタン→sounds
  //soundsが押されたらdata-sound、data-videoからデータ取ってきてsongとvideoを変える
  //音が止まってたら音と動画を流し始める
  //音が流れてたら音と動画を止める
  sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
  });

  //play->再生ボタン ||
  //これが押されたらcheck関数
  //音が止まってたら音と動画を流し始める
  //音が流れてたら音と動画を止める
  play.addEventListener("click", function() {
    checkPlaying(song);
  });
  
  //replay->リプレイボタン
  //押されたらrestart関数
  replay.addEventListener("click", function() {
    restartSong(song);
  });

  //songはaudioタグ
  const restartSong = song =>{
    let currentTime = song.currentTime;
    song.currentTime = 0;
    console.log("ciao")
  }

  //時間選択のボタン→timeselect
  //ボタンそれぞれにdata-time　120秒とかがついてる
  //押されたらdurarion(秒数カウンタ)をdata-timeにする
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  //check関数
  //音が止まってたら音と動画を流し始める
  //音が流れてたら音と動画を止める
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //

  // ontimeupdate->再生位置が変更された時にJavaScriptを実行

  song.ontimeupdate = function() {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
  
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
      replay.style.display = block;
    }
  };
  
  










  

